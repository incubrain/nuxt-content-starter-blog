<template>
  <div
    v-if="author.name.full"
    class="rounded-xl border border-color p-4 lg:p-8 foreground"
  >
    <div class="flex flex-row items-center gap-4 lg:gap-8">
      <NuxtImg
        class="rounded-full sm:max-w-[100px] h-full"
        :src="`images/author/${author.avatar}`"
        :alt="`${author.name.full} is an author on the ${website.name} Blog`"
        sizes="18vw sm:120px"
        fit="cover"
      />
      <div class="text-left space-y-1 w-full">
        <h4 class="font-semibold"> About {{ author.name.full}} </h4>
        <p class="text-sm">
          {{ author.bio }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { website, author } = useInfo()
</script>

<style scoped></style>
