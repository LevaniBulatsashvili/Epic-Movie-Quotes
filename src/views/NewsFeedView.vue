<template>
  <div>
    <TheHeader />

    <div class="flex mt-[3.2rem]">
      <div class="ml-[6.95rem]">
        <BaseNavigation />
      </div>

      <div class="ml-[0rem]">
        <div class="flex]">
          <div
            class="flex flex-grow bg-[#24222F] mb-[2.2rem] opacity-[0.6] rounded-[1rem] items-center"
          >
            <WriteIcon class="ml-[1.75rem] mr-[1.65rem]" />
            <div
              class="font-[Helvetica Neue] my-[1.1rem] mx-[0px] text-[2rem] text-[#FFFFFF]"
            >
              Write new quote
            </div>
          </div>
          <div class="flex mb-[2.2rem] items-center">
            <SearchIcon class="ml-[2.4rem] mr-[1.6rem]" />
            <div
              class="font-[Helvetica Neue] mx-[0rem] text-[2rem] text-[#CED4DA]"
            >
              Search by
            </div>
          </div>
        </div>
        <NewsCard v-for="card in cards" :key="card" />
      </div>
    </div>
  </div>
</template>

<script setup>
import TheHeader from "@/components/TheHeader.vue";
import BaseNavigation from "@/components/BaseNavigation.vue";
import NewsCard from "@/components/NewsCard.vue";
import WriteIcon from "@/components/icons/newsFeed/WriteIcon.vue";
import SearchIcon from "@/components/icons/newsFeed/SearchIcon.vue";

const cards = [1, 2];
</script>
