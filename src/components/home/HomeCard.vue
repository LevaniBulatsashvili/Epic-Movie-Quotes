<template>
  <div class="h-[120rem] bg-no-repeat" :class="backgroundImage">
    <div class="ml-[17rem] pt-[41.5rem]">
      <HomeLineIcon class="absolute top-[45rem] h-[3px]" />
      <div class="ml-[6.9rem]">
        <div
          class="mb-[1.6rem] mr-[93rem] font-[Montserrat] text-[5rem] font-bold text-[#FFFFFF]"
        >
          “{{ quote }}”
        </div>
        <div class="font-[Halvetica Neue] text-[3rem] font-bold text-[#D9D9D9]">
          {{ props.movie }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HomeLineIcon from "@/components/icons/component/HomeLineIcon.vue";

const props = defineProps(["quote", "movie", "backgroundImage"]);
</script>
