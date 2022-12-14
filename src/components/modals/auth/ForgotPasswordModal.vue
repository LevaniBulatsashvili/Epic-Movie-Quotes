<template>
  <Teleport to="#app">
    <div
      @click="router.push({ name: 'home' })"
      class="bg-modal fixed top-[0rem] left-[0rem] flex h-[100vh] w-[100vw] items-center justify-center md:left-[-2rem]"
    >
      <div
        @click.stop
        class="w-[60rem] rounded-[1rem] bg-[#222030] sm:w-[40rem] md:w-[47rem]"
      >
        <MainHeader
          class="px-[4rem]"
          :title="$t('auth.forgot_password')"
          :description="
            $t(
              'auth.enter_your_email_and_we_will_send_an_email_with_instructions_to_reset_your_password'
            )
          "
        />

        <div class="mb-[5.3rem] flex">
          <Form
            class="min-w-[36rem] sm:min-w-[25rem] md:min-w-[30rem]"
            @submit="forgotPassword"
            v-slot="{ meta }"
          >
            <div class="hidden">
              {{ setFormIsValid(meta) }}
            </div>
            <MainField
              :title="$t('auth.email')"
              type="email"
              :placeholder="$t('auth.enter_your_email')"
              rules="required|email"
              :onClearField="onEmailClear"
              @onFieldChange="onEmailChange"
            />

            <MainButton
              :description="$t('auth.send_instructions')"
              :onClick="() => ''"
            />

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
                >{{ $t("auth.back_to_log_in") }}
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
    await axios.post(
      import.meta.env.VITE_BACKEND_API_BASE_URL + "/forgot-password",
      {
        email: email.value,
      }
    );
    router.push({
      name: "home",
      params: { modal: "check-password" },
    });
  }
};
</script>
