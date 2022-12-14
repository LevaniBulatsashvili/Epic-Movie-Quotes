<template>
  <Teleport to="#app">
    <div
      @click="router.push({ name: 'home' })"
      class="bg-modal fixed top-[0rem] left-[0rem] flex h-[100vh] w-[100vw] items-center justify-center md:left-[-2rem]"
    >
      <div @click.stop class="w-[54rem] rounded-[1rem] bg-[#222030] px-[6rem] md:w-[44rem] sm:w-[37rem]">
        <CheckmarkIcon class="mt-[7.2rem]" />
        <MainHeader
          class="mt-[2.1rem] gap-[3.2rem]"
          :title="$t('auth.thank_you')"
          :description="$t('auth.your_account_has_been_activated')"
          textColor="#FFFFFF"
        />
        <MainButton
          class="mx-[9rem] mt-[4rem] mb-[7rem] md:mx-[4rem]"
          :description="$t('auth.go_to_my_news_feed')"
          :onClick="() => router.push({ name: 'newsFeed' })"
        />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import MainHeader from "@/components/form/MainHeader.vue";
import MainButton from "@/components/form/MainButton.vue";
import CheckmarkIcon from "@/components/icons/component/CheckmarkIcon.vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>
