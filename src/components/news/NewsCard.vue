<template>
  <div
    class="mb-[4rem] rounded-[1.2rem] bg-[#11101A] px-[2.4rem] pt-[2.4rem] pb-[4.1rem]"
  >
    <div
      class="border-NewsCardUnderline border-b-[1px] border-solid pb-[2.5rem]"
    >
      <div class="flex items-center">
        <img class="mx-[0px]" src="@/assets/png/profile.png" />
        <div
          class="font-[Helvetica Neue] ml-[1.6rem] text-[2rem] text-[#FFFFFF]"
        >
          Maia Nakashidze
        </div>
      </div>

      <div
        class="font-[Helvetica Neue] mt-[1.6rem] mb-[2.8rem] text-[2rem] text-[#FFFFFF]"
      >
        “Follow your dream.”movie- Billy Elliot. (2000)
      </div>

      <img src="@/assets/png/mainProfile.png" />

      <div class="mt-[2.45rem] flex">
        <div class="mx-[0rem] flex">
          <div class="mx-[0rem] text-[2rem] text-[#FFFFFF]">{{ comments.length }}</div>
          <CommentIcon class="ml-[1.2rem] mr-[2.4rem]" />
        </div>

        <div class="mx-[0rem] flex">
          <div class="mx-[0rem] text-[2rem] text-[#FFFFFF]">{{ likes }}</div>
          <LikeIcon @click="likeOrDislike" class="ml-[1.2rem] cursor-pointer" />
        </div>
      </div>
    </div>

    <div
      v-for="comment in comments"
      :key="comment.id"
      class="mt-[2.4rem] max-w-[93rem]"
    >
      <div class="flex items-center">
        <img class="mx-[0px]" src="@/assets/png/profile.png" />
        <div
          class="font-[Helvetica Neue] ml-[2.4rem] text-[2rem] text-[#FFFFFF]"
        >
          {{ comment.username }}
        </div>
      </div>
      <div
        class="font-[Helvetica Neue] border-NewsCardUnderline ml-[8.4rem] border-b-[1px] border-solid pb-[2.4rem] text-[2rem] text-[#FFFFFF]"
      >
        {{ comment.body }}
      </div>
    </div>

    <div class="mt-[2.4rem]">
      <div class="flex items-center">
        <img class="mx-[0px] mr-[2.4rem]" src="@/assets/png/profile.png" />
        <input
          @keyup.enter="writeComment"
          class="font-[Helvetica Neue] w-full rounded-[1rem] bg-[#24222F] py-[1.1rem] px-[2.7rem] text-[2rem] text-[#CED4DA] opacity-[0.6]"
          type="text"
          placeholder="Write a comment"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import CommentIcon from "@/components/icons/shared/CommentIcon.vue";
import LikeIcon from "@/components/icons/shared/LikeIcon.vue";
import { useAuthStore } from "@/stores/auth.js";
import { useMovieStore } from "@/stores/movie";
import { ref } from "vue-demi";

const movieStore = useMovieStore();
const auth = useAuthStore();
const comment = ref("");

const likeOrDislike = () =>
  movieStore.likeOrDislikeQuote(props.quoteId, auth.user.id);

const writeComment = () => {
  movieStore.commentOnQuote(props.quoteId, auth.user.username, comment.value);
  comment.value = "";
};

const props = defineProps({
  quoteId: {
    type: Number,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  comments: {
    type: Array,
    required: true,
  },
});
</script>
