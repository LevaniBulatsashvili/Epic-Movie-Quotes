import { defineRule } from "vee-validate";
import { required, email, min, max, integer, regex } from "@vee-validate/rules";

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("integer", integer);
defineRule("regex", regex);
