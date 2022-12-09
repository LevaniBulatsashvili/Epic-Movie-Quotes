<template>
  <div class="rounder-[1rem] mb-[4rem] bg-[#11101A] px-[3.2rem] pt-[2.4rem]">
    <div
      class="border-quoteUnderline flex items-start border-b-[1px] border-solid pb-[2.4rem]"
    >
      <img class="mx-[0rem]" src="@/assets/png/quote.png" />
      <div class="ml-[3.4rem] w-full">
        <div @click="toggleQuoteDropdown" class="mb-[2.8rem] flex">
          <ThreeDotIcon class="mr-[0rem] cursor-pointer" />
          <div
            v-if="quoteDropdown"
            class="absolute left-[39rem] top-[2.5rem] z-10 min-w-[25rem] rounded-[1rem] bg-[#24222F] py-[3.2rem] pr-[9rem] pl-[4rem]"
          >
            <button
              @click="
                router.push({
                  name: 'viewQuote',
                  params: { id: route.params.id, quoteId: quoteId },
                })
              "
              class="font-[Halvetica Neue] flex cursor-pointer items-center gap-[1.6rem] text-[1.6rem] capitalize text-[#FFFFFF]"
            >
              <EyeIcon />
              View quote
            </button>
            <button
              @click="
                router.push({
                  name: 'editQuote',
                  params: { id: route.params.id, quoteId: quoteId },
                })
              "
              class="font-[Halvetica Neue] my-[3.2rem] flex cursor-pointer items-center gap-[1.6rem] text-[1.6rem] capitalize text-[#FFFFFF]"
            >
              <PencilIcon />
              Edit
            </button>
            <button
              @click="deleteQuote"
              class="font-[Halvetica Neue] flex cursor-pointer items-center gap-[1.6rem] text-[1.6rem] capitalize text-[#FFFFFF]"
            >
              <GarbageIcon />
              Delete
            </button>
          </div>
        </div>
        <div class="font-[Halvetica Neue] text-[2.4rem] italic text-[#CED4DA]">
          "{{ body }}"
        </div>
      </div>
    </div>
    <div class="mt-[2.4rem] flex pb-[2.6rem]">
      <div class="mx-[0rem] flex">
        <div
          class="font-[Halvetica Neue] mr-[1.2rem] text-[2rem] text-[#FFFFFF]"
        >
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
        <div
          class="font-[Halvetica Neue] mr-[1.2rem] text-[2rem] text-[#FFFFFF]"
        >
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

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();
const movieStore = useMovieStore();
const quoteDropdown = ref(false);
const toggleQuoteDropdown = () => (quoteDropdown.value = !quoteDropdown.value);

const deleteQuote = () => {
  movieStore.deleteQuote(props.quoteId);
};

const likeOrDislike = () =>
  movieStore.likeOrDislikeQuote(props.quoteId, auth.user.id);

const props = defineProps({
  body: {
    type: String,
    required: false,
    default: "Frankly, my dear, I don'tgive a damn.",
  },
  comments: {
    type: Number,
    required: false,
    default: 3,
  },
  likes: {
    type: Number,
    required: false,
    default: 10,
  },
  quoteId: {
    type: Number,
    required: true,
  },
});
</script>
