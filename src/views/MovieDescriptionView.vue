<template>
  <div>
    <TheHeader />

    <div v-if="movieStore.movie && movieStore.quotes" class="mt-[3.2rem] flex">
      <div class="ml-[7rem] mr-[12.7rem] md:hidden lg:ml-[3rem] lg:mr-[7rem]">
        <BaseNavigation />
      </div>
      <div class="pr-[7rem] md:pr-[0rem]">
        <div
          class="font-Halvetica_Neue mb-[3.5rem] text-[2.4rem] font-medium capitalize text-[#FFFFFF]"
        >
          {{ $t("movie_description.movie_description") }}
        </div>
        <MovieDetails
          :id="movieStore.movie.id"
          :name="movieStore.movie.name"
          :director="movieStore.movie.director"
          :description="movieStore.movie.description"
          :genres="movieStore.movie.genres"
          :thumbnail="movieStore.movie.thumbnail"
        />
        <div
          class="mt-[4rem] mb-[6rem] flex items-center md:block lg:mt-[1.5rem]"
        >
          <div
            class="ml-[0rem] mr-[1.6rem] border-r-[1px] border-solid border-[#6C757D] md:border-r-[0rem]"
          >
            <div
              class="font-[Helvetica Neue] pr-[1.6rem] text-[2.4rem] text-[#FFFFFF]"
            >
              {{ $t("movie_description.quotes") }} ({{
                $t("movie_description.total")
              }}
              {{ movieStore.quotes.length }})
            </div>
          </div>
          <button
            @click="router.push({ name: 'addQuote' })"
            class="font-[Helvetica Neue] flex items-center gap-[0.8rem] rounded-[0.48rem] bg-[#E31221] py-[0.9rem] px-[1.7rem] text-[2rem] text-[#FFFFFF] md:mt-[4rem]"
          >
            <PlusIcon />{{ $t("movie_description.add_quote") }}
          </button>
        </div>
        <div v-for="quote in movieStore.quotes" :key="quote.id">
          <MovieQuotes
            :quoteId="quote.id"
            :body="quote.body"
            :comments="quote.comments.length"
            :likes="quote.likes"
            :thumbnail="quote.thumbnail"
          />
        </div>
      </div>
    </div>
  </div>

  <EditMovieModal v-if="path.includes('edit-movie')" />
  <AddQuoteModal v-if="path === `/movies/${route.params.id}/add-quote`" />
  <EditQuoteModal v-if="path.includes('edit-quote')" />
  <ViewQuoteModal
    v-if="path === `/movies/${route.params.id}/quotes/${route.params.quoteId}`"
  />
</template>

<script setup>
import TheHeader from "@/components/shared/TheHeader.vue";
import BaseNavigation from "@/components/shared/BaseNavigation.vue";
import MovieDetails from "@/components/movie/MovieDetails.vue";
import MovieQuotes from "@/components/movie/MovieQuotes.vue";
import PlusIcon from "@/components/icons/movie/PlusIcon.vue";
import EditMovieModal from "@/components/modals/movie/EditMovieModal.vue";
import AddQuoteModal from "@/components/modals/movie/AddQuoteModal.vue";
import EditQuoteModal from "@/components/modals/movie/EditQuoteModal.vue";
import ViewQuoteModal from "@/components/modals/movie/ViewQuoteModal.vue";
import { useMovieStore } from "@/stores/movie";
import { computed, onBeforeMount } from "vue-demi";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const movieStore = useMovieStore();
const path = computed(() => useRoute().path);

onBeforeMount(() => {
  movieStore.getMovie(route.params.id);
  movieStore.getQuotes(route.params.id);
});
</script>
