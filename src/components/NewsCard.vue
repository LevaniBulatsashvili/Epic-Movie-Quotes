<template>
  <div
    class="bg-[#11101A] pt-[2.4rem] px-[2.4rem] pb-[4.1rem] mb-[4rem] rounded-[1.2rem]"
  >
    <div
      class="pb-[2.5rem] border-b-[1px] border-solid border-NewsCardUnderline"
    >
      <div class="flex items-center">
        <img class="mx-[0px]" src="@/assets/png/profile.png" />
        <div
          class="font-[Helvetica Neue] ml-[1.6rem] text-[2rem] text-[#FFFFFF]"
        >
          Maia Nakashidze
        </div>
      </div>

      <div
        class="font-[Helvetica Neue] mt-[1.6rem] mb-[2.8rem] text-[2rem] text-[#FFFFFF]"
      >
        “Follow your dream.”movie- Billy Elliot. (2000)
      </div>

      <img src="@/assets/png/mainProfile.png" />

      <div class="flex mt-[2.45rem]">
        <div class="flex mx-[0rem]">
          <div class="mx-[0rem] text-[2rem] text-[#FFFFFF]">3</div>
          <CommentIcon class="ml-[1.2rem] mr-[2.4rem]" />
        </div>

        <div class="flex mx-[0rem]">
          <div class="mx-[0rem] text-[2rem] text-[#FFFFFF]">10</div>
          <LikeIcon class="ml-[1.2rem]" />
        </div>
      </div>
    </div>

    <div
      v-for="comment in comments"
      :key="comment"
      class="mt-[2.4rem] max-w-[93rem]"
    >
      <div class="flex items-center">
        <img class="mx-[0px]" src="@/assets/png/profile.png" />
        <div
          class="font-[Helvetica Neue] ml-[2.4rem] text-[2rem] text-[#FFFFFF]"
        >
          Maia Nakashidze
        </div>
      </div>
      <div
        class="font-[Helvetica Neue] pb-[2.4rem] ml-[8.4rem] text-[2rem] text-[#FFFFFF] border-b-[1px] border-solid border-NewsCardUnderline"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        nunc vel massa facilisis consequat elit morbi convallis convallis.
        Volutpat vitae et nisl et. Adipiscing enim integer mi leo nisl. Arcu
        vitae mauris odio eget.
      </div>
    </div>

    <div class="mt-[2.4rem]">
      <div class="flex items-center">
        <img class="mx-[0px] mr-[2.4rem]" src="@/assets/png/profile.png" />
        <input
          class="font-[Helvetica Neue] w-full py-[1.1rem] px-[2.7rem] bg-[#24222F] text-[2rem] text-[#CED4DA] opacity-[0.6] rounded-[1rem]"
          type="text"
          placeholder="Write a comment"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import CommentIcon from "@/components/icons/newsFeed/CommentIcon.vue";
import LikeIcon from "@/components/icons/newsFeed/LikeIcon.vue";
const comments = [1, 2];
</script>
