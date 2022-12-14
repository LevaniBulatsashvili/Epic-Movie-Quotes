<template>
  <div class="rounder-[1rem] mb-[4rem] bg-[#11101A] px-[3.2rem] pt-[2.4rem]">
    <div
      class="border-quoteUnderline flex items-start border-b-[1px] border-solid pb-[2.4rem] lg:flex-col"
    >
      <img
        class="max-w-[26.6rem]"
        :src="backendUrl + '/storage/' + thumbnail"
      />
      <div class="ml-[3.4rem] w-full">
        <div
          @click="toggleQuoteDropdown"
          class="z-10 mb-[2.8rem] flex lg:absolute lg:top-[9rem] lg:left-[32rem] md:left-[20rem]"
        >
          <ThreeDotIcon class="mr-[0rem] cursor-pointer" />
          <div
            v-if="quoteDropdown"
            class="absolute left-[95%] top-[100%] z-10 min-w-[22rem] rounded-[1rem] bg-[#24222F] py-[3.2rem] pl-[4rem] lg:left-[150%] lg:top-[-800%] md:left-[150%] md:top-[-800%] lg:min-w-[20rem]"
          >
            <button
              @click="
                router.push({
                  name: 'viewQuote',
                  params: { id: route.params.id, quoteId: quoteId },
                })
              "
              class="font-Halvetica_Neue flex cursor-pointer items-center gap-[1.6rem] text-[1.6rem] capitalize text-[#FFFFFF]"
            >
              <EyeIcon />
              {{ $t("movie_description.view_quote") }}
            </button>
            <button
              @click="
                router.push({
                  name: 'editQuote',
                  params: { id: route.params.id, quoteId: quoteId },
                })
              "
              class="font-Halvetica_Neue my-[3.2rem] flex cursor-pointer items-center gap-[1.6rem] text-[1.6rem] capitalize text-[#FFFFFF]"
            >
              <PencilIcon />
              {{ $t("movie_description.edit") }}
            </button>
            <button
              @click="deleteQuote"
              class="font-Halvetica_Neue flex cursor-pointer items-center gap-[1.6rem] text-[1.6rem] capitalize text-[#FFFFFF]"
            >
              <GarbageIcon />
              {{ $t("movie_description.delete") }}
            </button>
          </div>
        </div>
        <div class="font-Halvetica_Neue text-[2.4rem] italic text-[#CED4DA]">
          "{{ body[locale] }}"
        </div>
      </div>
    </div>
    <div class="mt-[2.4rem] flex pb-[2.6rem]">
      <div class="mx-[0rem] flex">
        <div class="font-Halvetica_Neue mr-[1.2rem] text-[2rem] text-[#FFFFFF]">
          {{ comments }}
        </div>
        <CommentIcon
          @click="
            router.push({
              name: 'viewQuote',
              params: { id: route.params.id, quoteId: quoteId },
            })
          "
          class="cursor-pointer"
        />
      </div>
      <div class="mx-[3.2rem] flex flex">
        <div class="font-Halvetica_Neue mr-[1.2rem] text-[2rem] text-[#FFFFFF]">
          {{ likes }}
        </div>
        <LikeIcon @click="likeOrDislike" class="cursor-pointer" />
      </div>
    </div>
  </div>
</template>

<script setup>
import CommentIcon from "@/components/icons/shared/CommentIcon.vue";
import LikeIcon from "@/components/icons/shared/LikeIcon.vue";
import ThreeDotIcon from "@/components/icons/movie/ThreeDotIcon.vue";
import EyeIcon from "@/components/icons/movie/EyeIcon.vue";
import GarbageIcon from "@/components/icons/movie/GarbageIcon.vue";
import PencilIcon from "@/components/icons/movie/PencilIcon.vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMovieStore } from "@/stores/movie";
import { useAuthStore } from "@/stores/auth";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const router = useRouter();
const route = useRoute();
const auth = useAuthStore();
const movieStore = useMovieStore();
const quoteDropdown = ref(false);
const locale = sessionStorage.getItem("locale") ?? "en";
const toggleQuoteDropdown = () => (quoteDropdown.value = !quoteDropdown.value);

const deleteQuote = () => {
  movieStore.deleteQuote(props.quoteId);
};

const likeOrDislike = () =>
  movieStore.likeOrDislikeQuote(props.quoteId, auth.user.id);

const props = defineProps({
  body: {
    type: Object,
    required: true,
  },
  comments: {
    type: Number,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  quoteId: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
});
</script>
