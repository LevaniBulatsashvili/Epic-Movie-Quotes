<template>
  <div class="mt-[3rem] mb-[0.8rem] flex items-center">
    <img v-if="!user.thumbnail" class="mx-[0rem]" src="@/assets/png/profile.png" />
    <img v-else class="mx-[0rem]" :src="'http://127.0.0.1:8000/storage/' + user.thumbnail" />
    <div
      class="font-[Halvetica Neue] ml-[1.6rem] text-[2rem] capitalize text-[#FFFFFF]"
    >
      {{ user.username }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>
