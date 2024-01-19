<template>
  <div
    v-if="author"
    class="flex items-start gap-2 rounded-md"
  >
    <NuxtImg
      class="border border-color rounded-full"
      :src="`images/author/${author.avatar}`"
      :alt="`${author.name.given} ${author.name.surname} is an author on the ${website.name} Blog`"
      width="44"
      height="44"
    />
    <div class="flex flex-col">
      <p class="font-semibold"> {{ author.name.given }} {{ author.name.surname }} </p>
      <div>
        <p class="text-xs"> Pub: {{ useDateFormat(publishedAt, 'DD MMM YYYY').value }} </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { website, author } = useInfo()

defineProps({
  publishedAt: {
    type: String,
    required: true
  }
})
</script>

<style scoped></style>
