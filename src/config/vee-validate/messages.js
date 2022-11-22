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
        date: "რიცხვში შეყვანილი ინფორმაცია არასწორია",
        redberry_email:
          "გთხოვთ დარეგისტრირდეთ Redberry - ს მეილით(youremail@redberry.ge)",
      },
      names: {
        fName: "სახელი",
        lName: "გვარი",
        email: "მეილი",
        date: "რიცხვი",
        amount: "რაოდენობა",
      },
    },
  }),
});

setLocale("en");
