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
          :title="$t('auth.check_your_email')"
          :description="$t('auth.please_check_your_email_and_follow_the_instructions_to_reset_your_password')"
          textColor="#FFFFFF"
        />
        <MainButton
          @Click="router.push({ name: 'home' })"
          class="mx-[9rem] mt-[4rem] mb-[3.2rem]"
          :description="$t('auth.go_to_my_email')"
        />
        <div
          @click="router.push({ name: 'home' })"
          class="mb-[4.7rem] cursor-pointer text-center text-[1.6rem] text-[#6C757D]"
        >
          {{ $t("auth.skip_i_will_confirm_later") }}
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import MainHeader from "@/components/form/MainHeader.vue";
import MainButton from "@/components/form/MainButton.vue";
import PaperPlaneIcon from "@/components/icons/component/PaperPlaneIcon.vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>
