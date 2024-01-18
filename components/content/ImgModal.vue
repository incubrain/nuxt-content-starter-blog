<template>
  <div>
    <NuxtImg
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      class="cursor-pointer transition duration-500 ease-in-out transform hover:scale-105"
      @click="openModal"
    />
    <dialog ref="dialog">
      <div>
        <NuxtImg
          :src="src"
          :alt="alt"
          class="transition duration-500 ease-in-out"
        />
        <button
          class="absolute top-2 flex justify-center items-center right-2 bg-gray-300 font-semibold rounded-full px-2 py-[5px] leading-none text-xs  hover:bg-gray-400 transition duration-500 ease-in-out"
          @click="closeModal"
        >
          X
        </button>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: undefined
  },
  height: {
    type: [String, Number],
    default: undefined
  }
})

const dialog = ref(null)

function openModal() {
  if (dialog.value) dialog.value.showModal()
}

function closeModal() {
  if (dialog.value) dialog.value.close()
}

let handleClickOutside

onMounted(() => {
  handleClickOutside = (event) => {
    if (event.target === dialog.value) {
      closeModal()
    }
  }
  window.addEventListener('click', handleClickOutside)
})
</script>

<style>
dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.5s;
}

dialog {
  transition: opacity 0.5s;
  border-radius: 1rem;
}
</style>
