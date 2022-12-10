<template>
  <Teleport to="#app">
    <div
      @click="router.push({ name: 'home' })"
      class="bg-modal fixed top-[0rem] left-[0rem] flex h-[100vh] w-[100vw] items-center justify-center"
    >
      <div @click.stop class="w-[60rem] rounded-[1rem] bg-[#222030]">
        <MainHeader
          :title="$t('auth.log_in_to_your_account')"
          :description="$t('auth.welcome_back_please_enter_your_details')"
        />

        <div class="mb-[5.3rem] flex">
          <Form class="min-w-[36rem]" @submit="login" v-slot="{ meta }">
            <div class="hidden">
              {{ setFormIsValid(meta) }}
            </div>

            <MainField
              :title="$t('auth.email')"
              type="text"
              :placeholder="$t('auth.enter_your_email')"
              rules="required|min:3"
              :onClearField="onUsernameOrEmailClear"
              @onFieldChange="onUsernameOrEmailChange"
            />
            <MainField
              :title="$t('auth.password')"
              type="password"
              :placeholder="$t('auth.password')"
              rules="required|min:8|max:15"
              :onClearField="onPasswordClear"
              @onFieldChange="onPasswordChange"
            />

            <div class="flex">
              <div class="ml-[0rem] flex gap-[0.8rem]">
                <input
                  class="h-[2.4rem] w-[1.6rem]"
                  name="remember_me"
                  id="remember_me"
                  type="checkbox"
                  v-model="rememberMe"
                />
                <label
                  class="font-[Helvetica Neue] text-[1.6rem] text-[#FFFFFF]"
                  for="remember_me"
                  >{{ $t("auth.remember_me") }}</label
                >
              </div>
              <div
                class="mr-[0rem] cursor-pointer text-[1.6rem] text-[#0D6EFD] underline"
                @click="
                  router.push({
                    name: 'home',
                    params: { modal: 'forgot-password' },
                  })
                "
              >
                {{ $t("auth.forgot_password") }}
              </div>
            </div>

            <MainButton :description="$t('auth.sign_in')" />
            <button
              @click="googleSignUp"
              class="font-[Helvetica Neue] mb-[3.5rem] flex w-full items-center justify-center rounded-[0.4rem] border-[1px] border-solid border-[#CED4DA] py-[0.7rem] px-[1.3rem] text-[1.6rem] text-[#FFFFFF]"
            >
              <GoogleIcon class="mx-[0rem] mr-[0.83rem]" />
              {{ $t("auth.sign_in_with_google") }}
            </button>

            <div
              class="font-[Helvetica Neue] text-center text-[1.6rem] text-[#6C757D]"
            >
              {{ $t("auth.dont_have_an_account") }}
              <span
                class="font-[Helvetica Neue] cursor-pointer text-[1.6rem] text-[#0D6EFD] underline"
                @click="
                  router.push({ name: 'home', params: { modal: 'register' } })
                "
                >{{ $t("auth.sign_up") }}
              </span>
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

const username_email = ref("");
const password = ref("");
const rememberMe = ref(false);
const formIsValid = ref(false);

const onUsernameOrEmailClear = () => (username_email.value = "");
const onPasswordClear = () => (password.value = "");
const onUsernameOrEmailChange = (val) => (username_email.value = val);
const onPasswordChange = (val) => {
  password.value = val;
};
const setFormIsValid = (meta) => {
  formIsValid.value = meta.valid;
};

const auth = useAuthStore();

const login = async () => {
  if (formIsValid.value) {
    try {
      await axios.post("http://127.0.0.1:8000/api/login", {
        username_email: username_email.value,
        password: password.value,
        remember_me: rememberMe.value,
      });
      router.push({ name: "newsFeed" });
    } catch (err) {
      console.log(err.response.data);
    }
  }
};
const googleSignUp = () => {
  auth.googleSignUp();
};
</script>
