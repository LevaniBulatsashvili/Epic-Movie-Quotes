<template>
  <header>
    <nav
      class="flex w-full items-center py-[2.4rem] px-[7rem] lg:px-[5rem] sm:px-[3rem]"
      :style="{ backgroundColor: !auth.isAuthenticated ? '' : '#222030' }"
    >
      <router-link
        class="font-Halvetica_Neue ml-[0px] text-[1.6rem] font-medium uppercase text-[#DDCCAA]"
        :to="{ name: 'home' }"
        >Movie Quotes</router-link
      >

      <div class="mr-[0px] flex items-center justify-items-center gap-[1.6rem] lg:gap-[1rem] sm:gap-[0.5]">
        <div
          v-if="auth.isAuthenticated"
          @click="toggleNotificationsDropdown"
          class="cursor-pointer"
        >
          <BellIcon />
          <div
            v-if="notifications.length > 0"
            class="font-Halvetica_Neue absolute top-[-0.5rem] left-[1.5rem] h-[2.5rem] w-[2.5rem] rounded-[10rem] bg-[#e84600] text-center text-[1.6rem] font-medium text-[#FFFFFF]"
          >
            {{ notifications.length }}
          </div>
          <div v-if="notificationDropdown" class="absolute pt-[4.8rem] pb-[3.6] px-[3.2rem] bg-[#000000] rounded-[1.2rem] min-w-[960px] right-[0rem] z-10">
            <div class="flex pb-[2.3rem]">
              <div class="font-Halvetica_Neue font-medium mx-[0rem] text-[3.2rem] text-[#FFFFFF]">{{ $t("news.notifications") }}</div>
              <div @click="markAllAsRead" class="font-Halvetica_Neue font-medium mr-[0rem] text-[2rem] text-[#FFFFFF] cursor-pointer">{{ $t("news.mark_all_as_read") }}</div>
            </div>
            <div class="max-h-[57rem] overflow-y-auto scroll">
              <div v-for="notification in notifications" class="py-[1.8rem] px-[2.5rem] mb-[1.6rem] flex border-[1px] border-solid border-notification">
                <img v-if="!notification.thumbnail" class="mx-[0rem] max-w-[6rem]" src="@/assets/png/profile.png" />
                <img v-else class="mx-[0rem] max-w-[6rem]" :src="backendUrl + '/storage/' + notification.thumbnail" />
                <div class="ml-[2.4rem]">
                  <div class="font-Halvetica_Neue text-[2rem] text-[#FFFFFF]">{{ notification.username }}</div>
                  <div class="flex gap-[1.2rem]">
                    <ChatCommentIcon v-if="notification.comment" />
                    <ChatLikeIcon v-else />
                    <div v-if="notification.comment" class="font-Halvetica_Neue text-[2rem] text-[#CED4DA]">{{ $t("news.commented_on_your_quote") }}</div>
                    <div v-else class="font-Halvetica_Neue text-[2rem] text-[#CED4DA]">{{ $t("news.reacted_on_your_quote") }}</div>
                  </div>
                </div>
                <div class="mr-[0rem]">
                  <div class="font-Halvetica_Neue text-[2rem] text-[#D9D9D9]">5 min ago</div>
                  <div class="font-Halvetica_Neue text-[2rem] text-end text-[#198754]">New</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            @click="toggleDropdown"
            class="font-Halvetica_Neue flex w-[9.6rem] max-w-[8rem] items-center pl-[2rem] text-[1.6rem] text-[#FFFFFF]"
          >
            {{ locale }}
            <DownArrowIcon />
          </button>
          <div v-if="langDropdown" class="absolute z-10 mt-[1rem] border">
            <button
              @click="setLocaleEn()"
              class="block px-[5rem] text-[1.6rem] text-[#FFFFFF] hover:bg-blue-400"
            >
              {{ $t("header.en") }}
            </button>
            <button
              @click="setLocaleKa()"
              class="block px-[5rem] text-[1.6rem] text-[#FFFFFF] hover:bg-blue-400"
            >
              {{ $t("header.ka") }}
            </button>
          </div>
        </div>

        <div v-if="!isAuth">
          <button @click="toggleAuthDropdown" class="hidden md:block cursor-pointer">
            <DropdownIcon />
          </button>
          <div v-if="authDropdown" class="absolute z-10 mt-[1rem] border hidden md:block left-[-4rem]">
            <button @click="toRegister"
              class="block text-[1.6rem] text-[#FFFFFF] hover:bg-blue-400 mx-auto w-[12rem] py-[0.5rem]">
              {{ $t("header.sign_up") }}
            </button>
            <button @click="toLogin"
              class="block text-[1.6rem] text-[#FFFFFF] hover:bg-blue-400 mx-auto w-[12rem]  py-[0.5rem]">
              {{ $t("header.log_in") }}
            </button>
          </div>
        </div>

        <button
          v-if="!auth.isAuthenticated"
          @click="toRegister"
          class="font-Halvetica_Neue ml-[3rem] min-w-[10rem] rounded-[0.4rem] border-[1px] border-solid border-[#E31221] bg-[#E31221] py-[0.7rem] px-[1.3rem] text-[1.6rem] text-[#FFFFFF] hover:bg-[#CC0E10] active:bg-[#CC0E10] md:hidden"
        >
          {{ $t("header.sign_up") }}
        </button>
        <button
          v-if="!auth.isAuthenticated"
          @click="toLogin"
          class="font-Halvetica_Neue w-[9.6rem] rounded-[0.4rem] border-[1px] border-solid border-[#FFFFFF] py-[0.7rem] px-[1.3rem] text-[1.6rem] text-[#FFFFFF] md:hidden"
        >
          {{ $t("header.log_in") }}
        </button>
        <button
          v-else
          @click="logout"
          class="font-Halvetica_Neue w-[9.6rem] rounded-[0.4rem] border-[1px] border-solid border-[#FFFFFF] py-[0.7rem] px-[1.3rem] lg:px-[1rem] lg:py-[0.5rem] sm:px-[0.7rem] sm:py-[0.3rem] text-[1.6rem] text-[#FFFFFF]"
        >
          {{ $t("header.logout") }}
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import DropdownIcon from "@/components/icons/component/DropdownIcon.vue";
import DownArrowIcon from "@/components/icons/component/DownArrowIcon.vue";
import BellIcon from "@/components/icons/component/BellIcon.vue";
import ChatLikeIcon from "@/components/icons/component/ChatLikeIcon.vue";
import ChatCommentIcon from "@/components/icons/component/ChatCommentIcon.vue";
import { computed, onBeforeMount, reactive, ref, watch } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import axios from "@/config/axios.js";
import { setLocale } from "@vee-validate/i18n";
import i18n from "@/config/i18n/index.js";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const auth = useAuthStore();
const isAuth = computed(() => auth.isAuthenticated);
const router = useRouter();
const locale = ref(sessionStorage.getItem("locale") === "ka" ? "ქარ" : "Eng");
if (sessionStorage.getItem("locale") === "ka") i18n.global.locale = "ka";
let notifications = reactive(auth.notifications);

