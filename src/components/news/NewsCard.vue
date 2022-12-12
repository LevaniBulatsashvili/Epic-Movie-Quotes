<template>
  <div
    class="mb-[4rem] rounded-[1.2rem] bg-[#11101A] px-[2.4rem] pt-[2.4rem] pb-[4.1rem]"
  >
    <div
      class="border-NewsCardUnderline border-b-[1px] border-solid pb-[2.5rem]"
    >
      <div class="flex items-center">
        <img
          v-if="!quote.user_thumbnail"
          class="mx-[0px]"
          src="@/assets/png/profile.png"
        />
        <img
          v-else
          class="mx-[0rem]"
          :src="backendUrl + '/storage/' + quote.user_thumbnail"
        />
        <div
          class="font-[Helvetica Neue] ml-[1.6rem] text-[2rem] text-[#FFFFFF]"
        >
          {{ quote.username }}
        </div>
      </div>

      <div
        class="font-[Helvetica Neue] mt-[1.6rem] mb-[2.8rem] text-[2rem] text-[#FFFFFF]"
      >
        {{ quote.body[locale] }}
      </div>

      <img :src="backendUrl + '/storage/' + quote.thumbnail" />

      <div class="mt-[2.45rem] flex">
        <div class="mx-[0rem] flex">
          <div class="mx-[0rem] text-[2rem] text-[#FFFFFF]">
            {{ quote.comments.length }}
          </div>
          <CommentIcon class="ml-[1.2rem] mr-[2.4rem]" />
        </div>

        <div class="mx-[0rem] flex">
          <div class="mx-[0rem] text-[2rem] text-[#FFFFFF]">
            {{ quote.likes }}
          </div>
          <LikeIcon @click="likeOrDislike" class="ml-[1.2rem] cursor-pointer" />
        </div>
      </div>
    </div>

    <div
      v-for="comment in quote.comments"
      :key="comment.id"
      class="mt-[2.4rem] max-w-[93rem]"
    >
      <div class="flex items-center">
        <img
          v-if="!auth.user.thumbnail"
          class="mx-[0px]"
          src="@/assets/png/profile.png"
        />
        <img
          v-else
          class="mx-[0rem]"
          :src="backendUrl + '/storage/' + auth.user.thumbnail"
        />
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
        <img
          v-if="!auth.user.thumbnail"
          class="mx-[0px] mr-[2.4rem]"
          src="@/assets/png/profile.png"
        />
        <img
          v-else
          class="mx-[0rem]"
          :src="backendUrl + '/storage/' + auth.user.thumbnail"
        />
        <input
          @keyup.enter="writeComment"
          class="font-[Helvetica Neue] w-full rounded-[1rem] bg-[#24222F] py-[1.1rem] px-[2.7rem] text-[2rem] text-[#CED4DA] opacity-[0.6]"
          type="text"
          placeholder="Write a comment"
          v-model="comment"
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

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const movieStore = useMovieStore();
const auth = useAuthStore();
const comment = ref("");
const locale = sessionStorage.getItem("locale") ?? "en";

const likeOrDislike = () =>
  movieStore.likeOrDislikeQuote(props.quote.id, auth.user.id);

const writeComment = () => {
  movieStore.commentOnQuote(
    props.quote.id,
    auth.user.username,
    auth.user.thumbnail,
    comment.value
  );
  comment.value = "";
};

const props = defineProps({
  quote: {
    type: Object,
    required: true,
  },
});
</script>
