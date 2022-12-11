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
    en: {
      names: {
        name_en: "name",
        name_ka: "name",
        director_en: "director",
        director_ka: "director",
        description_en: "description",
        description_ka: "description",
        quote_en: "quote",
        quote_ka: "quote",
      },
    }
  }),
});
