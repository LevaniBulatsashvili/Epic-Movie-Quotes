<template>
  <div class="bg-no-repeat h-[120rem]" :class="backgroundImage">
    <div class="ml-[17rem] pt-[41.5rem]">
      <HomeLineIcon class="absolute top-[45rem] h-[3px]" />
      <div class="ml-[6.9rem]">
        <div
          class="font-[Montserrat] mb-[1.6rem] mr-[93rem] font-bold text-[#FFFFFF] text-[5rem]"
        >
          “{{ quote }}”
        </div>
        <div class="font-[Halvetica Neue] font-bold text-[#D9D9D9] text-[3rem]">
          {{ props.movie }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HomeLineIcon from "@/components/icons/HomeLineIcon.vue";

const props = defineProps(["quote", "movie", "backgroundImage"]);
</script>
