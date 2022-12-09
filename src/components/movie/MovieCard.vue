<template>
  <div class="my-[3rem] mr-[5rem]">
    <img
      @click="toMovieDescription"
      class="ml-[0rem] cursor-pointer"
      src="@/assets/png/movie.png"
    />
    <div
      class="font-[Helvetica Neue] mt-[1.6rem] mb-[1.7rem] text-[2.4rem] font-medium uppercase text-[#FFFFFF]"
    >
      {{ name.en }}
    </div>
    <div
      class="font-[Helvetica Neue] flex text-[2rem] font-medium text-[#FFFFFF]"
    >
      {{ quotes }}<MessageIcon class="ml-[1.2rem] cursor-pointer" />
    </div>
  </div>
</template>

<script setup>
import MessageIcon from "@/components/icons/movie/MessageIcon.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const toMovieDescription = () =>
  router.push({ name: "movieDescription", params: { id: props.id } });

const props = defineProps({
  name: {
    type: Object,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  quotes: {
    type: Number,
    required: true,
  },
});
</script>
