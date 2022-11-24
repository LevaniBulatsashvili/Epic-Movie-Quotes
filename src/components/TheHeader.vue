<template>
  <header>
    <nav
      class="py-[2.4rem] px-[7rem] w-full items-center flex"
      :style="{ backgroundColor: !isLoggedIn ? '' : '#222030' }"
    >
      <router-link
        class="font-[Halvetica Neue] ml-[0px] uppercase font-medium text-[#DDCCAA] text-[1.6rem]"
        :to="{ name: 'home' }"
        >Movie Quotes</router-link
      >

      <div class="flex mr-[0px] justify-items-center items-center gap-[1.6rem]">
        <div v-if="isLoggedIn" @click="notifications" class="cursor-pointer">
          <BellIcon />
          <div
            v-if="notificationAmount > 0"
            class="absolute top-[-0.5rem] left-[1.5rem] bg-[#e84600] font-[Halvetica Neue] w-[2.5rem] h-[2.5rem] text-center font-medium text-[1.6rem] text-[#FFFFFF] rounded-[10rem]"
          >
            {{ notificationAmount }}
          </div>
        </div>
        <button
          @click="langDropdown"
          class="font-[Halvetica Neue] text-[#FFFFFF] w-[9.6rem] text-[1.6rem] pl-[4rem] flex items-center"
        >
          Eng<DownArrowIcon />
        </button>
        <button
          v-if="!isLoggedIn"
          @click="signUp"
          class="font-[Halvetica Neue] py-[0.7rem] px-[1.3rem] w-[10.9rem] ml-[3rem] bg-[#E31221] text-[#FFFFFF] text-[1.6rem] border-[1px] border-solid border-[#E31221] rounded-[0.4rem]"
        >
          Sign Up
        </button>
        <button
          v-if="!isLoggedIn"
          @click="login"
          class="font-[Halvetica Neue] py-[0.7rem] px-[1.3rem] w-[9.6rem] text-[#FFFFFF] text-[1.6rem] border-[1px] border-solid border-[#FFFFFF] rounded-[0.4rem]"
        >
          Log in
        </button>
        <button
          v-else
          @click="logout"
          class="font-[Halvetica Neue] py-[0.7rem] px-[1.3rem] w-[9.6rem] text-[#FFFFFF] text-[1.6rem] border-[1px] border-solid border-[#FFFFFF] rounded-[0.4rem]"
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
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const notificationAmount = ref(1);
const isLoggedIn = ref(false);

const login = () => router.push({ name: "login" });
const signUp = () => router.push({ name: "registration" });
const langDropdown = () => {};
const logout = () => {};
const notifications = () => {};
</script>
