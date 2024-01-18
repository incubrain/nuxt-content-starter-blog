<template>
  <div
    v-if="author?.givenName"
    class="rounded-xl border border-color p-4 lg:p-8 foreground"
  >
    <div class="flex flex-row items-center gap-4 lg:gap-8">
      <NuxtImg
        class="rounded-full sm:max-w-[100px] h-full"
        src="images/authors/drew-macgibbon.jpg"
        :alt="`${author.givenName} ${author.surname} is an author on the ${info.website.name} Blog`"
        sizes="18vw sm:120px"
        fit="cover"
      />
      <div class="text-left space-y-1 w-full">
        <h4 class="font-semibold"> About {{ author.givenName }} {{ author.surname }} </h4>
        <p class="text-sm">
          {{ author.bio }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const info = useInfo()
const p = defineProps({
  authorId: {
    type: Number,
    required: true
  }
})

const author = useAuthors().selectedAuthor(p.authorId)
</script>

<style scoped></style>
