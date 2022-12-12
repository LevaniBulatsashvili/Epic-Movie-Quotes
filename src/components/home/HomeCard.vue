<template>
  <div class="h-[120rem] pt-[41.5rem] bg-no-repeat lg:h-[80rem] lg:pt-[21rem] sm:pt-[5rem] lg:pt-[25rem] sm:pt-[15rem] lg:h-[80rem] sm:h-[43rem] bg-center bg-cover" :class="backgroundImage">
    <div class="flex items-center">
      <div class="flex ml-[17rem] lg:ml-[7rem] sm:ml-[3.5rem]">
        <HomeLineIcon class="top-[2rem] h-[1rem] mr-[0.7rem]" />
        <div class="ml-[0rem] max-w-[70rem] lg:max-w-[40rem] sm:max-w-[20rem]">
          <div class="mb-[1.6rem] font-[Montserrat] text-[5rem] font-bold text-[#FFFFFF] lg:text-[3.5rem] sm:text-[2rem]">
            “{{ quote }}”
          </div>
          <div class="font-Halvetica_Neue text-[3rem] font-bold text-[#D9D9D9] lg:text-[2.4rem] sm:text-[1.6rem]">
            {{ props.movie }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HomeLineIcon from "@/components/icons/component/HomeLineIcon.vue";

const props = defineProps(["quote", "movie", "backgroundImage"]);
</script>
