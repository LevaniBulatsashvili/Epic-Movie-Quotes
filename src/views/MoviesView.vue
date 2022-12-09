<template>
  <div>
    <TheHeader />

    <div class="mt-[3.2rem] flex">
      <div class="ml-[6.95rem]">
        <BaseNavigation />
      </div>

      <div class="ml-[12.7rem] mr-[7rem]">
        <div class="flex">
          <div
            class="font-[Helvetica Neue] ml-[0rem] text-[2.4rem] font-medium text-[#FFFFFF]"
          >
            My list of movies (Total {{ movieStore.movies.length }})
          </div>

          <div class="mr-[0rem] flex items-center">
            <div
              class="font-[Helvetica Neue] ml-[1.6rem] mr-[3.1rem] flex items-center gap-[1.6rem] text-[2rem] text-[#CED4DA]"
            >
              <SearchIcon />
              Search
            </div>
            <button
              @click="router.push({ name: 'addMovie' })"
              class="font-[Helvetica Neue] flex items-center gap-[0.8rem] rounded-[0.48rem] bg-[#E31221] py-[0.9rem] px-[1.7rem] text-[2rem] text-[#FFFFFF]"
            >
              <PlusIcon />Add movie
            </button>
          </div>
        </div>

        <div class="mt-[3.8rem] grid grid-cols-3">
          <MovieCard
            v-for="movie in movieStore.movies"
            :id="movie.id"
            :name="movie.name"
            :quotes="movie.quotes"
            :key="movie.id"
          />
        </div>
      </div>
    </div>
  </div>

  <AddMovieModal v-if="path === '/movies/add-movie'" />
</template>

<script setup>
import TheHeader from "@/components/shared/TheHeader.vue";
import BaseNavigation from "@/components/shared/BaseNavigation.vue";
import MovieCard from "@/components/movie/MovieCard.vue";
import AddMovieModal from "@/components/modals/movie/AddMovieModal.vue";
import SearchIcon from "@/components/icons/shared/SearchIcon.vue";
import PlusIcon from "@/components/icons/movie/PlusIcon.vue";
import { computed, onBeforeMount } from "vue-demi";
import { useRoute, useRouter } from "vue-router";
import { useMovieStore } from "@/stores/movie";

const router = useRouter();
const movieStore = useMovieStore();
const path = computed(() => useRoute().path);

onBeforeMount(() => {
  movieStore.getMovies();
});
</script>
