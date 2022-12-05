<template>
  <div>
    <TheHeader />

    <div class="mt-[3.2rem] flex">
      <div class="ml-[6.95rem]">
        <BaseNavigation />
      </div>

      <div class="ml-[0rem]">
        <div class="flex]">
          <div
            class="mb-[2.2rem] flex flex-grow items-center rounded-[1rem] bg-[#24222F] opacity-[0.6]"
          >
            <WriteIcon class="ml-[1.75rem] mr-[1.65rem]" />
            <div
              class="font-[Helvetica Neue] my-[1.1rem] mx-[0px] text-[2rem] text-[#FFFFFF]"
            >
              Write new quote
            </div>
          </div>
          <div class="mb-[2.2rem] flex items-center">
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
