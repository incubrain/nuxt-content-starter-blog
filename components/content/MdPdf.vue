<template>
  <iframe
    :src="props.src"
    class="w-full h-[580px]"
  />
</template>

<script setup lang="ts">

interface Props {
  src?: string
  width?: string
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  src: 'https://assets10.lottiefiles.com/packages/lf20_soCRuE.json',
  width: '100%',
  height: '100%'
})

</script>
