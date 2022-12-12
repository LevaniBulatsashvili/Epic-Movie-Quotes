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
    <CameraIcon class="my-[3rem] ml-[1.8rem] mr-[1.1rem]" />
    <div class="font-[Halvetica Neue] mx-[0rem] text-[2rem] text-[#FFFFFF]">
      {{ $t("movie_modal.drag_drop_your_image_here_or") }}
    </div>
    <label
      class="font-[Halvetica Neue] bg-dropdown ml-[0.8rem] cursor-pointer p-[1rem] text-[2rem] leading-[110%] text-[#FFFFFF]"
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
