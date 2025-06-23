<template>
  <button
    type="button"
    :class="[
      'relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
    ]"
    @click="$emit('click', value)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  value: string
}>()

defineEmits<{
  click: [value: string]
}>()
</script> 