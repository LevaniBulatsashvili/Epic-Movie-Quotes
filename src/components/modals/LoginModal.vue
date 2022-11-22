<template>
  <Teleport to="#app">
    <div
      v-if="false"
      class="fixed flex justify-center items-center top-[0rem] left-[0rem] w-[100vw] h-[100vh] bg-modal"
    >
      <div class="w-[60rem] bg-[#222030] rounded-[1rem]">
        <MainHeader
          title="Log in to your account"
          description="Welcome back! Please enter your details."
        />

        <div class="flex mb-[5.3rem]">
          <Form class="min-w-[36rem]" @submit.prevent="">
            <MainField
              title="Email"
              type="email"
              placeholder="Enter your email"
              rules="required|email"
            />
            <MainField
              title="Password"
              type="password"
              placeholder="Password"
              rules="required|min:8|max:15"
            />

            <div class="flex">
              <div class="flex gap-[0.8rem] ml-[0rem]">
                <input
                  class="w-[1.6rem] h-[2.4rem]"
                  name="remember_me"
                  id="remember_me"
                  type="checkbox"
                />
                <label
                  class="font-[Helvetica Neue] text-[1.6rem] text-[#FFFFFF]"
                  for="remember_me"
                  >Remember me</label
                >
              </div>
              <router-link
                class="underline mr-[0rem] text-[1.6rem] text-[#0D6EFD]"
                :to="'#'"
                >Forgot password</router-link
              >
            </div>

            <MainButton description="Sign in" :onClick="() => false" />
            <button
              @click="true"
              class="font-[Helvetica Neue] mb-[3.5rem] flex justify-center w-full py-[0.7rem] px-[1.3rem] rounded-[0.4rem] text-[1.6rem] text-[#FFFFFF] border-[1px] border-solid border-[#CED4DA]"
            >
              Sign in with Google
            </button>

            <div
              class="font-[Helvetica Neue] text-center text-[1.6rem] text-[#6C757D]"
            >
              Dont have an account?
              <router-link
                class="underline font-[Helvetica Neue] text-[1.6rem] text-[#0D6EFD]"
                :to="'#'"
                >Sign up
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
import { Form } from "vee-validate";
</script>
