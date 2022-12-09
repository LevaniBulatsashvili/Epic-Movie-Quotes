<template>
  <Teleport to="#app">
    <div
      @click="
        router.push({
          name: 'movieDescription',
          params: { id: route.params.id },
        })
      "
      class="bg-movieModal fixed top-[0rem] left-[0rem] flex h-[100vh] w-[100vw] items-center justify-center"
    >
      <div @click.stop class="w-[95rem] rounded-[1rem] bg-[#222030]">
        <div
          class="border-movieModalUnderline mt-[0.9rem] flex items-center border-b-[1px] border-solid"
        >
          <div
            class="font-[Halvetica Neue] mr-[0rem] py-[2.5rem] text-[2.4rem] font-medium capitalize text-[#FFFFFF]"
          >
            edit movie
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

        <div class="mx-[3.2rem] mb-[3.2rem]">
          <MovieProfile :username="auth.user.username" />

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
              placeholder="Movie name"
              rules="required|max:255"
              lang="Eng"
              @onFieldChange="onNameEnChange"
            />
            <MovieField
              @onFieldChange="onNameKaChange"
              title="name_ka"
              type="text"
              placeholder="ფილმის სახელი"
              rules="required|max:255"
              lang="ქარ"
            />

            <div
              class="mt-[1.5rem] mb-[2.1rem] flex rounded-[0.48rem] border-[1px] border-solid border-[#6C757D] bg-[#11101A] py-[1.1rem] px-[1.9rem]"
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
                    class="font-[Halvetica Neue] text-[1.8rem] font-bold capitalize leading-[100%] text-[#FFFFFF]"
                  >
                    {{ genre.en }}
                  </div>
                </div>
              </div>
            </div>

            <MovieField
              @onFieldChange="onDirectorEnChange"
              title="director_en"
              type="text"
              placeholder="Director"
              rules="required|max:255"
              lang="Eng"
            />
            <MovieField
              @onFieldChange="onDirectorKaChange"
              title="director_ka"
              type="text"
              placeholder="რეჟისორი"
              rules="required|max:255"
              lang="ქარ"
            />

            <MovieField
              @onFieldChange="ondescriptionEnChange"
              as="textarea"
              title="description_en"
              type="textarea"
              placeholder="Movie description"
              rules="required|max:255"
              lang="Eng"
            />
            <MovieField
              @onFieldChange="ondescriptionKaChange"
              as="textarea"
              title="description_ka"
              type="textarea"
              placeholder="ფილმის აღწერა"
              rules="required|max:255"
              lang="ქარ"
            />

            <!-- <Field name="file">
              <div class="flex mt-[3.4rem] mb-[3.2rem] bg-[#11101A] border-[1px] border-solid border-[#6C757D] items-center">
                <CameraIcon class="ml-[1.8rem] mr-[1.1rem] my-[3rem]" />
                <div class="font-[Halvetica Neue] mx-[0rem] text-[2rem] text-[#FFFFFF]">Drag & drop your image here or</div>
                <input
                  @change="onFileChange"
                  class="absolute left-[36rem] border-box bg-[#11101A] opacity-[0.8] border-[1px] border-solid border-[#6C757D] rounded-[0.4rem]"
                  type="file" />
              </div>
            </Field> -->

            <MainButton description="Edit movie" :onClick="editMovie" />
          </Form>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import MovieProfile from "@/components/movie/MovieProfile.vue";
import MovieField from "@/components/form/MovieField.vue";
import MainButton from "@/components/form/MainButton.vue";
import CloseIcon from "@/components/icons/movie/CloseIcon.vue";
import { Form, Field } from "vee-validate";
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import { useMovieStore } from "@/stores/movie.js";
import axios from "@/config/axios.js";

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();
const movieStore = useMovieStore();

const allGenres = movieStore.allGenres;
const nameEn = ref("");
const nameKa = ref("");
const directorEn = ref("");
const directorKa = ref("");
const descriptionEn = ref("");
const descriptionKa = ref("");
// let file = reactive({});

const selectedGenres = reactive([]);
const onNameEnChange = (val) => (nameEn.value = val);
const onNameKaChange = (val) => (nameKa.value = val);
const onDirectorEnChange = (val) => (directorEn.value = val);
const onDirectorKaChange = (val) => (directorKa.value = val);
const ondescriptionEnChange = (val) => (descriptionEn.value = val);
const ondescriptionKaChange = (val) => (descriptionKa.value = val);
// const onFileChange = (e) => file = e.target.files[0];

const onGenreClick = (genre) => {
  const index = selectedGenres.indexOf(genre);
  if (index > -1) selectedGenres.splice(index, 1);
  else selectedGenres.push(genre);
};

const formIsValid = ref(false);
const setFormIsValid = (meta) => (formIsValid.value = meta.valid);

const editMovie = async () => {
  // console.log(file);
  // let fd = new FormData();
  // fd.append("image", file);
  // console.log(fd);

  if (formIsValid.value) {
    try {
      const res = await axios.patch(
        `http://127.0.0.1:8000/api/admin/movies/${route.params.id}`,
        {
          name_en: nameEn.value,
          name_ka: nameKa.value,
          director_en: directorEn.value,
          director_ka: directorKa.value,
          description_en: descriptionEn.value,
          description_ka: descriptionKa.value,
          // image: fd,
          genres: Object.values(selectedGenres),
        }
      );
      const editedMovie = res.data.movie;
      editedMovie.genres = res.data.genres;
      movieStore.movie = editedMovie;
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
