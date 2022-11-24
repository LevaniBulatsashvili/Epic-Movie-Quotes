<template>
  <Teleport to="#app">
    <div
      v-if="false"
      class="fixed flex justify-center items-center top-[0rem] left-[0rem] w-[100vw] h-[100vh] bg-modal"
    >
      <div class="w-[60rem] bg-[#222030] rounded-[1rem]">
        <MainHeader
          title="Forgot password?"
          description="Enter the email and we’ll send an email with instructions to reset your password"
        />

        <div class="flex mb-[5.3rem]">
          <Form class="min-w-[36rem]" @submit.prevent="">
            <MainField
              title="Email"
              type="email"
              placeholder="Enter your email"
              rules="required|email"
            />

            <MainButton
              description="Send instructions"
              :onClick="() => false"
            />

            <div class="text-center flex items-center">
              <BackArrowIcon class="mr-[0rem]" />
              <router-link
                class="font-[Helvetica Neue] ml-[1.1rem] text-[1.6rem] text-[#6C757D]"
                :to="'#'"
                >Back to log in
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
import BackArrowIcon from "@/components/icons/BackArrowIcon.vue";
import { Form } from "vee-validate";
</script>
