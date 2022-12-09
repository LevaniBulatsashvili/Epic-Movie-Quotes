import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";
import { setLocale } from "@vee-validate/i18n";

configure({
  generateMessage: localize({
    ka: {
      messages: {
        required: "ველი სავალდებულოა",
        email: "თქვენ მიერ შეყვანილი მეილი არასწორია",
        min: "{field} უნდა შედგებოდეს მინიმუმ 0:{min} სიმბოლოსგან",
        integer: "ველი მხოლოდ ციფრებს უნდა შეიცავდეს",
      },
      names: {
        fName: "სახელი",
        lName: "გვარი",
        email: "მეილი",
      },
    },
  }),
});

setLocale("en");
