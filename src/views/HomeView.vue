<template>
  <div>
    <TheHeader />

    <div class="mt-[32rem] mb-[21.2rem] text-center">
      <div
        class="text-center font-[Montserrat] text-[6rem] font-bold text-[#DDCCAA]"
      >
        Find any quote in<br />
        millions of movie lines
      </div>
      <button
        class="font-[Halvetica Neue] mt-[3rem] rounded-[0.48rem] border-[1px] border-solid border-[#E31221] bg-[#E31221] py-[0.9rem] px-[1.7rem] text-[2rem] text-[#FFFFFF] hover:bg-[#CC0E10]"
      >
        Get started
      </button>
    </div>

    <HomeCard
      backgroundImage="bg-intersteller"
      quote="You have to leave somethig behind to go forward"
      movie="Interstellar, 2014"
    />

    <HomeCard
      backgroundImage="bg-tenenbaums"
      quote="I think we’re just gonna have to be secretly in love with earch other and leave it that"
      movie="The Royal Tenenbaums,2001"
    />

    <HomeCard
      backgroundImage="bg-lotr"
      quote="I think we’re just gonna have to be secretly in love with earch other and leave it that"
      movie="The Royal Tenenbaums,2001"
    />

    <HomeFooter />
    <RegisterModal v-if="modal === 'register'" />
    <LoginModal v-if="modal === 'login'" />
    <VerifyEmailModal v-if="modal === 'verify-email'" />
    <CheckEmailModal v-if="modal === 'check-email'" />
    <AccountActivatedModal v-if="modal === 'account-activated'" />
    <ForgotPasswordModal v-if="modal === 'forgot-password'" />
    <CheckPasswordModal v-if="modal === 'check-password'" />
    <NewPasswordModal v-if="modal === 'new-password'" />
    <PasswordChangedModal v-if="modal === 'password-changed'" />
  </div>
</template>

<script setup>
import TheHeader from "@/components/TheHeader.vue";
import HomeFooter from "@/components/HomeFooter.vue";
import HomeCard from "@/components/HomeCard.vue";
import RegisterModal from "@/components/modals/RegisterModal.vue";
import LoginModal from "@/components/modals/LoginModal.vue";
import VerifyEmailModal from "@/components/modals/VerifyEmailModal.vue";
import CheckEmailModal from "@/components/modals/CheckEmailModal.vue";
import AccountActivatedModal from "@/components/modals/AccountActivatedModal.vue";
import ForgotPasswordModal from "@/components/modals/ForgotPasswordModal.vue";
import CheckPasswordModal from "@/components/modals/CheckPasswordModal.vue";
import NewPasswordModal from "@/components/modals/NewPasswordModal.vue";
import PasswordChangedModal from "@/components/modals/PasswordChangedModal.vue";
import { computed } from "vue-demi";
import { useRoute } from "vue-router";

const modal = computed(() => useRoute().params.modal);
</script>
