import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";

configure({
  generateMessage: localize({
    ka: {
      messages: {
        required: "ველი სავალდებულოა",
        email: "თქვენს მიერ შეყვანილი ელ-ფოსტა არასწორია",
        min: "{field} უნდა შედგებოდეს მინიმუმ 0:{min} სიმბოლოსგან",
        max: "{field} უნდა შედგებოდეს მაქსიმუმ 0:{max} სიმბოლოსგან",
        confirmed: "{field} განსხვავებულია",
      },
    },
  }),
});
