<template>
  <div>
    <TheHeader />
    <div class="flex mt-[3.2rem]">
      <div class="ml-[6.95rem]">
        <BaseNavigation />
      </div>

      <BaseProfile>
        <Form @submit.prevent="">
          <div class="flex items-center gap-[3.2rem]">
            <div class="my-[1.6rem]">
              <label
                class="block font-[Helvetica Neue] mb-[0.8rem] text-[1.6rem] text-[#FFFFFF]"
                for="Username"
                >Username</label
              >
              <div
                class="pb-[5.6rem] border-b-[1px] border-solid border-profileUnderline"
              >
                <Field
                  class="min-w-[52.8rem] py-[0.9rem] px-[1.7rem] bg-[#CED4DA] text-[1.6rem] border-[1px] border-solid border-[#CED4DA] rounded-[0.48rem]"
                  id="Username"
                  name="Username"
                  type="text"
                  rules="required|min:3|max:15"
                />
                <button
                  @click="false"
                  class="ml-[3.3rem] font-[Helvetica Neue] text-[2rem] text-[#CED4DA]"
                >
                  Edit
                </button>
              </div>

              <label
                class="block font-[Helvetica Neue] mt-[4.2rem] mb-[0.8rem] text-[1.6rem] text-[#FFFFFF]"
                for="Email"
                >Email</label
              >
              <div>
                <Field
                  class="min-w-[52.8rem] py-[0.9rem] px-[1.7rem] bg-[#CED4DA] text-[1.6rem] border-[1px] border-solid border-[#CED4DA] rounded-[0.48rem]"
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
            class="font-[Helvetica Neue] text-[2rem] text-[#CED4DA] mr-[2.6rem]"
          >
            Cancel
          </button>
          <button
            @click="false"
            class="font-[Helvetica Neue] bg-[#E31221] py-[0.9rem] px-[1.7rem] text-[2rem] text-[#FFFFFF] rounded-[0.48rem]"
          >
            Save Changes
          </button>
        </div>
      </BaseProfile>
    </div>
  </div>
</template>

<script setup>
import TheHeader from "@/components/TheHeader.vue";
import BaseNavigation from "@/components/BaseNavigation.vue";
import BaseProfile from "@/components/BaseProfile.vue";
import { Form, Field } from "vee-validate";
</script>
