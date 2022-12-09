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
        @click="router.push({ name: 'newsFeed' })"
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
import TheHeader from "@/components/shared/TheHeader.vue";
import HomeFooter from "@/components/home/HomeFooter.vue";
import HomeCard from "@/components/home/HomeCard.vue";
import RegisterModal from "@/components/modals/auth/RegisterModal.vue";
import LoginModal from "@/components/modals/auth/LoginModal.vue";
import VerifyEmailModal from "@/components/modals/auth/VerifyEmailModal.vue";
import CheckEmailModal from "@/components/modals/auth/CheckEmailModal.vue";
import AccountActivatedModal from "@/components/modals/auth/AccountActivatedModal.vue";
import ForgotPasswordModal from "@/components/modals/auth/ForgotPasswordModal.vue";
import CheckPasswordModal from "@/components/modals/auth/CheckPasswordModal.vue";
import NewPasswordModal from "@/components/modals/auth/NewPasswordModal.vue";
import PasswordChangedModal from "@/components/modals/auth/PasswordChangedModal.vue";
import { computed } from "vue-demi";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const modal = computed(() => useRoute().params.modal);
</script>
