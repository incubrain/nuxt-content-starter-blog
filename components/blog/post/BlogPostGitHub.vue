<template>
  <div v-if="githubData">
    <div
      v-if="isUserProfile"
      class="p-4 rounded-md shadow-md foreground"
    >
      <div class="flex gap-4 items-center">
        <NuxtImg
          :src="githubData.avatar_url"
          alt="GitHub Avatar"
          class="rounded-full"
          width="96"
          height="96"
        />
        <div class="space-y-2 flex flex-col">
          <span class="text-xl font-semibold m-0">{{ githubData.name }}</span>
          <span class="text-gray-600">{{ githubData.bio }}</span>
        </div>
      </div>
    </div>
    <div
      v-else
      class="foreground flex flex-col p-4 gap-2 shadow-md rounded-md"
    >
      <span class="text-xl font-semibold">{{ githubData.name }}</span>
      <span class="text-gray-600">{{ githubData.description }}</span>
    </div>
    <BlogPostCaption> This requires styling </BlogPostCaption>
  </div>
  <div
    v-else
    class="text-center text-gray-600"
    >Loading GitHub data...</div
  >
</template>

<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    required: true
  }
})

const isUserProfile = computed(() => {
  const regexUser = /github\.com\/([^\/]+)$/
  return regexUser.test(props.src)
})

const apiPath = computed(() => {
  // just get the last part of the src
  if (isUserProfile.value) {
    return props.src.split('/').pop()
  } else if (props.src) {
    return props.src.split('/').slice(-2).join('/')
  }
})

// this can be simplified
const determineApiEndpoint = (url: string) => {
  let apiEndpoint = ''
  console.log('url', url, apiPath.value)
  if (isUserProfile.value) {
    apiEndpoint = `https://api.github.com/users/${apiPath.value}`
  } else if (props.src) {
    apiEndpoint = `https://api.github.com/repos/${apiPath.value}`
  }

  return apiEndpoint
}

const { data: githubData, error } = useFetch(determineApiEndpoint(props.src))

console.log('githubData', githubData, error)
</script>

<style scoped>
/* Add your styles here */
</style>
