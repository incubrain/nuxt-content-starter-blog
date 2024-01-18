<template>
  <div
    class="flex gap-4 my-12 p-4 lg:p-8 rounded-md justify-between items-center border border-color bg-primary-50 dark:bg-primary-950"
  >
    <div>
      <h2
        class="font-bold mt-0"
        :style="{ marginTop: '0px' }"
      >
        {{ title }}
      </h2>
      <p class="mt-0"> {{ body }}</p>
      <UButton
        variant="solid"
        color="white"
        :to="cta.link"
        target="_blank"
      >
        {{ cta.title }}
      </UButton>
    </div>
    <div class="hidden md:flex md:justify-center items-start md:items-center flex-shrink-0 max-w-[140px]">
      <NuxtImg
        :src="`images/${imageUrl}`"
        alt="Incubrain inline blog CTA"
        class="dark:invert"
        sizes="10vw md:140px"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface CTA {
  title: string
  link: string
}

defineProps({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  cta: {
    type: Object as PropType<CTA>,
    required: true
  },
  imageUrl: {
    type: String,
    required: false,
    default: 'incubrain-logo.svg'
  }
})
</script>

<style scoped></style>
