<template>
  <div class="my-[1.6rem]">
    <label
      class="font-[Helvetica Neue] mb-[0.8rem] block text-[1.6rem] text-[#FFFFFF]"
      :for="title"
      >{{ title
      }}<span
        v-if="keepAsterisk"
        class="absolute top-[0.2rem] ml-[0.4rem] text-[#DC3545]"
        >*</span
      ></label
    >
    <Field
      :name="title"
      :rules="rules"
      v-slot="{ field, meta }"
      @change="onFieldChange"
    >
      <input
        class="box-border w-full rounded-[0.4rem] border-[1px] border-solid border-[#CED4DA] bg-[#CED4DA] py-[0.7rem] pl-[1.3rem] pr-[3.8rem] text-[1.6rem] focus:outline-[#CED4DA]"
        :class="{
          'border-[#198754]': icon === 'success',
          'border-[#DC3545]': icon === 'invalid',
        }"
        v-bind="field"
        :type="type"
        :placeholder="placeholder"
        @blur="onFieldBlur(meta)"
        @input="onFieldInput"
      />
      <p>
        <ErrorMessage
          class="font-[Halvetica Neue] text-[1.4rem] text-[#DC3545]"
          :name="title"
        />
      </p>
      <p
        v-if="asyncValidationFailed"
        class="font-[Halvetica Neue] text-[1.4rem] text-[#DC3545]"
      >
        {{ asyncError }}
      </p>
      <MainIconButton
        v-if="icon === 'filled'"
        @click="onFilledIconClick(field)"
      >
        <FilledIcon />
      </MainIconButton>
      <MainIconButton v-if="icon === 'success'">
        <SuccessIcon />
      </MainIconButton>
      <MainIconButton v-if="icon === 'invalid'">
        <InvalidIcon />
      </MainIconButton>
    </Field>
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";
import MainIconButton from "@/components/form/MainIconButton.vue";
import FilledIcon from "@/components/icons/form/FilledIcon.vue";
import SuccessIcon from "@/components/icons/form/SuccessIcon.vue";
import InvalidIcon from "@/components/icons/form/InvalidIcon.vue";
import { ref } from "vue-demi";

const icon = ref("");
const onFilledIconClick = (field) => {
  field.value = "";
  props.onClearField();
  setTimeout(() => (icon.value = ""), 100);
};

const onFieldBlur = (meta) => {
  if (meta.valid && meta.touched) {
    setTimeout(() => (icon.value = "success"), 200);
  } else if (meta.touched) {
    setTimeout(() => (icon.value = "invalid"), 200);
  }
};
const onFieldInput = () => (icon.value = "filled");

const emit = defineEmits(["onFieldChange"]);
const onFieldChange = (e) => emit("onFieldChange", e.target.value);

const props = defineProps({
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
  onClearField: {
    type: Function,
    required: true,
  },
  asyncValidationFailed: {
    type: Boolean,
    required: false,
    default: false,
  },
  asyncError: {
    type: String,
    required: false,
    default: "",
  },
});
</script>
