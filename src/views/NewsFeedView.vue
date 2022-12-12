<template>
  <div @click="removeSearch">
    <TheHeader />

    <div class="mt-[3.2rem] flex">
      <div class="ml-[6.95rem]">
        <BaseNavigation />
      </div>

      <div class="ml-[0rem]">
        <div class="flex min-w-[70rem]">
          <div
            class="mb-[2.2rem] flex flex-grow items-center rounded-[1rem] bg-[#24222F] opacity-[0.6]"
          >
            <WriteIcon
              @click="
                router.push({
                  name: 'newsFeed',
                  params: { modal: 'add-quote' },
                })
              "
              class="ml-[1.75rem] mr-[1.65rem] cursor-pointer"
            />
            <div
              @click="
                router.push({
                  name: 'newsFeed',
                  params: { modal: 'add-quote' },
                })
              "
              class="font-[Helvetica Neue] my-[1.1rem] mx-[0px] cursor-pointer text-[2rem] text-[#FFFFFF]"
            >
              {{ $t("news.write_new_quote") }}
            </div>
          </div>
          <input
            @click.stop
            @keyup.enter="onSearch"
            class="search font-[Halvetica Neue] border-searchBorder text-searchText ml-[5rem] mb-[2.2rem] w-[69rem] border-b-[1px] border-solid bg-transparent px-[1.5rem] text-[2rem]"
            :class="{ hidden: !searching }"
            type="text"
            :placeholder="`${$t('news.enter')} @ ${$t(
              'news.to_search_movies_enter'
            )} # ${$t('news.to_search_quotes')}`"
          />
          <div
            v-if="!searching"
            @click.stop="onSearchClicked"
            class="mb-[2.2rem] flex items-center"
          >
            <SearchIcon class="ml-[2.4rem] mr-[1.6rem]" />
            <div
              class="font-[Helvetica Neue] mx-[0rem] text-[2rem] text-[#CED4DA]"
            >
              {{ $t("news.search_by") }}
            </div>
          </div>
        </div>
        <NewsCard
          v-for="quote in movieStore.quotes"
          :key="quote.id"
          :quote="quote"
        />
      </div>
    </div>
  </div>

  <AddQuoteModalVue v-if="path === '/news-feed/add-quote'" />
</template>

<script setup>
import TheHeader from "@/components/shared/TheHeader.vue";
import BaseNavigation from "@/components/shared/BaseNavigation.vue";
import NewsCard from "@/components/news/NewsCard.vue";
import AddQuoteModalVue from "@/components/modals/news/AddQuoteModal.vue";
import WriteIcon from "@/components/icons/newsFeed/WriteIcon.vue";
import SearchIcon from "@/components/icons/shared/SearchIcon.vue";
import { useMovieStore } from "@/stores/movie";
import { computed, onBeforeMount, onBeforeUnmount, ref } from "vue-demi";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const path = computed(() => useRoute().path);
const movieStore = useMovieStore();
const auth = useAuthStore();
const searching = ref(false);

const onSearchClicked = () => {
  searching.value = true;
};

const onSearch = (e) => {
  let searchBy = e.target.value;
  const from = searchBy[0] === "@" ? "movie" : "";
  if (searchBy[0] === "@" || searchBy[0] === "#")
    searchBy = searchBy.substring(1);
  searching.value = false;

  movieStore.getQuotes(
    auth.user.id,
    sessionStorage.getItem("locale") ?? "en",
    searchBy,
    from
  );
};

const removeSearch = () => (searching.value = false);

const onScroll = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;

  if (Math.ceil(scrolled) + 100 >= scrollable) {
    movieStore.getRecentQuotes();
    window.removeEventListener("scroll", onScroll);
    setTimeout(() => {
      window.addEventListener("scroll", onScroll);
    }, 1000);
  }
};

window.addEventListener("scroll", onScroll);

onBeforeMount(() => movieStore.getRecentQuotes());
onBeforeUnmount(() => window.removeEventListener("scroll", onScroll));
</script>
