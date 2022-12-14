<template>
  <Teleport to="#app">
    <div
      @click="router.push({ name: 'newsFeed' })"
      class="bg-movieModal fixed top-[0rem] left-[0rem] flex mt-[10.5rem] w-[100vw] items-center justify-center md:left-[-2rem]"
    >
      <div @click.stop class="w-[90rem] rounded-[1rem] bg-[#222030] overflow-y-auto h-[77rem] md:w-[50rem] sm:w-[32rem]">
        <div
          class="border-movieModalUnderline mt-[0.9rem] flex items-center border-b-[1px] border-solid"
        >
          <div
            class="font-Halvetica_Neue mr-[0rem] py-[2.5rem] text-[2.4rem] font-medium capitalize text-[#FFFFFF]"
          >
            {{ $t("news.write_new_quote") }}
          </div>
          <CloseIcon
            @click="router.push({ name: 'newsFeed' })"
            class="mr-[4.1rem] cursor-pointer"
          />
        </div>

        <div class="mx-[3.2rem]">
          <div class="mt-[3rem] mb-[1.9rem] flex items-center">
            <img
              v-if="!auth.user.thumbnail"
              class="mx-[0px] max-w-[6rem] rounded-[5rem]"
              src="@/assets/png/profile.png"
            />
            <img
              v-else
              class="mx-[0rem] max-w-[6rem] rounded-[5rem]"
              :src="backendUrl + '/storage/' + auth.user.thumbnail"
            />
            <div
              class="font-[Helvetica Neue] ml-[2.4rem] text-[2rem] text-[#FFFFFF]"
            >
              {{ auth.user.username }}
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
                :placeholder="$t('news.start_create_new_quote')"
                rules="required|max:255"
                :lang="$t('movie_modal.en')"
              />
              <MovieField
                @onFieldChange="onQuoteKaChange"
                as="textarea"
                title="quote_ka"
                type="textarea"
                :placeholder="$t('news.start_create_new_quote')"
                rules="required|max:255"
                :lang="$t('movie_modal.ka')"
              />

              <FileDropdown @onFileChanged="onFileChanged" />

              <div>
                <div
                  @click="toggleMovieDropdown"
                  class="font-Halvetica_Neue flex cursor-pointer items-center rounded-[0.4rem] bg-[#000000] py-[2.5rem]"
                >
                  <CameraIcon class="ml-[2.4rem] mr-[1.2rem]" />
                  <div class="ml-[0rem] text-[2.4rem] text-[#FFFFFF]">
                    {{ $t("news.choose_movie") }}
                  </div>
                  <DropArrowIcon class="mr-[2.4rem]" />
                </div>
                <div v-if="movieDropdown" class="bg-[#000000]">
                  <button
                    v-for="movie in movieStore.movies"
                    :key="movie.id"
                    @click="setMovieId(movie.id)"
                    class="mx-auto block w-full border-[1px] border-solid border-purple-400 py-[1.5rem] text-[2rem] text-[#FFFFFF] hover:bg-purple-900"
                  >
                    {{ movie.name[locale] }}
                  </button>
                </div>
              </div>
              <div
                v-if="movieNotSelected"
                class="font-Halvetica_Neue mt-[0.5rem] bg-purple-800 p-[1rem] text-[1.6rem] text-[#FFFFFF]"
              >
                {{ $t("news.please_select_a_movie") }}
              </div>

              <MainButton :description="$t('news.post')" :onClick="addQuote" />
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
import FileDropdown from "@/components/movie/FileDropdown.vue";
import CameraIcon from "@/components/icons/newsFeed/CameraIcon.vue";
import DropArrowIcon from "@/components/icons/newsFeed/DropArrowIcon.vue";
import CloseIcon from "@/components/icons/movie/CloseIcon.vue";
import { Form } from "vee-validate";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import { useMovieStore } from "@/stores/movie.js";
import axios from "@/config/axios.js";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const router = useRouter();
const auth = useAuthStore();
const movieStore = useMovieStore();
const movieId = ref(null);
const locale = sessionStorage.getItem("locale") ?? "en";
const movieDropdown = ref(false);
const movieNotSelected = ref(false);

const quoteEn = ref("");
const quoteKa = ref("");
const file = ref("");

const onQuoteEnChange = (val) => (quoteEn.value = val);
const onQuoteKaChange = (val) => (quoteKa.value = val);
const onFileChanged = (val) => (file.value = val);

const formIsValid = ref(false);
const setFormIsValid = (meta) => (formIsValid.value = meta.valid);

const setMovieId = (id) => {
  movieDropdown.value = false;
  movieId.value = id;
};

const toggleMovieDropdown = () => {
  movieNotSelected.value = false;
  movieDropdown.value = !movieDropdown.value;
};

const addQuote = async () => {
  if (!movieId.value) movieNotSelected.value = true;
  if (formIsValid.value && file.value && movieId.value) {
    const fd = new FormData();
    fd.append("username", auth.user.username);
    fd.append("quote_en", quoteEn.value);
    fd.append("quote_ka", quoteKa.value);
    fd.append("thumbnail", file.value);
    fd.append("user_thumbnail", auth.user.thumbnail);

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_API_BASE_URL +
          `/admin/movies/${movieId.value}/quotes`,
        fd
      );
      movieStore.quotes.unshift(res.data.quote);
      router.push({ name: "newsFeed" });
    } catch (err) {
      console.log(err);
    }
  }
};

onBeforeMount(() => movieStore.getMovies(auth.user.id));
</script>
