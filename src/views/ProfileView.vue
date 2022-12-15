<template>
  <div v-if="auth.isAuthenticated">
    <TheHeader />
    <div class="mt-[3.2rem] flex">
      <div class="mx-[0rem] ml-[6.95rem] md:hidden lg:ml-[3rem]">
        <BaseNavigation />
      </div>

      <div>
        <BaseProfile>
          <Form @submit.prevent="">
            <div class="flex items-center px-[20rem] md:px-[5rem]">
              <div class="my-[1.6rem]">
                <div
                  class="border-profileUnderline flex border-b-[1px] border-solid pb-[5.6rem]"
                >
                  <div>
                    <label
                      class="font-Halvetica_Neue mb-[0.8rem] block text-[1.6rem] text-[#FFFFFF]"
                      for="Username"
                    >
                      {{ $t("profile.username") }}
                    </label>
                    <Field
                      class="w-full rounded-[0.48rem] border-[1px] border-solid border-[#CED4DA] bg-[#CED4DA] px-[17rem] py-[0.9rem] px-[1.7rem] text-[1.6rem] lg:px-[0rem]"
                      id="Username"
                      name="Username"
                      type="text"
                      rules="required|min:3|max:15"
                    />
                  </div>
                  <button
                    @click="false"
                    class="font-Halvetica_Neue mt-[3rem] ml-[3.3rem] text-[2rem] text-[#CED4DA]"
                  >
                    {{ $t("profile.edit") }}
                  </button>
                </div>

                <label
                  class="font-Halvetica_Neue mt-[4.2rem] mb-[0.8rem] block text-[1.6rem] text-[#FFFFFF]"
                  for="Email"
                  >{{ $t("profile.email") }}</label
                >
                <div>
                  <Field
                    class="w-full rounded-[0.48rem] border-[1px] border-solid border-[#CED4DA] bg-[#CED4DA] py-[0.9rem] px-[1.7rem] text-[1.6rem]"
                    id="Email"
                    name="Email"
                    type="email"
                    rules="required|email"
                  />
                </div>
              </div>
            </div>
          </Form>
        </BaseProfile>
        <div class="mt-[4rem] text-end">
          <button
            @click="false"
            class="font-[Helvetica Neue] mr-[2.6rem] text-[2rem] text-[#CED4DA]"
          >
            {{ $t("profile.cancel") }}
          </button>
          <button
            @click="false"
            class="font-[Helvetica Neue] active:bg-[hover:bg-[#CC0E10]] rounded-[0.48rem] bg-[#E31221] py-[0.9rem] px-[1.7rem] text-[2rem] capitalize text-[#FFFFFF] hover:bg-[#CC0E10]"
          >
            {{ $t("profile.save_changes") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TheHeader from "@/components/shared/TheHeader.vue";
import BaseNavigation from "@/components/shared/BaseNavigation.vue";
import BaseProfile from "@/components/profile/BaseProfile.vue";
import { Form, Field } from "vee-validate";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
</script>
