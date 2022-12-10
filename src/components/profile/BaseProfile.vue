<template>
  <div class="ml-[18.7rem] box-border rounded-[1.2rem]">
    <div
      class="font-[Helvetica Neue] mb-[12.6rem] ml-[3rem] text-[2.4rem] font-medium text-[#FFFFFF]"
    >
      {{ $t("profile.my_profile") }}
    </div>

    <div class="min-w-[100rem] bg-[#11101A] pt-[12.5rem] pb-[7.7rem]">
      <div>
        <img
          v-if="!auth.user.thumbnail"
          class="absolute bottom-[4rem] left-[40.5rem]"
          src="@/assets/png/mainProfile.png"
        />
        <img v-else class="absolute bottom-[4rem] left-[40.5rem]" :src="'http://127.0.0.1:8000/storage/' + auth.user.thumbnail" />
        <div class="text-center">
          <label
            class="font-[Helvetica Neue] text-center text-[2rem] text-[#FFFFFF] cursor-pointer"
            for="fileUpload">{{ $t("profile.upload_new_photo") }}</label>
          <input @change="onFileChange" class="hidden" id="fileUpload" type="file" />
          <div v-if="wrongFileType" class="font-[Halvetica Neue] text-[1.4rem] text-[#DC3545]" >{{ $t("profile.please_upload_correct_file_type") }} (png, jpeg, jpg)</div>
        </div>
      </div>

      <div class="mt-[4.2rem] mb-[5.3rem]">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth.js";
import { ref } from "vue-demi";

const auth = useAuthStore();
const file = ref("");
const wrongFileType = ref(false);

const onFileChange = (e) => {
  const fileType = e.target.files[0].type;
  wrongFileType.value = false;
  if (fileType === "image/png" || fileType === "image/jpeg") {
    file.value = e.target.files[0];
    const fd = new FormData();
    fd.append('thumbnail', file.value);
    auth.uploadImage(auth.user.id, fd);
  } else {
    wrongFileType.value = true;
    file.value = "";
  };
};

</script>
