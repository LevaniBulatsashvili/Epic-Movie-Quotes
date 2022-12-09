<template>
  <div class="grid h-[100vh] items-center">
    <div>
      <div>
        <GandalfIcon class="z-10" />
        <GandalfUnion class="absolute top-[4rem] left-[19rem]" />
      </div>
      <div class="mt-[3rem] text-center">
        <div
          class="font-[Halvetica Neue] text-[4.7rem] font-bold text-[#FFFFFF]"
        >
          You shall not pass!
        </div>
        <div
          class="font-[Halvetica Neue] mt-[1rem] mb-[5rem] text-[2.4rem] font-medium text-[#FFFFFF]"
        >
          Sorry, but you don’t have permission to access this page
        </div>
        <button
          @click="goHome"
          class="font-[Halvetica Neue] rounded-[0.48rem] bg-[#E31221] py-[0.9rem] px-[1.7rem] text-[2rem] text-[#FFFFFF] hover:bg-[#CC0E10] active:bg-[#CC0E10]"
        >
          Return home
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import GandalfIcon from "@/components/icons/forbidden/GandalfIcon.vue";
import GandalfUnion from "@/components/icons/forbidden/GandalfUnionIcon.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => router.push({ name: "home" });
</script>
