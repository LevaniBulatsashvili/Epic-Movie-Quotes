<template>
  <div class="grid h-[100vh] items-center">
    <div class="max-w-[60rem]">
      <GhostIcon />
      <GhostUnderlineIcon class="mt-[2.7rem] mb-[3rem]" />
      <div class="text-center">
        <div
          class="font-Halvetica_Neue text-[4.7rem] font-bold text-[#FFFFFF] sm:text-[3.6rem]"
        >
          {{ $t("not_found.whoops") }}!
        </div>
        <div
          class="font-Halvetica_Neue mt-[1rem] mb-[5rem] text-[2.4rem] font-medium text-[#FFFFFF] sm:text-[1.6rem]"
        >
          {{ $t("not_found.we_cant_see_the_page_you_are_looking_for") }}
        </div>
        <button
          @click="goHome"
          class="font-Halvetica_Neue rounded-[0.48rem] bg-[#E31221] py-[0.9rem] px-[1.7rem] text-[2rem] text-[#FFFFFF] hover:bg-[#CC0E10] active:bg-[#CC0E10] sm:text-[1.6rem]"
        >
          {{ $t("not_found.return_home") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import GhostIcon from "@/components/icons/notFound/GhostIcon.vue";
import GhostUnderlineIcon from "@/components/icons/notFound/GhostUnderlineIcon.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => router.push({ name: "home" });
</script>
