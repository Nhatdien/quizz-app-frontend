<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { type HTMLAttributes, provide } from 'vue'
import { FORM_ITEM_INJECTION_KEY } from './injectionKeys'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

provide(FORM_ITEM_INJECTION_KEY, Math.random().toString(36).substring(7))
</script>

<template>
  <div :class="cn('space-y-2', props.class)">
    <slot />
  </div>
</template>