const langDropdown = ref(false);
const authDropdown = ref(false);
const notificationDropdown = ref(false);

const toggleAuthDropdown = () => {
  authDropdown.value = !authDropdown.value;
  langDropdown.value = false;
  notificationDropdown.value = false;
};
const toggleDropdown = () => {
  langDropdown.value = !langDropdown.value;
  authDropdown.value = false;
  notificationDropdown.value = false;
};
const toggleNotificationsDropdown = () => {
  notificationDropdown.value = !notificationDropdown.value;
  authDropdown.value = false;
  langDropdown.value = false;
};

const toLogin = () => {
  authDropdown.value = false;
  router.push({ name: 'home', params: { modal: 'login' } });
};

const toRegister = () => {
  authDropdown.value = false;
  router.push({ name: 'home', params: { modal: 'register' } });
};

const setLocaleEn = () => {
  sessionStorage.setItem("locale", "en");
  i18n.global.locale = "en";
  setLocale("en");
  locale.value = "Eng";
  langDropdown.value = false;
};

const setLocaleKa = () => {
  sessionStorage.setItem("locale", "ka");
  i18n.global.locale = "ka";
  setLocale("ka");
  locale.value = "ქარ";
  langDropdown.value = false;
};

const logout = async () => {
  await axios.post(import.meta.env.VITE_BACKEND_API_BASE_URL + "/logout");
  auth.isAuthenticated = false;
  router.push({ name: "home" });
};

const makeConnection = () => {
  window.Echo.channel(`quotes.${auth.user.username.split(' ').join('-')}`).listen("UserQuoteUpdated", (e) => {
    if (e.comment) {
      auth.notifications.push({
        ...e.comment,
        comment: true
      })
      sessionStorage.setItem("notifications", JSON.stringify(auth.notifications));
    }
    else if (e.like) {
      auth.notifications.push({
        ...e.like,
        comment: false
      });
      sessionStorage.setItem("notifications", JSON.stringify(auth.notifications));
    }
  });
}

const markAllAsRead = () => {
  sessionStorage.removeItem("notifications");
  auth.notifications = [];
  notifications = auth.notifications;
};

watch(isAuth, (newValue) => {
  if (newValue) makeConnection();
});

const checkIfChannelExists = Object.keys(window.Echo.connector.pusher.channels.channels).length === 0;
onBeforeMount(() => checkIfChannelExists && auth.isAuthenticated ? makeConnection() : null);
</script>

<style scoped>
.scroll::-webkit-scrollbar {
  display: none;
}
</style>
