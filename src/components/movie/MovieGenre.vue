<template>
  <div
    class="font-[Halvetica Neue] rounded-[0.4rem] bg-[#6C757D] py-[0.63rem] px-[1.17rem] text-[1.8rem] font-bold capitalize leading-[100%] text-[#FFFFFF]"
  >
    {{ genre }}
  </div>
</template>

<script setup>
defineProps({
  genre: {
    type: String,
    required: true,
  },
});
</script>
