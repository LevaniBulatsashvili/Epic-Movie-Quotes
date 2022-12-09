<template>
  <Teleport to="#app">
    <div
      @click="router.push({ name: 'home' })"
      class="bg-modal fixed top-[0rem] left-[0rem] flex h-[100vh] w-[100vw] items-center justify-center"
    >
      <div @click.stop class="w-[60rem] rounded-[1rem] bg-[#222030]">
        <MainHeader
          title="Create an account"
          description="Start your journey!"
        />

        <div class="mb-[5.3rem] flex">
          <Form class="min-w-[36rem]" @submit="() => ''" v-slot="{ meta }">
            <div class="hidden">
              {{ setFormIsValid(meta) }}
            </div>

            <MainField
              title="Name"
              type="text"
              placeholder="At least 3 & max.15 lower case characters"
              rules="required|min:3|max:15"
              :keepAsterisk="true"
              :onClearField="onUsernameClear"
              @onFieldChange="onUsernameChange"
            />
            <MainField
              title="Email"
              type="email"
              placeholder="Enter your email"
              rules="required|email"
              :keepAsterisk="true"
              :onClearField="onEmailClear"
              @onFieldChange="onEmailChange"
            />
            <MainField
              title="Password"
              type="password"
              placeholder="At least 8 & max.15 lower case characters"
              rules="required|min:8|max:15"
              :keepAsterisk="true"
              :onClearField="onPasswordClear"
              @onFieldChange="onPasswordChange"
            />
            <MainField
              title="Confirm password"
              type="password"
              placeholder="Confirm password"
              rules="required|min:8|max:15|confirmed:@Password"
              :keepAsterisk="true"
              :onClearField="onConfirmPasswordClear"
              @onFieldChange="onConfirmPasswordChange"
            />

            <MainButton description="Get started" :onClick="register" />
            <button
              @click="googleSignUp"
              class="font-[Helvetica Neue] mb-[3.5rem] flex w-full items-center justify-center rounded-[0.4rem] border-[1px] border-solid border-[#CED4DA] py-[0.7rem] px-[1.3rem] text-[1.6rem] text-[#FFFFFF]"
            >
              <GoogleIcon class="mx-[0rem] mr-[0.83rem]" />
              Sign up with Google
            </button>
            <div
              class="font-[Helvetica Neue] text-center text-[1.6rem] text-[#6C757D]"
            >
              Already have an account?
              <span
                @click="
                  router.push({ name: 'home', params: { modal: 'login' } })
                "
                class="font-[Helvetica Neue] cursor-pointer text-[1.6rem] text-[#0D6EFD] underline"
                >Log in</span
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
import { Form } from "vee-validate";
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

const onUsernameClear = () => (username.value = "");
const onEmailClear = () => (email.value = "");
const onPasswordClear = () => (password.value = "");
const onConfirmPasswordClear = () => (confirmPassword.value = "");
const onUsernameChange = (val) => (username.value = val);
const onEmailChange = (val) => (email.value = val);
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
      if (err.response.data.errors.email !== undefined) {
        console.log("username is taken");
      }
      if (err.response.data.errors.email !== undefined) {
        console.log("email is taken");
      }
    }
  }
};
const googleSignUp = () => {
  auth.googleSignUp();
};
</script>
