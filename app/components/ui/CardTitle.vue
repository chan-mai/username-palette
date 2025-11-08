<template>
  <h3
    :class="[
      'text-2xl font-semibold leading-none tracking-tight'
    ]"
    v-bind="$attrs"
  >
    <slot />
  </h3>
</template> 