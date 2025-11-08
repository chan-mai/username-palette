<template>
  <div
    :class="[
      'rounded-lg border bg-card text-card-foreground shadow-sm'
    ]"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template> 