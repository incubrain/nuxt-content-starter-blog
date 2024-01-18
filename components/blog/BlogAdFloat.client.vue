<template>
  <div
    v-if="adVisible"
    class="fixed bottom-0 right-0 z-20 lg:sticky lg:top-24 w-full p-4 border border-color lg:rounded-md bg-primary-500 dark:bg-primary-800 flex flex-col gap-4 justify-between"
  >
    <div
      class="absolute lg:hidden -top-3 right-2 cursor-pointer rounded-full p-3 background border border-color flex justify-center items-center"
    >
      <UIcon
        name="i-material-symbols-close-rounded"
        class="absolute"
        @click="hideAd = true"
      />
    </div>
    <div class="flex justify-start items-center gap-2 flex-shrink-0">
      <div class="p-1 background rounded-full">
        <NuxtImg
          :src="`images/authors/${info.website.author.avatar}`"
          :alt="`${info.website.author.name} is the author of ${info.website.name}`"
          width="60"
          height="60"
          class="rounded-full"
        />
      </div>
      <h3 class="text-2xl font-semibold"> Hi 👋, I'm Drew </h3>
    </div>
    <div class="flex flex-col justify-start items-start gap-4 w-full">
      <p class="text-base">
        I hope you like the blog template, currently I'm looking for contracting work so I can
        contribute more to the Nuxt ecosystem.
      </p>
      <p class="text-base font-semibold pb-2">Rates: $30 USD PH + GST </p>
      <UButton
        :to="personalLinkedin.url"
        color="white"
        variant="solid"
        class="font-semibold px-8"
        target="_blank"
      >
        Reach Out
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const { personalLinkedin } = useSocial()
const { info } = useInfo()

const { width } = useWindowSize()
const hideAd = ref(false)
const adVisible = computed(() => !hideAd.value || width.value > 1024)
</script>

<style scoped></style>
