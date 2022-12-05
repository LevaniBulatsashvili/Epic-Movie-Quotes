<template>
  <div class="mt-[2.4rem] mb-[1.6rem] flex justify-center">
    <button
      @click="onClick"
      class="font-[Helvetica Neue] flex w-full justify-center rounded-[0.4rem] bg-[#E31221] py-[0.7rem] px-[1.3rem] text-[1.6rem] text-[#FFFFFF] hover:bg-[#CC0E10] active:bg-[#CC0E10]"
    >
      {{ description }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  description: {
    type: String,
    required: true,
  },
  onClick: {
    type: Function,
    required: false,
  },
});
</script>
