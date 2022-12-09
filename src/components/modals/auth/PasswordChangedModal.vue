<template>
  <Teleport to="#app">
    <div
      @click="router.push({ name: 'home' })"
      class="bg-modal fixed top-[0rem] left-[0rem] flex h-[100vh] w-[100vw] items-center justify-center"
    >
      <div @click.stop class="w-[54rem] rounded-[1rem] bg-[#222030] px-[6rem]">
        <CheckmarkIcon class="mt-[7.2rem]" />
        <MainHeader
          class="mt-[2.1rem] gap-[3.2rem]"
          title="Success!"
          description="Your Password changed successfully"
          textColor="#FFFFFF"
        />
        <MainButton
          class="mx-[9rem] mt-[4rem] mb-[7rem]"
          description="Login"
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
