<template>
  <div class="my-[1.6rem]">
    <label
      class="block font-[Helvetica Neue] mb-[0.8rem] text-[1.6rem] text-[#FFFFFF]"
      :for="title"
      >{{ title
      }}<span
        v-if="keepAsterisk"
        class="absolute text-[#DC3545] top-[0.2rem] ml-[0.4rem]"
        >*</span
      ></label
    >
    <Field
      class="box-border w-full py-[0.7rem] px-[1.3rem] bg-[#CED4DA] text-[1.6rem] border-[1px] border-solid border-[#CED4DA] rounded-[0.4rem]"
      :id="title"
      :name="title"
      :type="type"
      :placeholder="placeholder"
      :rules="rules"
    />
  </div>
</template>

<script setup>
import { Field } from "vee-validate";

defineProps({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
  },
  rules: {
    type: String,
    required: true,
  },
  keepAsterisk: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
