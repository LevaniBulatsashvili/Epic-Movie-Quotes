<template>
  <div class="ml-[18.7rem] box-border rounded-[1.2rem]">
    <div
      class="font-[Helvetica Neue] mb-[12.6rem] ml-[3rem] text-[2.4rem] font-medium text-[#FFFFFF]"
    >
      My profile
    </div>

    <div class="min-w-[100rem] bg-[#11101A] pt-[12.5rem] pb-[7.7rem]">
      <div>
        <img
          class="absolute bottom-[4rem] left-[40.5rem]"
          src="@/assets/png/mainProfile.png"
        />
        <p class="font-[Helvetica Neue] text-center text-[2rem] text-[#FFFFFF]">
          Upload new photo
        </p>
      </div>

      <div class="mt-[4.2rem] mb-[5.3rem]">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
