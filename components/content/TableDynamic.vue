<template>
  <div class="mb-12 mt-6">
    <table class="w-full overflow-hidden border-collapse">
      <thead>
        <tr class="foreground">
          <th
            v-for="heading in headings"
            :key="heading"
            class="border border-color p-2 text-left font-semibold"
          >
            {{ heading }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in modifiedRows"
          :key="rowIndex"
          class="text-sm odd:background even:foreground hover:bg-primary-50 dark:hover:bg-zinc-900"
        >
          <td
            v-for="(value, key) in row"
            :key="key"
            class="border border-color p-2"
          >
            <div v-html="value" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
type TableRow = Record<string, any>

const p = defineProps({
  addLink: {
    type: String,
    required: false,
    default: null
  },
  headings: {
    type: Array as PropType<string[]>,
    required: true
  },
  rows: {
    type: Array as PropType<TableRow[]>,
    required: true
  }
})

const modifiedRows = ref(
  p.rows.map((row) => {
    const { link, ...newRowWithoutLink } = row
    // If there's a link, add the anchor tag to the specified property
    if (link) {
      newRowWithoutLink[p.addLink] = `<a href="${link}" target="_blank" class="link">${
        row[p.addLink]
      }</a>`
    }

    return newRowWithoutLink
  })
)
</script>
