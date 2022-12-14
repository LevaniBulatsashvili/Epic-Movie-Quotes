<template>
  <Teleport to="#app">
    <div
      @click="router.push({ name: 'home' })"
      class="bg-modal fixed top-[0rem] left-[0rem] flex h-[100vh] w-[100vw] items-center justify-center md:left-[-2rem]"
    >
      <div @click.stop class="w-[54rem] rounded-[1rem] bg-[#222030] px-[6rem] md:w-[47rem] sm:w-[40rem]">
        <CheckmarkIcon class="mt-[7.2rem]" />
        <MainHeader
          class="mt-[2.1rem] gap-[3.2rem]"
          :title="$t('auth.success')"
          :description="$t('auth.Your_Password_changed_successfully')"
          textColor="#FFFFFF"
        />
        <MainButton
          class="mx-[9rem] mt-[4rem] mb-[7rem] md:mx-[4rem]"
          :description="$t('auth.login')"
          @Click="router.push({ name: 'home', params: { modal: 'login' } })"
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
