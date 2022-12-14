<template>
  <nav v-if="auth.isAuthenticated" class="min-w-[22rem] lg:max-w-[18rem]">
    <div class="flex gap-[2rem]">
      <img
        v-if="!auth.user.thumbnail"
        class="mx-[0rem] max-w-[6rem]"
        src="@/assets/png/profile.png"
      />
      <img
        v-else
        class="mx-[0rem] max-w-[6rem] rounded-[5rem]"
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
      <RedHouseIcon v-if="route.path.includes('news-feed')" class="mx-[0rem]" />
      <HouseIcon v-else class="mx-[0px]" />
      <div
        v-if="route.path.includes('news-feed')"
        class="font-[Helvetica Neue] ml-[0rem] text-[2.4rem] text-[#E31221]"
      >
        {{ $t("navigation.news_feed") }}
      </div>
      <div
        v-else
        class="font-[Helvetica Neue] ml-[0rem] text-[2.4rem] text-[#FFFFFF]"
      >
        {{ $t("navigation.news_feed") }}
      </div>
    </router-link>

    <router-link :to="{ name: 'movies' }" class="flex gap-[4.2rem]">
      <RedCameraIcon v-if="route.path.includes('movies')" class="mr-[0rem] ml-[0rem]" />
      <CameraIcon v-else class="mr-[0rem] ml-[0rem]" />
      <div
        v-if="route.path.includes('movies')"
        class="font-[Helvetica Neue] ml-[0rem] text-[2.4rem] text-[#E31221]"
      >
        {{ $t("navigation.list_of_movies") }}
      </div>
      <div
        v-else
        class="font-[Helvetica Neue] ml-[0rem] text-[2.4rem] text-[#FFFFFF]"
      >
        {{ $t("navigation.list_of_movies") }}
      </div>
    </router-link>
  </nav>
</template>

<script setup>
import HouseIcon from "@/components/icons/component/HouseIcon.vue";
import CameraIcon from "@/components/icons/component/CameraIcon.vue";
import RedCameraIcon from "@/components/icons/component/RedCameraIcon.vue";
import RedHouseIcon from "@/components/icons/component/RedHouseIcon.vue";

import { useAuthStore } from "@/stores/auth";
import { useRoute } from "vue-router";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const route = useRoute();
const auth = useAuthStore();
</script>
