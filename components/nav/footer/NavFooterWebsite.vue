<template>
  <footer class="foreground flex flex-col justify-center items-center relative overflow-hidden">
    <div
      class="relative wrapper padded-x py-4 lg:py-8 flex justify-between rounded-md w-full items-center"
    >
      <div
        class="grid grid-cols-3 grid-rows-1 rounded-md w-full h-auto gap-4 lg:gap-8 p-4 lg:px-8 mx-auto border border-color background"
      >
        <div
          class="flex flex-shrink-0 row-start-1 col-start-2 lg:col-start-1 justify-center lg:justify-start items-center md:pr-4 h-full"
        >
          <NuxtLink
            to="/"
            class="flex justify-center flex-col lg:flex-row items-center gap-2 font-semibold h-[100px]"
          >
            <NuxtImg
              :src="website.logo"
              :alt="`${website.name} Logo`"
              width="48"
              height="54"
              class="dark:invert"
            />
            {{ website.name.toLocaleUpperCase() }}
          </NuxtLink>
        </div>
        <ul
          class="flex flex-col row-start-1 col-start-1 lg:col-start-2 lg:flex-row gap-2 items-start lg:items-center lg:justify-center"
        >
          <li
            v-for="link in pages"
            :key="link.title"
            class="lg:border-r border-color last:border-none last:pr-0 pb-2 md:pr-2 md:pb-0"
          >
            <NuxtLink
              :to="link.link"
              class="flex items-center"
            >
              {{ link.title }}
            </NuxtLink>
          </li>
        </ul>
        <div
          class="flex flex-col items-end lg:justify-end lg:items-center row-start-1 col-start-3 lg:flex-row gap-3"
        >
          <NuxtLink
            v-for="social in socials"
            :key="social.title"
            :to="social.link"
            target="_blank"
            class="flex items-center"
          >
            <UIcon
              :name="social.icon"
              class="flex-shrink-0 h-7 w-7 dark:text-white"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
    <NavFooterBottomBar class="w-full" />
  </footer>
</template>

<script setup lang="ts">
const { website } = useInfo()
const { pages, socials } = usePages()
</script>
