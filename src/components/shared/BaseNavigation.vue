<template>
  <nav class="min-w-[22rem] lg:max-w-[18rem]">
    <div class="flex">
      <img
        v-if="!auth.user.thumbnail"
        class="mx-[0rem] max-w-[6rem]"
        src="@/assets/png/profile.png"
      />
      <img
        v-else
        class="mx-[0rem] max-w-[6rem]"
        :src="backendUrl + '/storage/' + auth.user.thumbnail"
      />
      <div>
        <div
          class="font-[Helvetica Neue] text-[2.4rem] capitalize text-[#FFFFFF]"
        >
          {{ auth.user.username }}
        </div>
        <router-link
          :to="{ name: 'profile' }"
          class="font-[Helvetica Neue] text-[1.6rem] text-[#CED4DA]"
          >{{ $t("navigation.edit_your_profile") }}
        </router-link>
      </div>
    </div>

    <router-link :to="{ name: 'newsFeed' }" class="my-[4rem] flex gap-[4.2rem]">
      <HouseIcon class="mx-[0px]" />
      <div class="font-[Helvetica Neue] ml-[0rem] text-[2.4rem] text-[#FFFFFF]">
        {{ $t("navigation.news_feed") }}
      </div>
    </router-link>

    <router-link :to="{ name: 'movies' }" class="flex gap-[4.2rem]">
      <CameraIcon class="mr-[0rem]" />
      <div class="font-[Helvetica Neue] ml-[0rem] text-[2.4rem] text-[#FFFFFF]">
        {{ $t("navigation.list_of_movies") }}
      </div>
    </router-link>
  </nav>
</template>

<script setup>
import HouseIcon from "@/components/icons/component/HouseIcon.vue";
import CameraIcon from "@/components/icons/component/CameraIcon.vue";
import { useAuthStore } from "@/stores/auth";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const auth = useAuthStore();
</script>
