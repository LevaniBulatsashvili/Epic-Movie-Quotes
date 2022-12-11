<template>
  <Teleport to="#app">
    <div
      @click="router.push({ name: 'home' })"
      class="bg-modal fixed top-[0rem] left-[0rem] flex h-[100vh] w-[100vw] items-center justify-center"
    >
      <div @click.stop class="w-[60rem] rounded-[1rem] bg-[#222030]">
        <MainHeader
          :title="$t('auth.create_an_account')"
          :description="$t('auth.start_your_journey')"
        />

        <div class="mb-[5.3rem] flex">
          <Form class="min-w-[36rem]" @submit="() => ''" v-slot="{ meta }">
            <div class="hidden">
              {{ setFormIsValid(meta) }}
            </div>

            <MainField
              @input="onUsernameChange"
              :title="$t('auth.name')"
              type="text"
              :placeholder="$t('auth.at_least_3_max15_lower case_characters')"
              rules="required|min:3|max:15"
              :keepAsterisk="true"
              :asyncValidationFailed="usernameTaken"
              :asyncError="$t('auth.username_is_taken')"
              :onClearField="onUsernameClear"
              @onFieldChange="onUsernameChange"
            />
            <MainField
              @input="onEmailChange"
              :title="$t('auth.email')"
              type="email"
              :placeholder="$t('auth.enter_your_email')"
              rules="required|email"
              :keepAsterisk="true"
              :asyncValidationFailed="emailTaken"
              :asyncError="$t('auth.email_is_taken')"
              :onClearField="onEmailClear"
              @onFieldChange="onEmailChange"
            />
            <MainField
              :title="$t('auth.password')"
              type="password"
              :placeholder="$t('auth.at_least_8_max15_lower_case_characters')"
              rules="required|min:8|max:15"
              :keepAsterisk="true"
              :onClearField="onPasswordClear"
              @onFieldChange="onPasswordChange"
            />
            <Field class="hidden" name="passwordsMatch" v-model="password" />
            <MainField
              :title="$t('auth.confirm_password')"
              type="password"
              :placeholder="$t('auth.confirm_password')"
              rules="required|min:8|max:15|confirmed:@passwordsMatch"
              :keepAsterisk="true"
              :onClearField="onConfirmPasswordClear"
              @onFieldChange="onConfirmPasswordChange"
            />

            <MainButton :description="$t('auth.get_started')" :onClick="register" />
            <button
              @click="googleSignUp"
              class="font-[Helvetica Neue] mb-[3.5rem] flex w-full items-center justify-center rounded-[0.4rem] border-[1px] border-solid border-[#CED4DA] py-[0.7rem] px-[1.3rem] text-[1.6rem] text-[#FFFFFF]"
            >
              <GoogleIcon class="mx-[0rem] mr-[0.83rem]" />
              {{ $t("auth.sign_up_with_Google") }}
            </button>
            <div
              class="font-[Helvetica Neue] text-center text-[1.6rem] text-[#6C757D]"
            >
              {{ $t("auth.already_have_an_account") }}
              <span
                @click="
                  router.push({ name: 'home', params: { modal: 'login' } })
                "
                class="font-[Helvetica Neue] cursor-pointer text-[1.6rem] text-[#0D6EFD] underline"
                >{{ $t("auth.log_in") }}</span
              >
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
import GoogleIcon from "@/components/icons/component/GoogleIcon.vue";
import { Form, Field } from "vee-validate";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "@/config/axios.js";

const router = useRouter();
const auth = useAuthStore();

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const formIsValid = ref(false);
const usernameTaken = ref(false);
const emailTaken = ref(false);

const onUsernameClear = () => (username.value = "");
const onEmailClear = () => (email.value = "");
const onPasswordClear = () => (password.value = "");
const onConfirmPasswordClear = () => (confirmPassword.value = "");
const onUsernameChange = (val) => {
  username.value = val;
  usernameTaken.value = false;
};
const onEmailChange = (val) => {
  email.value = val;
  emailTaken.value = false;
};

const onPasswordChange = (val) => (password.value = val);
const onConfirmPasswordChange = (val) => (confirmPassword.value = val);
const setFormIsValid = (meta) => (formIsValid.value = meta.valid);

const register = async () => {
  if (formIsValid.value && confirmPassword.value === password.value) {
    try {
      await axios.post("http://127.0.0.1:8000/api/register", {
        username: username.value,
        email: email.value,
        password: password.value,
        password_confirmation: confirmPassword.value,
      });
      router.push({
        name: "home",
        params: { modal: "check-email" },
      });
    } catch (err) {
      if (err.response.data.errors.username !== undefined) {
        usernameTaken.value = true;
      }
      if (err.response.data.errors.email !== undefined) {
        emailTaken.value = true;
      }
    }
  }
};
const googleSignUp = () => {
  auth.googleSignUp();
};
</script>
