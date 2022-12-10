<template>
  <Teleport to="#app">
    <div
      @click="router.push({ name: 'home' })"
      class="bg-modal fixed top-[0rem] left-[0rem] flex h-[100vh] w-[100vw] items-center justify-center"
    >
      <div @click.stop class="w-[60rem] rounded-[1rem] bg-[#222030]">
        <MainHeader
          :title="$t('auth.create_new_password')"
          :description="$t('auth.your_new_password_must_be_different_from_previous_used_passwords')"
        />

        <div class="mb-[5.3rem] flex">
          <Form
            class="min-w-[36rem]"
            @submit="changePassword"
            v-slot="{ meta }"
          >
            <div class="hidden">
              {{ setFormIsValid(meta) }}
            </div>
            <MainField
              :title="$t('auth.password')"
              type="password"
              :placeholder="$t('auth.at_least_8_max15_lower_case_characters')"
              rules="required|min:8|max:15"
              :keepAsterisk="true"
              :onClearField="onPasswordClear"
              @onFieldChange="onPasswordChange"
            />
            <MainField
              :title="$t('auth.confirm_password')"
              type="password"
              :placeholder="$t('auth.confirm_password')"
              rules="required|min:8|max:15|confirmed:@Password"
              :keepAsterisk="true"
              :onClearField="onConfirmPasswordClear"
              @onFieldChange="onConfirmPasswordChange"
            />

            <MainButton :description="$t('auth.reset_password')" :onClick="() => ''" />
            <div class="flex items-center text-center">
              <BackArrowIcon class="mr-[0rem]" />
              <router-link
                class="font-[Helvetica Neue] ml-[1.1rem] text-[1.6rem] text-[#6C757D]"
                :to="{ name: 'home', params: { modal: 'login' } }"
                >{{ $t("auth.back_to_log_in") }}
              </router-link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import MainField from "@/components/form/MainField.vue";
import MainHeader from "@/components/form/MainHeader.vue";
import MainButton from "@/components/form/MainButton.vue";
import BackArrowIcon from "@/components/icons/component/BackArrowIcon.vue";
import { Form } from "vee-validate";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import axios from "@/config/axios.js";

const router = useRouter();
const route = useRoute();

const email = ref(localStorage.getItem("email"));
const password = ref("");
const confirmPassword = ref("");
const token = route.params.data;
const formIsValid = ref(false);

const onPasswordClear = () => (password.value = "");
const onPasswordChange = (val) => (password.value = val);
const onConfirmPasswordChange = (val) => (confirmPassword.value = val);
const onConfirmPasswordClear = () => (confirmPassword.value = "");
const setFormIsValid = (meta) => (formIsValid.value = meta.valid);

const changePassword = async () => {
  if (formIsValid.value && confirmPassword.value === password.value) {
    await axios.post("http://127.0.0.1:8000/api/reset-password", {
      email: email.value,
      password: password.value,
      password_confirmation: confirmPassword.value,
      token,
    });
    router.push({
      name: "home",
      params: { modal: "password-changed" },
    });
  }
};
</script>
