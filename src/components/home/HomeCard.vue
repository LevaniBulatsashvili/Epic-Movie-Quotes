<template>
  <div
    class="h-[120rem] bg-cover bg-center bg-no-repeat pt-[41.5rem] sm:h-[43rem] sm:pt-[5rem] sm:pt-[15rem] lg:h-[80rem] lg:h-[80rem] lg:pt-[21rem] lg:pt-[25rem]"
    :class="backgroundImage"
  >
    <div class="flex items-center">
      <div class="ml-[17rem] flex sm:ml-[3.5rem] lg:ml-[7rem]">
        <HomeLineIcon class="top-[2rem] mr-[0.7rem] h-[1rem]" />
        <div class="ml-[0rem] max-w-[70rem] sm:max-w-[20rem] lg:max-w-[40rem]">
          <div
            class="mb-[1.6rem] font-[Montserrat] text-[5rem] font-bold text-[#FFFFFF] sm:text-[2rem] lg:text-[3.5rem]"
          >
            “{{ quote }}”
          </div>
          <div
            class="font-Halvetica_Neue text-[3rem] font-bold text-[#D9D9D9] sm:text-[1.6rem] lg:text-[2.4rem]"
          >
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
