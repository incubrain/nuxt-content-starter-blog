<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  inheritAttrs: false
})

defineProps({
  title: {
    type: String,
    required: false,
    default: 'No Title Provided'
  },
  description: {
    type: String,
    required: false,
    default: 'No description provided'
  },
  baseURL: {
    type: String,
    required: false,
    default: 'https://incubrain.com/'
  },
  imageSrc: {
    type: String,
    required: false,
    default: 'images/blog/incubrain-company-values.webp'
  }
})

const backgroundFlareAttrs = computed(() => {
  return {
    display: 'flex',
    position: 'absolute',
    right: '-50%',
    top: '0%',
    width: '200%',
    height: '200%',
    backgroundImage:
      'radial-gradient(circle, rgba(0,220,130, 0.2) 0%,  rgba(5, 5, 5, 0.5) 50%, rgba(5, 5, 5,0) 70%)'
  }
})
</script>

<template>
  <div
    class="w-full h-full absolute top-0 left-0"
    :style="{ backgroundColor: 'black' }"
  />
  <div :style="backgroundFlareAttrs" />
  <div class="flex flex-row w-full max-h-full">
    <div class="flex flex-col w-3/5 justify-center text-gray-200 p-8">
      <div class="flex flex-row justify-center items-center h-full">
        <div class="flex flex-col">
          <h1 style="font-size: 64px">
            {{ title || 'No Title' }}
          </h1>
          <p style="font-size: 26px"> {{ description.slice(0, 140) || 'No Description' }}... </p>
        </div>
      </div>
    </div>
    <!-- <div class="absolute text-white w-full flex flex-row gap-2 top-2 right-0">
      <img
        :src="baseURL + 'images/incubrain-logo.svg'"
        alt="Incubrain Logo"
        width="50"
        height="50"
        style="filter: invert(1)"
      />
      <p
        class="font-bold"
        style="font-size: 18px"
      >
        INCUBRAIN
      </p>
    </div> -->
    <div class="w-2/5 h-full justify-center items-center">
      <img
        :src="baseURL + 'images/incubrain-logo.svg'"
        alt="Incubrain Logo"
        width="420"
        height="420"
        style="filter: invert(1)"
      />
    </div>
  </div>
</template>

<style>
/* .w-full {
  width: 100%;
}
.h-full {
  height: 100%;
}
.flex {
  display: flex;
}
.z-10 {
  z-index: 10;
}
.bg-black {
  background-color: black;
}
.relative {
  position: relative;
}
.z-50 {
  z-index: 50;
}
.flex-col {
  flex-direction: column;
}
.justify-between {
  justify-content: space-between;
}
.text-gray-100 {
  color: #f7fafc;
}
.flex-row {
  flex-direction: row;
}
.items-center {
  align-items: center;
}
.text-white {
  color: white;
}
.gap-2 {
  gap: 0.5rem;
}
.w-50 {
  width: 50%;
}
.items-end {
  align-items: flex-end;
}
.justify-center {
  justify-content: center;
} */
</style>
