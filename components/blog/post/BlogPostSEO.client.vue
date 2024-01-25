<template>
  <div v-if="formattedWarns?.content">
    <div class="space-y-8">
      <div class="flex flex-col gap-4">
        <h3 class="font-semibold text-xl">SEO Audit</h3>
        <div>
          <UMeter
            size="md"
            indicator
            label="SEO Score"
            :value="formattedWarns.stuff.seoScore"
          />
          <UMeter
            size="md"
            indicator
            label="Keyword Score"
            :value="formattedWarns.stuff.keywordSeoScore"
          />
        </div>
        <p>Links: {{ formattedWarns.stuff.totalLinks }}</p>
        <p>WordCount: {{ formattedWarns.stuff.wordCount }}</p>
      </div>
      <UAccordion
        default-closed
        multiple
        :items="formattedWarns.content"
        :ui="{
          wrapper: 'flex flex-col gap-4 w-full'
        }"
      >
        <template #default="{ item, open }">
          <UButton
            color="white"
            variant="link"
            :ui="{
              padding: 'p-0'
            }"
          >
            <template #leading>
              <div class="p-1 rounded-full border flex items-center justify-center">
                <UIcon
                  :name="item.content.icon"
                  class="w-5 h-5"
                  :class="item.content.iconColor"
                />
              </div>
            </template>

            <p> {{ item.content.messages.length }} {{ item.label }}</p>

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
                class="text-black dark:text-white text-sm"
              >
                {{ warn }}
              </li>
            </ul>
          </div>
        </template>
      </UAccordion>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PostFullT } from '~/types/posts'
const formattedWarns = ref({})

const p = defineProps({
  post: {
    type: Object as PropType<PostFullT>,
    required: true
  },
  postHtml: {
    type: String as PropType<string | null>,
    required: true
  }
})

// fetch

function stripAttributes(html: string): string {
  // Remove class, id, and style attributes
  console.log('html', html, p.post)
  return html.replace(/\s*(class|id|style)="[^"]*"/g, '')
}

const getSEOChecks = async () => {
  const cleanedHtml = stripAttributes(p.postHtml!)

  const { data: seoChecks, error } = await useFetch('/api/seo-checks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      post: p.post,
      postHtml: cleanedHtml
    })
  })

  if (error.value) {
    console.error(error.value)
  } else if (seoChecks.value) {
    console.log('seoChecks', seoChecks.value)
    const post = seoChecks.value.result
    formattedWarns.value = {
      stuff: post,
      content: [
        {
          label: 'Warnings',
          expanded: true,
          content: {
            icon: 'i-mdi-alert-outline',
            iconColor: 'text-red-500 dark:text-red-700',
            color: 'border-red-500 dark:border-red-700',
            messages: post.messages.warnings
          }
        },
        {
          label: 'Minor Warnings',
          expanded: true,
          content: {
            icon: 'i-mdi-alert-circle-outline',
            iconColor: 'text-yellow-500 dark:text-yellow-700',
            color: 'border-yellow-500 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-950',
            messages: post.messages.minorWarnings
          }
        },
        {
          label: 'Good Points',
          expanded: false,
          content: {
            icon: 'i-mdi-check-circle-outline',
            iconColor: 'text-emerald-500 dark:text-emerald-700',
            color: 'border-emerald-500 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950',
            messages: post.messages.goodPoints
          }
        }
      ]
    }
  }
}

watchEffect(() => {
  console.log('postHtml', p.postHtml)
  if (p.postHtml !== null) {
    console.log('Shouldnt run empty postHtml', p.postHtml)
    getSEOChecks()
  }
})
</script>

<style scoped></style>
