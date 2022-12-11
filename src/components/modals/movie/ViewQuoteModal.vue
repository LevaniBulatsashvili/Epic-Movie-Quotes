<template>
  <Teleport to="#app">
    <div
      v-if="movieStore.quote.id"
      @click="
        router.push({
          name: 'movieDescription',
          params: { id: route.params.id },
        })
      "
      class="bg-movieModal fixed top-[0rem] left-[0rem] flex h-[100vh] w-[100vw] items-center justify-center"
    >
      <div
        @click.stop
        class="w-[95rem] rounded-[1rem] bg-[#222030] pb-[3.5rem]"
      >
        <div
          class="border-movieModalUnderline mt-[0.9rem] flex items-center border-b-[1px] border-solid"
        >
          <div
            class="ml-[3.2rem] mr-[0rem] border-r-[1px] border-solid border-[#6C757D] pr-[2.5rem]"
          >
            <PencilIcon
              @click="
                router.push({
                  name: 'editQuote',
                  params: {
                    id: route.params.id,
                    quoteId: route.params.quoteId,
                  },
                })
              "
              class="cursor-pointer"
            />
          </div>
          <div class="ml-[2.5rem]">
            <GarbageIcon @click="deleteQuote" class="cursor-pointer" />
          </div>
          <div
            class="font-[Halvetica Neue] mx-[0rem] py-[2.5rem] text-[2.4rem] font-medium capitalize text-[#FFFFFF]"
          >
            {{ $t("movie_modal.view_quote") }}
          </div>
          <CloseIcon
            @click="
              router.push({
                name: 'movieDescription',
                params: { id: route.params.id },
              })
            "
            class="mr-[4.1rem] cursor-pointer"
          />
        </div>

        <div class="mx-[3.2rem]">
          <MovieProfile :user="auth.user" />

          <div class="my-[2rem]">
            <div
              class="font-[Halvetica Neue] box-border w-full rounded-[0.4rem] border-[1px] border-solid border-[#6C757D] bg-[#11101A] py-[0.9rem] pl-[1.7rem] pr-[6rem] text-[2rem] text-[#FFFFFF] focus:outline-[#6C757D]"
            >
              "{{ movieStore.quote.body.en }}"
            </div>
            <div
              class="font-[Halvetica Neue] absolute right-[1.5rem] top-[0.8rem] text-[2rem] text-[#6C757D]"
            >
              {{ $t("movie_modal.en") }}
            </div>
          </div>

          <div class="my-[2rem]">
            <div
              class="font-[Halvetica Neue] box-border w-full rounded-[0.4rem] border-[1px] border-solid border-[#6C757D] bg-[#11101A] py-[0.9rem] pl-[1.7rem] pr-[6rem] text-[2rem] text-[#FFFFFF] focus:outline-[#6C757D]"
            >
              "{{ movieStore.quote.body.ka }}"
            </div>
            <div
              class="font-[Halvetica Neue] absolute right-[1.5rem] top-[0.8rem] text-[2rem] text-[#6C757D]"
            >
              {{ $t("movie_modal.ka") }}
            </div>
          </div>

          <div class="mb-[3.2rem] flex">
            <img
              class="w-full"
              :src="
                backendUrl + '/storage/' + movieStore.quote.thumbnail
              "
            />
          </div>

          <div class="mt-[2.4rem] flex pb-[2.6rem]">
            <div class="mx-[0rem] flex">
              <div
                class="font-[Halvetica Neue] mr-[1.2rem] text-[2rem] text-[#FFFFFF]"
              >
                {{ movieStore.quote.comments.length }}
              </div>
              <CommentIcon />
            </div>
            <div class="mx-[3.2rem] flex flex">
              <div
                class="font-[Halvetica Neue] mr-[1.2rem] text-[2rem] text-[#FFFFFF]"
              >
                {{ movieStore.quote.likes }}
              </div>
              <LikeIcon @click="likeOrDislike" class="cursor-pointer" />
            </div>
          </div>

          <div
            v-for="comment in movieStore.quote.comments"
            :key="comment"
            class="mt-[2.4rem] max-w-[93rem]"
          >
            <div class="flex items-center">
              <img
                v-if="!comment.thumbnail"
                class="mx-[0px]"
                src="@/assets/png/profile.png"
              />
              <img
                v-else
                class="mx-[0rem] mr-[2.4rem]"
                :src="backendUrl + '/storage/' + comment.thumbnail"
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
                class="mx-[0rem] mr-[2.4rem]"
                :src="backendUrl + '/storage/' + auth.user.thumbnail"
              />
              <input
                @keyup.enter="writeComment"
                class="font-[Helvetica Neue] w-full rounded-[1rem] bg-[#24222F] py-[1.1rem] px-[2.7rem] text-[2rem] text-[#CED4DA] opacity-[0.6]"
                type="text"
                :placeholder="$t('movie_modal.write_a_comment')"
                v-model="comment"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import MovieProfile from "@/components/movie/MovieProfile.vue";
import CloseIcon from "@/components/icons/movie/CloseIcon.vue";
import PencilIcon from "@/components/icons/movie/PencilIcon.vue";
import GarbageIcon from "@/components/icons/movie/GarbageIcon.vue";
import CommentIcon from "@/components/icons/shared/CommentIcon.vue";
import LikeIcon from "@/components/icons/shared/LikeIcon.vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import { useMovieStore } from "@/stores/movie";
import { onBeforeMount, ref } from "vue-demi";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const router = useRouter();
const route = useRoute();
const auth = useAuthStore();
const movieStore = useMovieStore();
const comment = ref("");

const deleteQuote = () => {
  movieStore.deleteQuote(route.params.quoteId);
  router.push({ name: "movieDescription", params: { id: route.params.id } });
};

const likeOrDislike = () =>
  movieStore.likeOrDislikeQuote(route.params.quoteId, auth.user.id);

const writeComment = () => {
  movieStore.commentOnQuote(
    +route.params.quoteId,
    auth.user.username,
    auth.user.thumbnail,
    comment.value
  );
  comment.value = "";
};

onBeforeMount(() => {
  movieStore.getQuote(route.params.quoteId);
});
</script>
