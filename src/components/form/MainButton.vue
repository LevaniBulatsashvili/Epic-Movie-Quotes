<template>
  <div class="max-w-[36rem] mt-[2.4rem] mb-[1.6rem] flex justify-center">
    <button
      @click="onClick"
      class="font-[Helvetica Neue] w-full flex justify-center py-[0.7rem] px-[1.3rem] bg-[#E31221] rounded-[0.4rem] text-[1.6rem] text-[#FFFFFF]"
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
    required: true,
  },
});
</script>
