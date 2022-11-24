<template>
  <div>
    <TheHeader />

    <div class="flex mt-[3.2rem]">
      <div class="ml-[6.95rem]">
        <BaseNavigation />
      </div>

      <div class="ml-[0rem]">
        <div class="flex gap-[75rem]">
          <div
            class="font-[Helvetica Neue] ml-[0rem] font-medium text-[2.4rem] text-[#FFFFFF]"
          >
            My list of movies (Total 25)
          </div>

          <div class="flex items-center">
            <div
              class="flex items-center gap-[1.6rem] font-[Helvetica Neue] ml-[1.6rem] mr-[3.1rem] text-[2rem] text-[#CED4DA]"
            >
              <SearchIcon />
              Search
            </div>
            <button
              class="flex items-center gap-[0.8rem] font-[Helvetica Neue] bg-[#E31221] py-[0.9rem] px-[1.7rem] text-[2rem] text-[#FFFFFF] rounded-[0.48rem]"
            >
              <PlusIcon />Add movie
            </button>
          </div>
        </div>

        <div class="mt-[3.8rem] grid grid-cols-3">
          <MovieCard v-for="movie in movies" :key="movie" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TheHeader from "@/components/TheHeader.vue";
import BaseNavigation from "@/components/BaseNavigation.vue";
import MovieCard from "@/components/MovieCard.vue";
import SearchIcon from "@/components/icons/newsFeed/SearchIcon.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";

const movies = [1, 2, 3, 4, 5, 6, 7, 8, 9];
</script>
