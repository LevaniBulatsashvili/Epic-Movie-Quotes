<template>
  <Teleport to="#app">
    <div
      v-if="movieStore.quote.id"
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
            @click="deleteQuote"
            class="font-Halvetica_Neue ml-[3.2rem] flex cursor-pointer gap-[1rem] text-[1.6rem] capitalize text-[#CED4DA]"
          >
            <GarbageIcon />
            {{ $t("movie_modal.delete") }}
          </div>
          <div
            class="font-Halvetica_Neue mx-[0rem] py-[2.5rem] text-[2.4rem] font-medium capitalize text-[#FFFFFF]"
          >
            {{ $t("movie_modal.edit_quote") }}
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
                :baseValue="movieStore.quote.body.en"
              />
              <MovieField
                @onFieldChange="onQuoteKaChange"
                as="textarea"
                title="quote_ka"
                type="textarea"
                :placeholder="$t('movie_modal.quote')"
                rules="required|max:255"
                :lang="$t('movie_modal.ka')"
                :baseValue="movieStore.quote.body.en"
              />

              <div>
                <label
                  for="dropzone"
                  class="absolute top-[38%] left-[45%] z-10 cursor-pointer rounded-[1rem] bg-[#181623] px-[1.6rem] pb-[1.4rem] pt-[2rem] text-center opacity-[0.65] hover:opacity-[0.8]"
                >
                  <CameraIcon />
                  <div
                    class="font-Halvetica_Neue mt-[1.5rem] text-[1.6rem] capitalize text-[#FFFFFF]"
                  >
                    {{ $t("movie_modal.change_photo") }}
                  </div>
                  <input
                    @change="onFileChanged"
                    class="hidden"
                    id="dropzone"
                    type="file"
                  />
                </label>
                <img
                  :src="backendUrl + '/storage/' + movieStore.quote.thumbnail"
                />
              </div>

              <MainButton
                :description="$t('movie_modal.save_changes')"
                :onClick="editQuote"
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
import MovieProfile from "@/components/movie/MovieProfile.vue";
import CameraIcon from "@/components/icons/movie/CameraIcon.vue";
import CloseIcon from "@/components/icons/movie/CloseIcon.vue";
import GarbageIcon from "@/components/icons/movie/GarbageIcon.vue";

import { Form } from "vee-validate";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import { useMovieStore } from "@/stores/movie";
import axios from "@/config/axios.js";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const router = useRouter();
const route = useRoute();
const auth = useAuthStore();
const movieStore = useMovieStore();

const quoteEn = ref("");
const quoteKa = ref("");
const file = ref("");

const onQuoteEnChange = (val) => (quoteEn.value = val);
const onQuoteKaChange = (val) => (quoteKa.value = val);

const onFileChanged = (e) => {
  const fileType = e.target.files[0].type;
  if (fileType === "image/png" || fileType === "image/jpeg")
    file.value = e.target.files[0];
  else file.value = "";
};

const formIsValid = ref(false);
const setFormIsValid = (meta) => (formIsValid.value = meta.valid);

const editQuote = async () => {
  if (formIsValid.value) {
    const fd = new FormData();
    if (!quoteEn.value) quoteEn.value = movieStore.quote.body.en;
    if (!quoteKa.value) quoteKa.value = movieStore.quote.body.ka;
    fd.append("username", auth.user.username);
    fd.append("quote_en", quoteEn.value);
    fd.append("quote_ka", quoteKa.value);
    if (file.value) fd.append("thumbnail", file.value);
    fd.append("user_thumbnail", auth.user.thumbnail);

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_API_BASE_URL +
          `/admin/quotes/${route.params.quoteId}`,
        fd
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

onBeforeMount(() => {
  movieStore.getQuote(route.params.quoteId);
});
</script>
