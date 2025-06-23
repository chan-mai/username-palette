<template>
  <div class="relative">
    <button
      type="button"
      :class="[
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
      ]"
      @click="isOpen = !isOpen"
    >
      <span :class="modelValue ? 'text-foreground' : 'text-muted-foreground'">
        {{ modelValue || placeholder }}
      </span>
      <svg
        class="h-4 w-4 opacity-50"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
    
    <div
      v-show="isOpen"
      class="absolute z-50 w-full mt-1 bg-background border border-input rounded-md shadow-lg"
    >
      <div class="py-1">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: string
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)

const selectValue = (value: string) => {
  emit('update:modelValue', value)
  isOpen.value = false
}

// Close dropdown when clicking outside
const closeDropdown = () => {
  isOpen.value = false
}

// Expose methods to child components
defineExpose({
  selectValue,
  closeDropdown
})
</script> 