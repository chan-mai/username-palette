<template>
  <label
    :class="[
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
    ]"
    v-bind="$attrs"
  >
    <slot />
  </label>
</template> 