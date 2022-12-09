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
            @click="deleteQuote"
            class="font-[Halvetica Neue] ml-[3.2rem] flex cursor-pointer gap-[1rem] text-[1.6rem] capitalize text-[#CED4DA]"
          >
            <GarbageIcon />
            Delete
          </div>
          <div
            class="font-[Halvetica Neue] mx-[0rem] py-[2.5rem] text-[2.4rem] font-medium capitalize text-[#FFFFFF]"
          >
            edit quote
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

              <!-- <Field name="file">
                <div
                  class="flex mt-[3.4rem] mb-[3.2rem] bg-[#11101A] border-[1px] border-solid border-[#6C757D] items-center">
                  <CameraIcon class="ml-[1.8rem] mr-[1.1rem] my-[3rem]" />
                  <div class="font-[Halvetica Neue] mx-[0rem] text-[2rem] text-[#FFFFFF]">Drag & drop your image here or
                  </div>
                  <input @change="onFileChange"
                    class="absolute left-[36rem] border-box bg-[#11101A] opacity-[0.8] border-[1px] border-solid border-[#6C757D] rounded-[0.4rem]"
                    type="file" />
                </div>
              </Field> -->

              <img class="w-full" src="@/assets/png/movie.png" />

              <MainButton description="Save changes" :onClick="editQuote" />
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
import MovieProfile from "@/components/movie/MovieProfile.vue";
import CloseIcon from "@/components/icons/movie/CloseIcon.vue";
// import CameraIcon from "@/components/icons/movie/CameraIcon.vue";
import GarbageIcon from "@/components/icons/movie/GarbageIcon.vue";
import { Form, Field } from "vee-validate";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import { useMovieStore } from "@/stores/movie";
import axios from "@/config/axios.js";

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();
const movieStore = useMovieStore();

const quoteEn = ref("");
const quoteKa = ref("");

const onQuoteEnChange = (val) => (quoteEn.value = val);
const onQuoteKaChange = (val) => (quoteKa.value = val);

const formIsValid = ref(false);
const setFormIsValid = (meta) => (formIsValid.value = meta.valid);

const editQuote = async () => {
  if (formIsValid.value) {
    try {
      const res = await axios.patch(
        `http://127.0.0.1:8000/api/admin/quotes/${route.params.quoteId}`,
        {
          quote_en: quoteEn.value,
          quote_ka: quoteKa.value,
          // image: fd,
        }
      );
      const editedQuote = res.data.quote;
      movieStore.quotes = movieStore.quotes.map((quote) =>
        quote.id !== editedQuote.id ? quote : editedQuote
      );
      router.push({
        name: "movieDescription",
        params: { id: route.params.id },
      });
    } catch (err) {
      console.log(err);
    }
  }
};

const deleteQuote = () => {
  movieStore.deleteQuote(route.params.quoteId);
  router.push({ name: "movieDescription", params: { id: route.params.id } });
};
</script>
