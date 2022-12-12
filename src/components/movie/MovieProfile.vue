<template>
  <div class="mt-[3rem] mb-[0.8rem] flex items-center">
    <img
      v-if="!user.thumbnail"
      class="mx-[0rem]"
      src="@/assets/png/profile.png"
    />
    <img
      v-else
      class="mx-[0rem]"
      :src="backendUrl + '/storage/' + user.thumbnail"
    />
    <div
      class="font-Halvetica_Neue ml-[1.6rem] text-[2rem] capitalize text-[#FFFFFF]"
    >
      {{ user.username }}
    </div>
  </div>
</template>

<script setup>
const backendUrl = import.meta.env.VITE_BACKEND_URL;

defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>
