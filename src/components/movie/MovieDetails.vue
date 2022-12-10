<template>
  <div class="flex">
    <img :src="'http://127.0.0.1:8000/storage/' + thumbnail" />
    <div class="pl-[2.1rem]">
      <div class="flex">
        <div
          class="font-[Halvetica Neue] mr-[5rem] ml-[0rem] text-[2.4rem] font-medium capitalize text-[#DDCCAA]"
        >
          {{ name[locale] }}
        </div>
        <div
          class="mr-[0rem] flex items-center rounded-[1rem] bg-[#24222F] opacity-[0.6]"
        >
          <div class="my-[1rem] border-r-[1px] border-solid border-[#6C757D]">
            <div
              @click="router.push({ name: 'editMovie', params: { id: id } })"
              class="ml-[2.7rem] mr-[2.5rem] cursor-pointer"
            >
              <PencilIcon />
            </div>
          </div>
          <div
            @click="deleteMovie"
            class="ml-[2.6rem] mr-[2.8rem] cursor-pointer"
          >
            <GarbageIcon />
          </div>
        </div>
      </div>
      <div class="mt-[1.5rem] mb-[2.1rem] flex">
        <div
          class="ml-[0rem] mr-[0.85rem]"
          v-for="genre in genres"
          :key="genre.id"
        >
          <MovieGenre :genre="genre.genre[locale]" />
        </div>
      </div>
      <div
        class="font-[Halvetica Neue] text-[1.8rem] capitalize text-[#CED4DA]"
      >
        {{ $t("movie_description.director") }}:
        <span
          class="font-[Halvetica Neue] ml-[1rem] text-[1.8rem] font-medium capitalize text-[#FFFFFF]"
          >{{ director[locale] }}</span
        >
      </div>
      <div
        class="font-[Halvetica Neue] text-[1.8rem] capitalize text-[#CED4DA]"
      >
        {{ $t("movie_description.budget") }}:
        <span
          class="font-[Halvetica Neue] ml-[1.6rem] text-[1.8rem] font-medium capitalize text-[#FFFFFF]"
          >{{ budget }}$</span
        >
      </div>
      <div
        class="font-[Halvetica Neue] mt-[2rem] text-[1.8rem] capitalize text-[#CED4DA]"
      >
        {{ description[locale] }}
      </div>
    </div>
  </div>
</template>

<script setup>
import PencilIcon from "@/components/icons/movie/PencilIcon.vue";
import GarbageIcon from "@/components/icons/movie/GarbageIcon.vue";
import MovieGenre from "@/components/movie/MovieGenre.vue";
import { useMovieStore } from "@/stores/movie";
import { useRouter } from "vue-router";

const router = useRouter();
const movieStore = useMovieStore();
const genres = props.genres;
const locale = sessionStorage.getItem("locale") ?? "en";

const deleteMovie = () => {
  movieStore.deleteMovie(props.id);
  router.push({ name: "movies" });
};

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: Object,
    required: true,
  },
  director: {
    type: Object,
    required: true,
  },
  budget: {
    type: String,
    required: false,
    default: "2,000,000",
  },
  description: {
    type: Object,
    required: true,
  },
  genres: {
    type: Object,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
});
</script>
