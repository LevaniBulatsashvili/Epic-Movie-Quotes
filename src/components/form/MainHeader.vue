<template>
  <div class="mt-[5.3rem] mb-[2.4rem] flex flex-col items-center gap-[1.2rem]">
    <div
      class="font-[Helvetica Neue] text-[3.2rem] font-medium leading-[120%] text-[#FFFFFF]"
    >
      {{ title }}
    </div>
    <p :class="paragraphClass">{{ description }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  textColor: {
    type: String,
    required: false,
    default: "#6C757D",
  },
});

const paragraphClass = computed(
  () =>
    `font-[Helvetica Neue] text-center text-[1.6rem] text-[${props.textColor}]`
);
</script>
