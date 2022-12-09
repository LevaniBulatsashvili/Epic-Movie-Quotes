<template>
  <nav class="min-w-[22rem]">
    <div class="flex">
      <img class="mx-[0rem]" src="@/assets/png/profile.png" />
      <div>
        <div
          class="font-[Helvetica Neue] text-[2.4rem] capitalize text-[#FFFFFF]"
        >
          {{ auth.user.username }}
        </div>
        <router-link
          :to="{ name: 'profile' }"
          class="font-[Helvetica Neue] text-[1.6rem] text-[#CED4DA]"
          >Edit your profile
        </router-link>
      </div>
    </div>

    <router-link :to="{ name: 'newsFeed' }" class="my-[4rem] flex gap-[4.2rem]">
      <HouseIcon class="mx-[0px]" />
      <div class="font-[Helvetica Neue] ml-[0rem] text-[2.4rem] text-[#FFFFFF]">
        News feed
      </div>
    </router-link>

    <router-link :to="{ name: 'movies' }" class="flex gap-[4.2rem]">
      <CameraIcon class="mr-[0rem]" />
      <div class="font-[Helvetica Neue] ml-[0rem] text-[2.4rem] text-[#FFFFFF]">
        List of movies
      </div>
    </router-link>
  </nav>
</template>

<script setup>
import HouseIcon from "@/components/icons/component/HouseIcon.vue";
import CameraIcon from "@/components/icons/component/CameraIcon.vue";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
</script>
