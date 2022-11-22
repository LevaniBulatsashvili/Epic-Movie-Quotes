<template>
  <Teleport to="#app">
    <div
      v-if="false"
      class="fixed flex justify-center items-center top-[0rem] left-[0rem] w-[100vw] h-[100vh] bg-modal"
    >
      <div class="w-[54rem] bg-[#222030] rounded-[1rem]">
        <PaperPlaneIcon class="mt-[7.2rem]" />
        <MainHeader
          class="gap-[3.2rem] mt-[2.1rem]"
          title="Check your email"
          description="We have sent a password recover instructions to your email"
          textColor="#FFFFFF"
        />
        <MainButton
          class="mt-[4rem] mb-[3.2rem]"
          description="Go to my email"
          :onClick="() => false"
        />
        <div
          @click="false"
          class="cursor-pointer mb-[4.7rem] text-center text-[1.6rem] text-[#6C757D]"
        >
          Skip, I’ll confirm later
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import MainHeader from "@/components/form/MainHeader.vue";
import MainButton from "@/components/form/MainButton.vue";
import PaperPlaneIcon from "@/components/icons/PaperPlaneIcon.vue";
</script>
