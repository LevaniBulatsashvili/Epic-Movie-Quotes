<template>
  <div>
    <TheHeader />
    <div class="mt-[3.2rem] flex">
      <div class="ml-[6.95rem]">
        <BaseNavigation />
      </div>

      <BaseProfile>
        <Form @submit.prevent="">
          <div class="flex items-center gap-[3.2rem]">
            <div class="my-[1.6rem]">
              <label
                class="font-[Helvetica Neue] mb-[0.8rem] block text-[1.6rem] text-[#FFFFFF]"
                for="Username"
                >Username</label
              >
              <div
                class="border-profileUnderline border-b-[1px] border-solid pb-[5.6rem]"
              >
                <Field
                  class="min-w-[52.8rem] rounded-[0.48rem] border-[1px] border-solid border-[#CED4DA] bg-[#CED4DA] py-[0.9rem] px-[1.7rem] text-[1.6rem]"
                  id="Username"
                  name="Username"
                  type="text"
                  rules="required|min:3|max:15"
                />
                <button
                  @click="false"
                  class="font-[Helvetica Neue] ml-[3.3rem] text-[2rem] text-[#CED4DA]"
                >
                  Edit
                </button>
              </div>

              <label
                class="font-[Helvetica Neue] mt-[4.2rem] mb-[0.8rem] block text-[1.6rem] text-[#FFFFFF]"
                for="Email"
                >Email</label
              >
              <div>
                <Field
                  class="min-w-[52.8rem] rounded-[0.48rem] border-[1px] border-solid border-[#CED4DA] bg-[#CED4DA] py-[0.9rem] px-[1.7rem] text-[1.6rem]"
                  id="Email"
                  name="Email"
                  type="email"
                  rules="required|email"
                />
              </div>
            </div>
          </div>
        </Form>
        <div class="mt-[4rem] text-end">
          <button
            @click="false"
            class="font-[Helvetica Neue] mr-[2.6rem] text-[2rem] text-[#CED4DA]"
          >
            Cancel
          </button>
          <button
            @click="false"
            class="font-[Helvetica Neue] active:bg-[hover:bg-[#CC0E10]] rounded-[0.48rem] bg-[#E31221] py-[0.9rem] px-[1.7rem] text-[2rem] text-[#FFFFFF] hover:bg-[#CC0E10]"
          >
            Save Changes
          </button>
        </div>
      </BaseProfile>
    </div>
  </div>
</template>

<script setup>
import TheHeader from "@/components/shared/TheHeader.vue";
import BaseNavigation from "@/components/shared/BaseNavigation.vue";
import BaseProfile from "@/components/profile/BaseProfile.vue";
import { Form, Field } from "vee-validate";
</script>
