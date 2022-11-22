<template>
  <div class="grid h-[100vh] items-center">
    <div>
      <div>
        <GandalfIcon class="z-10" />
        <GandalfUnion class="absolute top-[4rem] left-[19rem]" />
      </div>
      <div class="text-center mt-[3rem]">
        <div
          class="font-[Halvetica Neue] font-bold text-[#FFFFFF] text-[4.7rem]"
        >
          You shall not pass!
        </div>
        <div
          class="font-[Halvetica Neue] mt-[1rem] mb-[5rem] font-medium text-[#FFFFFF] text-[2.4rem]"
        >
          Sorry, but you don’t have permission to access this page
        </div>
        <button
          @click="goHome"
          class="font-[Halvetica Neue] py-[0.9rem] px-[1.7rem] bg-[#E31221] rounded-[0.48rem] text-[#FFFFFF] text-[2rem]"
        >
          Return home
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import GandalfIcon from "@/components/icons/GandalfIcon.vue";
import GandalfUnion from "@/components/icons/GandalfUnionIcon.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => router.push({ name: "home" });
</script>
