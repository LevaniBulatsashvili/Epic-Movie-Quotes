<template>
  <div>
    <TheHeader />

    <div class="mt-[32rem] mb-[21.2rem] text-center">
      <div
        class="font-[Montserrat] font-bold text-[#DDCCAA] text-[6rem] text-center"
      >
        Find any quote in<br />
        millions of movie lines
      </div>
      <button
        class="font-[Halvetica Neue] mt-[3rem] bg-[#E31221] py-[0.9rem] px-[1.7rem] text-[#FFFFFF] text-[2rem] rounded-[0.48rem] border-[1px] border-solid border-[#E31221]"
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
    <RegisterModal />
    <LoginModal />
    <VerifyEmailModal />
    <AccountActivatedModal />
    <ForgotPasswordModal />
    <CheckEmailModal />
    <NewPasswordModal />
    <PasswordChangedModal />
  </div>
</template>

<script setup>
import TheHeader from "@/components/TheHeader.vue";
import HomeFooter from "@/components/HomeFooter.vue";
import HomeCard from "@/components/HomeCard.vue";
import RegisterModal from "@/components/modals/RegisterModal.vue";
import LoginModal from "@/components/modals/LoginModal.vue";
import VerifyEmailModal from "../components/modals/VerifyEmailModal.vue";
import AccountActivatedModal from "@/components/modals/AccountActivatedModal.vue";
import ForgotPasswordModal from "@/components/modals/ForgotPasswordModal.vue";
import CheckEmailModal from "@/components/modals/CheckEmailModal.vue";
import NewPasswordModal from "@/components/modals/NewPasswordModal.vue";
import PasswordChangedModal from "@/components/modals/PasswordChangedModal.vue";
</script>
