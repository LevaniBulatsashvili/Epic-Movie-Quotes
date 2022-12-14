<template>
  <div class="grid h-[100vh] items-center">
    <div>
      <div class="max-w-[60rem]">
        <GandalfUnion class="absolute top-[5rem] left-[18rem] sm:left-[4rem]" />
        <GandalfIcon class="z-20" />
      </div>
      <div class="mt-[3rem] text-center">
        <div
          class="font-Halvetica_Neue text-[4.7rem] font-bold text-[#FFFFFF] sm:text-[2.4rem] md:text-[3.2rem]"
        >
          {{ $t("forbidden.you_shall_not_pass") }}!
        </div>
        <div
          class="font-Halvetica_Neue mt-[1rem] mb-[5rem] text-[2.4rem] font-medium text-[#FFFFFF] sm:max-w-[30rem] sm:text-[1.6rem] md:text-[2rem]"
        >
          {{
            $t(
              "forbidden.sorry_but_you_dont_have_permission_to_access_this_page"
            )
          }}
        </div>
        <button
          @click="goHome"
          class="font-Halvetica_Neue rounded-[0.48rem] bg-[#E31221] py-[0.9rem] px-[1.7rem] text-[2rem] text-[#FFFFFF] hover:bg-[#CC0E10] active:bg-[#CC0E10] sm:text-[1.6rem]"
        >
          {{ $t("forbidden.return_home") }}
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
