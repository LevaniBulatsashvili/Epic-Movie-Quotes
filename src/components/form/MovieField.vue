<template>
  <div class="my-[2rem]">
    <Field
      :name="title"
      :type="type"
      :placeholder="placeholder"
      :rules="rules"
      :as="as"
      :value="baseValue"
      @change="onFieldChange"
      class="font-[Halvetica Neue] box-border w-full rounded-[0.4rem] border-[1px] border-solid border-[#6C757D] bg-[#11101A] py-[0.9rem] pl-[1.7rem] pr-[6rem] text-[2rem] text-[#FFFFFF] focus:outline-[#6C757D]"
    />
    <div
      class="font-[Halvetica Neue] absolute right-[1.5rem] top-[0.8rem] text-[2rem] text-[#6C757D]"
    >
      {{ lang }}
    </div>
    <p>
      <ErrorMessage
        class="font-[Halvetica Neue] text-[1.4rem] text-[#DC3545]"
        :name="title"
      />
    </p>
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";

const emit = defineEmits(["onFieldChange"]);
const onFieldChange = (e) => emit("onFieldChange", e.target.value);

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
  lang: {
    type: String,
    required: true,
  },
  as: {
    type: String,
    required: false,
  },
  baseValue: {
    type: String,
    required: false,
    default: "",
  },
});
</script>
