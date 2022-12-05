<template>
  <div class="grid h-[100vh] items-center">
    <div>
      <GhostIcon />
      <GhostUnderlineIcon class="mt-[2.7rem] mb-[3rem]" />
      <div class="text-center">
        <div
          class="font-[Halvetica Neue] text-[4.7rem] font-bold text-[#FFFFFF]"
        >
          Whoops!
        </div>
        <div
          class="font-[Halvetica Neue] mt-[1rem] mb-[5rem] text-[2.4rem] font-medium text-[#FFFFFF]"
        >
          We can't see the page you are looking for
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
import GhostIcon from "@/components/icons/GhostIcon.vue";
import GhostUnderlineIcon from "@/components/icons/GhostUnderlineIcon.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => router.push({ name: "home" });
</script>
