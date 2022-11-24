<template>
  <Teleport to="#app">
    <div
      v-if="false"
      class="fixed flex justify-center items-center top-[0rem] left-[0rem] w-[100vw] h-[100vh] bg-modal"
    >
      <div class="w-[60rem] bg-[#222030] rounded-[1rem]">
        <MainHeader
          title="Create an account"
          description="Start your journey!"
        />

        <div class="flex mb-[5.3rem]">
          <Form class="min-w-[36rem]" @submit.prevent="">
            <MainField
              title="Name"
              type="text"
              placeholder="At least 3 & max.15 lower case characters"
              rules="required|min:3|max:15"
              :keepAsterisk="true"
            />
            <MainField
              title="Email"
              type="email"
              placeholder="Enter your email"
              rules="required|email"
              :keepAsterisk="true"
            />
            <MainField
              title="Password"
              type="password"
              placeholder="At least 8 & max.15 lower case characters"
              rules="required|min:8|max:15"
              :keepAsterisk="true"
            />
            <MainField
              title="Confirm password"
              type="password"
              placeholder="Confirm password"
              rules="required|min:8|max:15"
              :keepAsterisk="true"
            />

            <MainButton description="Get started" :onClick="() => false" />
            <button
              @click="true"
              class="font-[Helvetica Neue] mb-[3.5rem] flex justify-center w-full py-[0.7rem] px-[1.3rem] rounded-[0.4rem] text-[1.6rem] text-[#FFFFFF] border-[1px] border-solid border-[#CED4DA]"
            >
              Sign up with Google
            </button>
            <div
              class="font-[Helvetica Neue] text-center text-[1.6rem] text-[#6C757D]"
            >
              Already have an account?
              <router-link
                class="underline font-[Helvetica Neue] text-[1.6rem] text-[#0D6EFD]"
                :to="'#'"
                >Log in</router-link
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
import { Form } from "vee-validate";
import GoogleIcon from "@/components/icons/GoogleIcon.vue";
</script>
