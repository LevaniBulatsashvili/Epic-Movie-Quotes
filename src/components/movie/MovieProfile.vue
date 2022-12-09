<template>
  <div class="mt-[3rem] mb-[0.8rem] flex items-center">
    <img class="mx-[0rem]" src="@/assets/png/profile.png" />
    <div
      class="font-[Halvetica Neue] ml-[1.6rem] text-[2rem] capitalize text-[#FFFFFF]"
    >
      {{ username }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  username: {
    type: String,
    required: true,
  },
});
</script>
