<template>
  <Teleport to="#app">
    <div
      @click="router.push({ name: 'home' })"
      class="bg-modal fixed top-[0rem] left-[0rem] flex h-[100vh] w-[100vw] items-center justify-center"
    >
      <div @click.stop class="w-[60rem] rounded-[1rem] bg-[#222030]">
        <MainHeader
          title="Forgot password?"
          description="Enter the email and we’ll send an email with instructions to reset your password"
        />

        <div class="mb-[5.3rem] flex">
          <Form
            class="min-w-[36rem]"
            @submit="forgotPassword"
            v-slot="{ meta }"
          >
            <div class="hidden">
              {{ setFormIsValid(meta) }}
            </div>
            <MainField
              title="Email"
              type="email"
              placeholder="Enter your email"
              rules="required|email"
              :onClearField="onEmailClear"
              @onFieldChange="onEmailChange"
            />

            <MainButton description="Send instructions" :onClick="() => ''" />

            <div class="flex items-center">
              <BackArrowIcon
                @click="
                  router.push({ name: 'home', params: { modal: 'login' } })
                "
                class="mr-[0rem] cursor-pointer"
              />
              <span
                @click="
                  router.push({ name: 'home', params: { modal: 'login' } })
                "
                class="font-[Helvetica Neue] ml-[1.1rem] cursor-pointer text-[1.6rem] text-[#6C757D]"
                >Back to log in
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
import BackArrowIcon from "@/components/icons/component/BackArrowIcon.vue";
import { Form } from "vee-validate";
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "@/config/axios.js";

const router = useRouter();

const email = ref("");
const formIsValid = ref(false);

const onEmailClear = () => (email.value = "");
const onEmailChange = (val) => (email.value = val);
const setFormIsValid = (meta) => (formIsValid.value = meta.valid);

const forgotPassword = async () => {
  if (formIsValid.value) {
    localStorage.setItem("email", email.value);
    await axios.post("http://127.0.0.1:8000/api/forgot-password", {
      email: email.value,
    });
    router.push({
      name: "home",
      params: { modal: "check-password" },
    });
  }
};
</script>
