<template>
  <Teleport to="#app">
    <div
      v-if="movieStore.movie"
      @click="
        router.push({
          name: 'movieDescription',
          params: { id: route.params.id },
        })
      "
      class="bg-movieModal fixed top-[0rem] left-[0rem] mt-[10.5rem] flex w-[100vw] items-center justify-center md:left-[-2rem]"
    >
      <div
        @click.stop
        class="h-[70rem] w-[90rem] overflow-y-auto rounded-[1rem] bg-[#222030] sm:w-[32rem] md:w-[50rem]"
      >
        <div
          class="border-movieModalUnderline mt-[0.9rem] flex items-center border-b-[1px] border-solid"
        >
          <div
            class="font-Halvetica_Neue mr-[0rem] py-[2.5rem] text-[2.4rem] font-medium capitalize text-[#FFFFFF]"
          >
            {{ $t("movie_modal.add_quote") }}
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

          <div class="my-[3rem] flex md:block">
            <img
              class="mx-[0rem] max-h-[15.8rem] max-w-[29rem]"
              :src="backendUrl + '/storage/' + movieStore.movie.thumbnail"
            />
            <div class="ml-[2.7rem] md:ml-[0rem] md:mt-[2rem]">
              <div
                class="font-Halvetica_Neue mr-[5rem] ml-[0rem] text-[2.4rem] font-medium capitalize text-[#DDCCAA]"
              >
                {{ movieStore.movie.name[locale] }}
              </div>
              <div class="scroll mt-[1.5rem] mb-[2.1rem] flex overflow-x-auto">
                <div
                  class="ml-[0rem] mr-[0.85rem]"
                  v-for="genre in genres"
                  :key="genre"
                >
                  <MovieGenre :genre="genre.genre[locale]" />
                </div>
              </div>
              <div
                class="font-Halvetica_Neue text-[1.8rem] capitalize text-[#CED4DA]"
              >
                {{ $t("movie_modal.director") }}:
                <span
                  class="font-Halvetica_Neue ml-[1rem] text-[1.8rem] font-medium capitalize text-[#FFFFFF]"
                  >{{ movieStore.movie.director[locale] }}</span
                >
              </div>
            </div>
          </div>

          <div class="mb-[3.2rem] flex">
            <Form
              class="w-full max-w-[89.7rem]"
              @submit="() => ''"
              v-slot="{ meta }"
            >
              <div class="hidden">
                {{ setFormIsValid(meta) }}
              </div>

              <MovieField
                @onFieldChange="onQuoteEnChange"
                as="textarea"
                title="quote_en"
                type="textarea"
                :placeholder="$t('movie_modal.quote')"
                rules="required|max:255"
                :lang="$t('movie_modal.en')"
              />
              <MovieField
                @onFieldChange="onQuoteKaChange"
                as="textarea"
                title="quote_ka"
                type="textarea"
                :placeholder="$t('movie_modal.quote')"
                rules="required|max:255"
                :lang="$t('movie_modal.ka')"
              />

              <FileDropdown @onFileChanged="onFileChanged" />

              <MainButton
                :description="$t('movie_modal.add_quote')"
                :onClick="addQuote"
              />
            </Form>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import MovieField from "@/components/form/MovieField.vue";
import MainButton from "@/components/form/MainButton.vue";
import MovieGenre from "@/components/movie/MovieGenre.vue";
import MovieProfile from "@/components/movie/MovieProfile.vue";
import FileDropdown from "@/components/movie/FileDropdown.vue";
import CloseIcon from "@/components/icons/movie/CloseIcon.vue";
import { Form } from "vee-validate";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import { useMovieStore } from "@/stores/movie.js";
import axios from "@/config/axios.js";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const router = useRouter();
const route = useRoute();
const auth = useAuthStore();
const movieStore = useMovieStore();
const genres = ref([]);
const locale = sessionStorage.getItem("locale") ?? "en";
setTimeout(() => (genres.value = movieStore.movie.genres), 300);

const quoteEn = ref("");
const quoteKa = ref("");
const file = ref("");

const onQuoteEnChange = (val) => (quoteEn.value = val);
const onQuoteKaChange = (val) => (quoteKa.value = val);
const onFileChanged = (val) => (file.value = val);

const formIsValid = ref(false);
const setFormIsValid = (meta) => (formIsValid.value = meta.valid);

const addQuote = async () => {
  if (formIsValid.value && file.value) {
    const fd = new FormData();
    fd.append("username", auth.user.username);
    fd.append("quote_en", quoteEn.value);
    fd.append("quote_ka", quoteKa.value);
    fd.append("thumbnail", file.value);
    fd.append("user_thumbnail", auth.user.thumbnail);

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_API_BASE_URL +
          `/admin/movies/${route.params.id}/quotes`,
        fd
      );
      movieStore.quotes.push(res.data.quote);
      router.push({
        name: "movieDescription",
        params: { id: route.params.id },
      });
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style scoped>
.scroll::-webkit-scrollbar {
  background: rgb(94, 2, 94);
  height: 1rem;
}
</style>
