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
          @click="notifications"
          class="cursor-pointer"
        >
          <BellIcon />
          <div
            v-if="notificationAmount > 0"
            class="font-Halvetica_Neue absolute top-[-0.5rem] left-[1.5rem] h-[2.5rem] w-[2.5rem] rounded-[10rem] bg-[#e84600] text-center text-[1.6rem] font-medium text-[#FFFFFF]"
          >
            {{ notificationAmount }}
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
import { computed, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import axios from "@/config/axios.js";
import { setLocale } from "@vee-validate/i18n";
import i18n from "@/config/i18n/index.js";

const auth = useAuthStore();
const isAuth = computed(() => auth.isAuthenticated);
const router = useRouter();
const locale = ref(sessionStorage.getItem("locale") === "ka" ? "ქარ" : "Eng");
if (sessionStorage.getItem("locale") === "ka") i18n.global.locale = "ka";

const langDropdown = ref(false);
const authDropdown = ref(false);

const toggleAuthDropdown = () => {
  authDropdown.value = !authDropdown.value;
  langDropdown.value = false;
};
const toggleDropdown = () => {
  langDropdown.value = !langDropdown.value;
  authDropdown.value = false;
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

// axios.get(import.meta.env.VITE_BACKEND_API_BASE_URL + "/quotes/2/quote-updated");

const notificationAmount = ref(1);

const notifications = () => {};
</script>
