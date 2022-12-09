<template>
  <Teleport to="#app">
    <div
      @click="router.push({ name: 'home' })"
      class="bg-modal fixed top-[0rem] left-[0rem] flex h-[100vh] w-[100vw] items-center justify-center"
    >
      <div @click.stop class="w-[54rem] rounded-[1rem] bg-[#222030] px-[6rem]">
        <PaperPlaneIcon class="mt-[7.2rem]" />
        <MainHeader
          class="mt-[2.1rem] gap-[3.2rem]"
          title="Thank you!"
          description="Your account has been activated"
          textColor="#FFFFFF"
        />
        <MainButton
          class="mx-[9rem] mt-[4rem] mb-[7rem]"
          description="Go to my news feed"
          @Click="router.push({ name: 'newsFeed' })"
        />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import MainHeader from "@/components/form/MainHeader.vue";
import MainButton from "@/components/form/MainButton.vue";
import PaperPlaneIcon from "@/components/icons/component/PaperPlaneIcon.vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

onMounted(() => auth.verifyEmail(route.params.data, route.params.hash));
</script>
