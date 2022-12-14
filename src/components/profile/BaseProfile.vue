<template>
  <div class="box-border rounded-[1.2rem]">
    <div
      class="font-Halvetica_Neue mb-[12.6rem] text-[2.4rem] font-medium text-[#FFFFFF]"
    >
      {{ $t("profile.my_profile") }}
    </div>

    <div class="bg-[#11101A] pt-[12.5rem] pb-[7.7rem]">
      <div>
        <img
          v-if="!auth.user.thumbnail"
          class="absolute bottom-[4rem] left-[40.5rem] min-w-[20rem] md:left-[9rem] lg:left-[23rem]"
          src="@/assets/png/mainProfile.png"
        />
        <img
          v-else
          class="absolute bottom-[4rem] left-[40.5rem] min-w-[20rem] rounded-[15rem]  md:left-[9rem] lg:left-[23rem]"
          :src="backendUrl + '/storage/' + auth.user.thumbnail"
        />
        <div class="text-center">
          <label
            class="font-Halvetica_Neue cursor-pointer text-center text-[2rem] text-[#FFFFFF]"
            for="fileUpload"
            >{{ $t("profile.upload_new_photo") }}</label
          >
          <input
            @change="onFileChange"
            class="hidden"
            id="fileUpload"
            type="file"
          />
          <div
            v-if="wrongFileType"
            class="font-Halvetica_Neue text-[1.4rem] text-[#DC3545]"
          >
            {{ $t("profile.please_upload_correct_file_type") }} (png, jpeg, jpg)
          </div>
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

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const auth = useAuthStore();
const file = ref("");
const wrongFileType = ref(false);

const onFileChange = (e) => {
  const fileType = e.target.files[0].type;
  wrongFileType.value = false;
  if (fileType === "image/png" || fileType === "image/jpeg") {
    file.value = e.target.files[0];
    const fd = new FormData();
    fd.append("thumbnail", file.value);
    auth.uploadImage(auth.user.id, fd);
  } else {
    wrongFileType.value = true;
    file.value = "";
  }
};
</script>
