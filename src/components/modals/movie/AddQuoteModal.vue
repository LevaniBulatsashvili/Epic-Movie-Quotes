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
      class="bg-movieModal fixed top-[0rem] left-[0rem] flex h-[100vh] w-[100vw] items-center justify-center"
    >
      <div @click.stop class="w-[95rem] rounded-[1rem] bg-[#222030]">
        <div
          class="border-movieModalUnderline mt-[0.9rem] flex items-center border-b-[1px] border-solid"
        >
          <div
            class="font-[Halvetica Neue] mr-[0rem] py-[2.5rem] text-[2.4rem] font-medium capitalize text-[#FFFFFF]"
          >
            add quote
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
          <MovieProfile :username="auth.user.username" />

          <div class="my-[3rem] flex">
            <img
              class="mx-[0rem] max-h-[15.8rem] max-w-[29rem]"
              src="@/assets/png/movie.png"
            />
            <div class="ml-[2.7rem]">
              <div
                class="font-[Halvetica Neue] mr-[5rem] ml-[0rem] text-[2.4rem] font-medium capitalize text-[#DDCCAA]"
              >
                {{ movieStore.movie.name.en }}
              </div>
              <div class="mt-[1.5rem] mb-[2.1rem] flex">
                <div
                  class="ml-[0rem] mr-[0.85rem]"
                  v-for="genre in genres"
                  :key="genre"
                >
                  <MovieGenre :genre="genre.genre.en" />
                </div>
              </div>
              <div
                class="font-[Halvetica Neue] text-[1.8rem] capitalize text-[#CED4DA]"
              >
                Director:
                <span
                  class="font-[Halvetica Neue] ml-[1rem] text-[1.8rem] font-medium capitalize text-[#FFFFFF]"
                  >{{ movieStore.movie.director.en }}</span
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
                placeholder="Quote"
                rules="required|max:255"
                lang="Eng"
              />
              <MovieField
                @onFieldChange="onQuoteKaChange"
                as="textarea"
                title="quote_ka"
                type="textarea"
                placeholder="ციტატა"
                rules="required|max:255"
                lang="ქარ"
              />

              <Field name="file">
                <div
                  class="mt-[3.4rem] mb-[3.2rem] flex items-center border-[1px] border-solid border-[#6C757D] bg-[#11101A]"
                >
                  <CameraIcon class="my-[3rem] ml-[1.8rem] mr-[1.1rem]" />
                  <div
                    class="font-[Halvetica Neue] mx-[0rem] text-[2rem] text-[#FFFFFF]"
                  >
                    Drag & drop your image here or
                  </div>
                  <input
                    @change="onFileChange"
                    class="border-box absolute left-[36rem] rounded-[0.4rem] border-[1px] border-solid border-[#6C757D] bg-[#11101A] opacity-[0.8]"
                    type="file"
                  />
                </div>
              </Field>

              <MainButton description="Add quote" :onClick="addQuote" />
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
import CloseIcon from "@/components/icons/movie/CloseIcon.vue";
import CameraIcon from "@/components/icons/movie/CameraIcon.vue";
import { Form, Field } from "vee-validate";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import { useMovieStore } from "@/stores/movie.js";
import axios from "@/config/axios.js";

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();
const movieStore = useMovieStore();
const genres = movieStore.movie.genres;

const quoteEn = ref("");
const quoteKa = ref("");

const onQuoteEnChange = (val) => (quoteEn.value = val);
const onQuoteKaChange = (val) => (quoteKa.value = val);

const formIsValid = ref(false);
const setFormIsValid = (meta) => (formIsValid.value = meta.valid);

const addQuote = async () => {
  if (formIsValid.value) {
    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/api/admin/movies/${route.params.id}/quotes`,
        {
          quote_en: quoteEn.value,
          quote_ka: quoteKa.value,
          // image: fd,
        }
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
