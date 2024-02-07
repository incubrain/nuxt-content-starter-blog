<template>
  <div v-if="warns?.content">
    <div class="space-y-8">
      <div class="flex flex-col items-start">
        <h3 class="font-semibold text-lg py-4">SEO Audit</h3>
        <div class="flex gap-2 items-start border-b border-color py-4">
          <UBadge
            variant="solid"
            color="white"
            size="sm"
          >
            <p>Internal Links: {{ warns.count.linksInternal }}</p>
          </UBadge>
          <UBadge
            variant="solid"
            color="white"
            size="sm"
          >
            <p>Outbound Links: {{ warns.count.linksOutbound }}</p>
          </UBadge>
          <UBadge
            variant="solid"
            color="white"
            size="sm"
          >
            <p>Words: {{ warns.count.words }}</p>
          </UBadge>
        </div>
        <div class="w-full space-y-4 border-b border-color py-4">
          <UMeter
            size="md"
            indicator
            label="Keyword Score"
            :value="keywordData.score!"
          >
            <template #indicator>
              <div class="text-sm text-right"> Keyword Score </div>
            </template>
            <template #label="{ value }">
              <p class="text-sm"> {{ value }}% </p>
            </template>
          </UMeter>
          <div
            v-if="keywordData"
            class="border border-color rounded-md"
          >
            <UTable
              :columns="columns"
              :rows="tableRows"
            >
              <template #keyword-data="{ row, columnKey }">
                <span
                  :class="{ 'text-primary-500': row.isPrimary }"
                  class="text-wrap"
                >
                  {{ row.keyword }}
                </span>
              </template>
            </UTable>
          </div>
        </div>
        <div class="w-full space-y-4 border-b border-color py-4">
          <UMeter
            size="md"
            indicator
            label="SEO Score"
            :value="warns.seoScore"
          />
          <UAccordion
            default-closed
            multiple
            :items="warns.content"
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
                class="border-l-4 border rounded-md"
                :class="item.content.color"
              >
                <ul v-if="item.content.messages.length > 0">
                  <li
                    v-for="(warn, i4) in item.content.messages"
                    :key="`warning-${i4}`"
                    class="text-black dark:text-white text-sm border-b border-color py-1 last:border-b-0"
                  >
                    <p class="px-4">
                      {{ warn }}
                    </p>
                  </li>
                </ul>
                <p
                  v-else
                  class="text-black dark:text-white text-sm px-4 py-1"
                >
                  No {{ item.label }}</p
                >
              </div>
            </template>
          </UAccordion>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PostFullT } from '~/types/posts'
const warns = ref({})
const keywordData = ref({})

const { params } = useRoute()
const title = computed(() => params.title)

const p = defineProps({
  post: {
    type: Object as PropType<PostFullT>,
    required: true
  },
  postHtml: {
    type: String as PropType<string | undefined>,
    default: ''
  }
})

const haveHtml = computed(() => !!p.postHtml && p.postHtml.length > 0)
// fetch

const { data: seoChecks, error } = await useAsyncData(
  `seo-check-${title.value}`,
  () =>
    $fetch('/api/seo-checks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        post: p.post,
        postHtml: p.postHtml!
      })
    }),
  {
    watch: [haveHtml],
    immediate: false
  }
)

if (error.value) console.error('SEO Error:', error.value)

function formatKeywordData(data: any) {
  const { keywords, seoScore, headings, count, links, messages } = data
  keywordData.value = keywords
  warns.value = {
    seoScore,
    headings,
    count,
    links,
    content: [
      {
        label: 'Warnings',
        expanded: true,
        content: {
          icon: 'i-mdi-alert-outline',
          iconColor: 'text-red-500 dark:text-red-700',
          color: 'border-red-500 dark:border-red-700',
          messages: messages.warnings
        }
      },
      {
        label: 'Minor Warnings',
        expanded: true,
        content: {
          icon: 'i-mdi-alert-circle-outline',
          iconColor: 'text-yellow-500 dark:text-yellow-700',
          color: 'border-yellow-500 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-950',
          messages: messages.minorWarnings
        }
      },
      {
        label: 'Good Points',
        expanded: false,
        content: {
          icon: 'i-mdi-check-circle-outline',
          iconColor: 'text-emerald-500 dark:text-emerald-700',
          color: 'border-emerald-500 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950',
          messages: messages.goodPoints
        }
      }
    ]
  }
}

const getDensityByArea = (keyword, area: string) => {
  const densityData = keyword.find((density) => density.area === area)
  return densityData ? densityData.density.toFixed(2) : '-'
}

// Prepare table rows
const tableRows = computed(() => {
  const rows = []

  // Add primary keyword
  rows.push({
    keyword: keywordData.value.primary.body.keyword,
    title: getDensityByArea(keywordData.value.primaryArray, 'title'),
    meta: getDensityByArea(keywordData.value.primaryArray, 'meta'),
    body: getDensityByArea(keywordData.value.primaryArray, 'body'),
    isPrimary: true
  })

  // Add secondary keywords
  const secondaryKeywordsGrouped = {}
  keywordData.value.secondaryArray.forEach((item) => {
    if (!secondaryKeywordsGrouped[item.keyword]) {
      secondaryKeywordsGrouped[item.keyword] = {
        title: '-',
        meta: '-',
        body: '-'
      }
    }
    secondaryKeywordsGrouped[item.keyword][item.area] = item.density.toFixed(2)
  })

  for (const [keyword, areas] of Object.entries(secondaryKeywordsGrouped)) {
    rows.push({
      keyword,
      title: areas.title,
      meta: areas.meta,
      body: areas.body,
      isPrimary: false
    })
  }

  return rows
})

watchEffect(() => {
  if (seoChecks.value && seoChecks.value.result) {
    formatKeywordData(seoChecks.value.result)
  }
})

// Helper function to get density by area

// Define columns for the table
const columns = [
  { key: 'keyword', label: 'Keyword' },
  { key: 'title', label: 'Title' },
  { key: 'meta', label: 'Meta' },
  { key: 'body', label: 'Body' }
]
</script>

<style scoped></style>
