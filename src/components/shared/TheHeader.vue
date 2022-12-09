<template>
  <header>
    <nav
      class="flex w-full items-center py-[2.4rem] px-[7rem]"
      :style="{ backgroundColor: !auth.isAuthenticated ? '' : '#222030' }"
    >
      <router-link
        class="font-[Halvetica Neue] ml-[0px] text-[1.6rem] font-medium uppercase text-[#DDCCAA]"
        :to="{ name: 'home' }"
        >Movie Quotes</router-link
      >

      <div class="mr-[0px] flex items-center justify-items-center gap-[1.6rem]">
        <div
          v-if="auth.isAuthenticated"
          @click="notifications"
          class="cursor-pointer"
        >
          <BellIcon />
          <div
            v-if="notificationAmount > 0"
            class="font-[Halvetica Neue] absolute top-[-0.5rem] left-[1.5rem] h-[2.5rem] w-[2.5rem] rounded-[10rem] bg-[#e84600] text-center text-[1.6rem] font-medium text-[#FFFFFF]"
          >
            {{ notificationAmount }}
          </div>
        </div>
        <div>
          <button
            @click="toggleDropdown"
            class="font-[Halvetica Neue] flex w-[9.6rem] max-w-[8rem] items-center pl-[2rem] text-[1.6rem] text-[#FFFFFF]"
          >
            {{ locale }}
            <DownArrowIcon />
          </button>
          <div v-if="langDropdown" class="absolute z-10 mt-[1rem] border">
            <button
              @click="setLocaleEn"
              class="block px-[5rem] text-[1.6rem] text-[#FFFFFF] hover:bg-blue-400"
            >
              En
            </button>
            <button
              @click="setLocaleKa"
              class="block px-[5rem] text-[1.6rem] text-[#FFFFFF] hover:bg-blue-400"
            >
              Ka
            </button>
          </div>
        </div>
        <button
          v-if="!auth.isAuthenticated"
          @click="router.push({ name: 'home', params: { modal: 'register' } })"
          class="font-[Halvetica Neue] ml-[3rem] w-[10.9rem] rounded-[0.4rem] border-[1px] border-solid border-[#E31221] bg-[#E31221] py-[0.7rem] px-[1.3rem] text-[1.6rem] text-[#FFFFFF] hover:bg-[#CC0E10] active:bg-[#CC0E10]"
        >
          Sign Up
        </button>
        <button
          v-if="!auth.isAuthenticated"
          @click="router.push({ name: 'home', params: { modal: 'login' } })"
          class="font-[Halvetica Neue] w-[9.6rem] rounded-[0.4rem] border-[1px] border-solid border-[#FFFFFF] py-[0.7rem] px-[1.3rem] text-[1.6rem] text-[#FFFFFF]"
        >
          Log in
        </button>
        <button
          v-else
          @click="logout"
          class="font-[Halvetica Neue] w-[9.6rem] rounded-[0.4rem] border-[1px] border-solid border-[#FFFFFF] py-[0.7rem] px-[1.3rem] text-[1.6rem] text-[#FFFFFF]"
        >
          Logout
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import DownArrowIcon from "@/components/icons/component/DownArrowIcon.vue";
import BellIcon from "@/components/icons/component/BellIcon.vue";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import axios from "@/config/axios.js";
import { setLocale } from "@vee-validate/i18n";

const auth = useAuthStore();
const router = useRouter();
const locale = ref("Eng");

const langDropdown = ref(false);
const toggleDropdown = () => (langDropdown.value = !langDropdown.value);
const setLocaleEn = () => {
  setLocale("en");
  locale.value = "Eng";
  langDropdown.value = false;
};
const setLocaleKa = () => {
  setLocale("ka");
  locale.value = "Ka";
  langDropdown.value = false;
};

const logout = async () => {
  await axios.post("http://127.0.0.1:8000/api/logout");
  auth.isAuthenticated = false;
  router.push({ name: "home" });
};

const notificationAmount = ref(1);

const notifications = () => {};
</script>
