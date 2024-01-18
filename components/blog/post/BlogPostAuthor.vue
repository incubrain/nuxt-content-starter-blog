<template>
  <div
    v-if="author"
    class="flex items-start gap-2 rounded-md"
  >
    <NuxtImg
      class="border border-color rounded-full"
      :src="`images/authors/${author.avatar}`"
      :alt="`${author.givenName} ${author.surname} is an author on the ${info.website.name} Blog`"
      width="44"
      height="44"
    />
    <div class="flex flex-col">
      <p class="font-semibold"> {{ author.givenName }} {{ author.surname }} </p>
      <div>
        <p class="text-xs"> Pub: {{ useDateFormat(publishedAt, 'DD MMM YYYY').value }} </p>
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
  },
  publishedAt: {
    type: String,
    required: true
  }
})

const author = useAuthors().selectedAuthor(p.authorId)
</script>

<style scoped></style>
