<template>
  <div
    v-if="adVisible"
    class="fixed bottom-0 right-0 z-20 lg:sticky lg:top-24 w-full p-4 border border-primary-600 dark:border-primary-800 lg:rounded-md bg-primary-50 dark:bg-primary-950 flex flex-col gap-4 justify-between"
  >
    <div
      class="absolute lg:hidden -top-3 right-2 cursor-pointer rounded-full p-3 background border border-color flex justify-center items-center"
    >
      <UIcon
        name="i-mdi-close"
        class="absolute"
        @click="hideAd = true"
      />
    </div>
    <div class="flex justify-start items-center gap-2 flex-shrink-0">
      <div class="p-1 background rounded-full">
        <NuxtImg
          :src="`images/author/${author.avatar}`"
          :alt="`${author.name.full} is the author of ${website.name}`"
          width="60"
          height="60"
          class="rounded-full"
        />
      </div>
      <h3 class="text-2xl font-semibold"> Hi 👋, I'm {{ author.name.given }} </h3>
    </div>
    <div class="flex flex-col justify-start items-start gap-4 w-full">
      <p class="text-base">
        I hope you like the blog template, if you have any suggestions please reach out.
      </p>
      <p class="text-base">
        I'm looking for full-time contracting work using Nuxt 3. I'm a full-stack Nuxt developer
        with ~5 years experience. My strengths are product development and business strategy, ok at
        minimal design.
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
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const { personalLinkedin } = useSocial()
const { website, author } = useInfo()

const { width } = useWindowSize()
const hideAd = ref(false)
const adVisible = computed(() => !hideAd.value || width.value > 1024)
</script>

<style scoped></style>
