<template>
  <Teleport to="#app">
    <div
      @click="router.push({ name: 'movies' })"
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
            {{ $t("movie_modal.add_movie") }}
          </div>
          <CloseIcon
            @click="router.push({ name: 'movies' })"
            class="mr-[4.1rem] cursor-pointer"
          />
        </div>

        <div class="mx-[3.2rem] mb-[3.2rem]">
          <MovieProfile :user="auth.user" />

          <Form
            class="w-full max-w-[89.7rem]"
            @submit="() => ''"
            v-slot="{ meta }"
          >
            <div class="hidden">
              {{ setFormIsValid(meta) }}
            </div>
            <MovieField
              title="name_en"
              type="text"
              :placeholder="$t('movie_modal.movie_name')"
              rules="required|max:255"
              :lang="$t('movie_modal.en')"
              @onFieldChange="onNameEnChange"
            />
            <MovieField
              @onFieldChange="onNameKaChange"
              title="name_ka"
              type="text"
              :placeholder="$t('movie_modal.movie_name')"
              rules="required|max:255"
              :lang="$t('movie_modal.ka')"
            />

            <div
              class="scroll mt-[1.5rem] mb-[2.1rem] flex overflow-x-auto rounded-[0.48rem] border-[1px] border-solid border-[#6C757D] bg-[#11101A] py-[1.1rem] px-[1.9rem]"
            >
              <div
                class="ml-[0rem] mr-[0.85rem]"
                v-for="genre in allGenres"
                :key="genre.en"
              >
                <div
                  @click="onGenreClick(genre)"
                  class="flex cursor-pointer items-center rounded-[0.4rem] py-[0.63rem] px-[0.6rem]"
                  :class="
                    selectedGenres.includes(genre)
                      ? 'bg-[#127b04]'
                      : 'bg-[#6C757D]'
                  "
                >
                  <div
                    class="font-Halvetica_Neue text-[1.8rem] font-bold capitalize leading-[100%] text-[#FFFFFF]"
                  >
                    {{ genre[locale] }}
                  </div>
                </div>
              </div>
            </div>

            <MovieField
              @onFieldChange="onDirectorEnChange"
              title="director_en"
              type="text"
              :placeholder="$t('movie_modal.director')"
              rules="required|max:255"
              :lang="$t('movie_modal.en')"
            />
            <MovieField
              @onFieldChange="onDirectorKaChange"
              title="director_ka"
              type="text"
              :placeholder="$t('movie_modal.director')"
              rules="required|max:255"
              :lang="$t('movie_modal.ka')"
            />

            <MovieField
              @onFieldChange="ondescriptionEnChange"
              as="textarea"
              title="description_en"
              type="textarea"
              :placeholder="$t('movie_modal.movie_description')"
              rules="required|max:255"
              :lang="$t('movie_modal.en')"
            />
            <MovieField
              @onFieldChange="ondescriptionKaChange"
              as="textarea"
              title="description_ka"
              type="textarea"
              :placeholder="$t('movie_modal.movie_description')"
              rules="required|max:255"
              :lang="$t('movie_modal.ka')"
            />

            <FileDropdown @onFileChanged="onFileChanged" />

            <MainButton
              :description="$t('movie_modal.add_movie')"
              :onClick="addMovie"
            />
          </Form>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import MovieProfile from "@/components/movie/MovieProfile.vue";
import MovieField from "@/components/form/MovieField.vue";
import FileDropdown from "@/components/movie/FileDropdown.vue";
import CloseIcon from "@/components/icons/movie/CloseIcon.vue";
import MainButton from "@/components/form/MainButton.vue";
import { Form } from "vee-validate";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import { useMovieStore } from "@/stores/movie.js";
import axios from "@/config/axios.js";

const router = useRouter();
const auth = useAuthStore();
const movieStore = useMovieStore();
const locale = sessionStorage.getItem("locale") ?? "en";

const allGenres = movieStore.allGenres;
const nameEn = ref("");
const nameKa = ref("");
const directorEn = ref("");
const directorKa = ref("");
const descriptionEn = ref("");
const descriptionKa = ref("");
const file = ref("");

const selectedGenres = reactive([]);
const onNameEnChange = (val) => (nameEn.value = val);
const onNameKaChange = (val) => (nameKa.value = val);
const onDirectorEnChange = (val) => (directorEn.value = val);
const onDirectorKaChange = (val) => (directorKa.value = val);
const ondescriptionEnChange = (val) => (descriptionEn.value = val);
const ondescriptionKaChange = (val) => (descriptionKa.value = val);

const onFileChanged = (val) => (file.value = val);

const onGenreClick = (genre) => {
  const index = selectedGenres.indexOf(genre);
  if (index > -1) selectedGenres.splice(index, 1);
  else selectedGenres.push(genre);
};

const formIsValid = ref(false);
const setFormIsValid = (meta) => (formIsValid.value = meta.valid);

const addMovie = async () => {
  if (formIsValid.value && file.value) {
    const fd = new FormData();
    fd.append("user_id", auth.user.id);
    fd.append("name_en", nameEn.value);
    fd.append("name_ka", nameKa.value);
    fd.append("director_en", directorEn.value);
    fd.append("director_ka", directorKa.value);
    fd.append("description_en", descriptionEn.value);
    fd.append("description_ka", descriptionKa.value);
    fd.append("genres", JSON.stringify(Object.values(selectedGenres)));
    fd.append("thumbnail", file.value);

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_API_BASE_URL + "/admin/movies",
        fd
      );
      const movie = res.data.movie;
      movie.genres = res.data.genres;
      movieStore.movies.push(movie);
      router.push({ name: "movies" });
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
