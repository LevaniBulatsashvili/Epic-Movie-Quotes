<template>
  <div @click="removeSearch">
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
            {{ $t("movie.my_list_of_movies") }} ({{ $t("movie.total") }}
            {{ movieStore.movies.length }})
          </div>

          <div class="mr-[0rem] flex items-center">
            <input
              @click.stop
              @keyup.enter="onSearch"
              class="search font-[Halvetica Neue] border-searchBorder text-searchText mr-[5rem] border-b-[1px] border-solid bg-transparent px-[1.5rem] py-[0.5rem] text-[2rem]"
              :class="{ hidden: !searching }"
              type="text"
              :placeholder="$t('movie.enter_to_search')"
            />
            <div
              v-if="!searching"
              @click.stop="onSearchClicked"
              class="font-[Helvetica Neue] ml-[1.6rem] mr-[3.1rem] flex cursor-pointer items-center gap-[1.6rem] text-[2rem] text-[#CED4DA]"
            >
              <SearchIcon />
              {{ $t("movie.search") }}
            </div>
            <button
              @click="router.push({ name: 'addMovie' })"
              class="font-[Helvetica Neue] flex items-center gap-[0.8rem] rounded-[0.48rem] bg-[#E31221] py-[0.9rem] px-[1.7rem] text-[2rem] text-[#FFFFFF]"
            >
              <PlusIcon />{{ $t("movie.add_movie") }}
            </button>
          </div>
        </div>

        <div class="mt-[3.8rem] grid grid-cols-3">
          <MovieCard
            v-for="movie in movieStore.movies"
            :id="movie.id"
            :name="movie.name"
            :quotes="movie.quotes"
            :thumbnail="movie.thumbnail"
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
import { computed, onBeforeMount, ref } from "vue-demi";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useMovieStore } from "@/stores/movie";

const router = useRouter();
const movieStore = useMovieStore();
const auth = useAuthStore();
const path = computed(() => useRoute().path);
const searching = ref(false);

const onSearchClicked = () => {
  searching.value = true;
};

const removeSearch = () => (searching.value = false);

const onSearch = (e) => {
  const searchBy = e.target.value;
  searching.value = false;
  movieStore.getMovies(
    auth.user.id,
    sessionStorage.getItem("locale") ?? "en",
    searchBy
  );
};

onBeforeMount(() => {
  movieStore.getMovies(auth.user.id);
});
</script>
