<template>
  <div class="fixed bottom-4 right-4 z-50">
    <UChip
      :text="tabItems.length || 0"
      color="orange"
      size="2xl"
    >
      <UButton
        @click="isOpen = true"
        icon="i-mdi-magnify"
        class="rounded-full"
      />
    </UChip>

    <USlideover
      v-model="isOpen"
      :ui="{
        width: 'w-screen max-w-[1200px]'
      }"
    >
      <div class="p-4 space-y-8 overflow-scroll">
        <div class="flex gap-4">
          <h2>SEO Errors</h2>
          <UButton @click="getSeoChecks()"> Check SEO </UButton>
        </div>
        <UTabs
          v-if="tabItems.length > 0"
          :items="tabItems"
          orientation="vertical"
          :ui="{ wrapper: 'flex w-full gap-4 space-y-0', list: { width: 'w-[240px]' } }"
        >
          <template #default="{ item }">
            <p class="text-no-wrap"> {{ item.label.slice(0, 16) }}...</p>
          </template>
          <template #item="{ item }">
            <UCard
              :ui="{
                base: 'w-full'
              }"
            >
              <template #header>
                <div class="rounded-lg overflow-hidden">
                  <h3 class="text-no-wrap"> {{ item.label }}</h3>
                </div>
              </template>
              <UAccordion
                default-closed
                multiple
                :items="item.content"
                :ui="{
                  wrapper: 'flex flex-col gap-4 w-full'
                }"
              >
                <template #default="{ item, open }">
                  <UButton
                    color="white"
                    variant="solid"
                  >
                    <template #leading>
                      <div class="w-6 h-6 rounded-full flex items-center justify-center -my-1">
                        <UIcon
                          :name="item.content.icon"
                          class="w-4 h-4"
                          :class="item.content.color"
                        />
                      </div>
                    </template>

                    <p> {{ item.label }}</p>

                    <template #trailing>
                      <UIcon
                        name="i-heroicons-chevron-right-20-solid"
                        class="w-5 h-5 ms-auto transform transition-transform duration-200"
                        :class="[open && 'rotate-90']"
                      />
                    </template>
                  </UButton>
                </template>
                <template #item="{ item }">
                  <div
                    class="border-l-4 border p-4 rounded-md"
                    :class="item.content.color"
                  >
                    <ul>
                      <li
                        v-for="(warn, i4) in item.content.messages"
                        :key="`warning-${i4}`"
                        class="text-black dark:text-white"
                      >
                        <UIcon :name="item.content.icon" />
                        {{ warn }}
                      </li>
                    </ul>
                  </div>
                </template>
              </UAccordion>
            </UCard>
          </template>
        </UTabs>
      </div>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
const tabItems = ref([])

const getSeoChecks = async () => {
  const { data: seoChecks, error } = await useFetch('/api/seo-checks')

  if (error.value) {
    console.error(error.value)
  } else {
    console.log('seoChecks', seoChecks.value)
    const formattedWarns = seoChecks.value.body.map((post, index) => ({
      label: post.postTitle,
      content: [
        {
          label: 'Warnings',
          content: {
            icon: 'i-mdi-alert-outline',
            color: 'border-red-500 dark:border-red-700',
            messages: post.messages.warnings
          }
        },
        {
          label: 'Minor Warnings',
          content: {
            icon: 'i-mdi-alert-circle-outline',
            color: 'border-yellow-500 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-950',
            messages: post.messages.minorWarnings
          }
        },
        {
          label: 'Good Points',
          content: {
            icon: 'i-mdi-check-circle-outline',
            color: 'border-emerald-500 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950',
            messages: post.messages.goodPoints
          }
        }
      ]
    }))
    tabItems.value.push(...formattedWarns)
  }
}

const isOpen = ref(false)
</script>

<style scoped></style>
