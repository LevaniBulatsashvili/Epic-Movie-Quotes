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
        <button
          @click="langDropdown"
          class="font-[Halvetica Neue] flex w-[9.6rem] items-center pl-[4rem] text-[1.6rem] text-[#FFFFFF]"
        >
          Eng<DownArrowIcon />
        </button>
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
import DownArrowIcon from "@/components/icons/DownArrowIcon.vue";
import BellIcon from "@/components/icons/BellIcon.vue";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import axios from "@/config/axios.js";

const auth = useAuthStore();
const router = useRouter();

const logout = async () => {
  await axios.post("http://127.0.0.1:8000/api/logout");
  auth.isAuthenticated = false;
  router.push({ name: "home" });
};

const notificationAmount = ref(1);

const langDropdown = () => {};
const notifications = () => {};
</script>
