<template>
  <div
    @drop.prevent="onFileDrop"
    @dragenter.prevent="toggleActive"
    @dragleave.prevent="toggleActive"
    @dragover.prevent
    class="mt-[3.4rem] mb-[3.2rem] flex items-center border-[1px] border-solid border-[#6C757D] bg-[#11101A]"
    :class="{
      'border-[#334e75]': dropzoneActive,
      'border-[#4f7533]': file,
      'border-[#8b1d1d]': wrongFileType,
    }"
  >
    <CameraIcon class="my-[3rem] ml-[1.8rem] mr-[1.1rem] sm:hidden" />
    <div class="font-Halvetica_Neue mx-[0rem] text-[2rem] text-[#FFFFFF] sm:text-[1.6rem] sm:ml-[1rem]">
      {{ $t("movie_modal.drag_drop_your_image_here_or") }}
    </div>
    <label
      class="font-Halvetica_Neue bg-dropdown ml-[0.8rem] cursor-pointer p-[1rem] text-[2rem] leading-[110%] text-[#FFFFFF] md:mr-[1.5rem] sm:mr-[1rem] sm:my-[1rem]"
      for="dropzone"
      >{{ $t("movie_modal.choose_file") }}</label
    >
    <input @change="onFileChange" class="hidden" id="dropzone" type="file" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import CameraIcon from "@/components/icons/movie/CameraIcon.vue";

const dropzoneActive = ref(false);
const wrongFileType = ref(false);
const file = ref("");

const toggleActive = () => (dropzoneActive.value = !dropzoneActive.value);

const emit = defineEmits(["onFileChanged"]);
const onFileChanged = (file) => emit("onFileChanged", file);

const onFileDrop = (e) => {
  const fileType = e.dataTransfer.files[0].type;
  wrongFileType.value = false;
  toggleActive();
  if (fileType === "image/png" || fileType === "image/jpeg") {
    file.value = e.dataTransfer.files[0];
    onFileChanged(file.value);
  } else {
    wrongFileType.value = true;
    file.value = "";
    onFileChanged(file.value);
  }
};

const onFileChange = (e) => {
  const fileType = e.target.files[0].type;
  wrongFileType.value = false;
  if (fileType === "image/png" || fileType === "image/jpeg") {
    file.value = e.target.files[0];
    onFileChanged(file.value);
  } else {
    wrongFileType.value = true;
    file.value = "";
    onFileChanged(file.value);
  }
};
</script>
