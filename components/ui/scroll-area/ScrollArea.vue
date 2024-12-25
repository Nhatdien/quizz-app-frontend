<script setup lang="ts">
import { cn } from "@/lib/utils";
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  type ScrollAreaRootProps,
  ScrollAreaViewport,
} from "radix-vue";
import { computed, ref, onMounted, type HTMLAttributes } from "vue";
import ScrollBar from "./ScrollBar.vue";

import { useScroll } from "@vueuse/core";

const emits = defineEmits(["scroll-top", "scroll-bottom"]);
const loadingTop = ref(false);
const loadingBottom = ref(false);

const onScroll = (event: Event) => {
  const target = event.target as HTMLElement;
  const { scrollTop } = target;

  if (scrollTop === 0) {
    loadingTop.value = true;
    emits("scroll-top");
    setTimeout(() => (loadingTop.value = false), 500); // Simulate loading time
  }

  if (scrollTop === target.scrollHeight - target.clientHeight) {
    loadingBottom.value = true;
    emits("scroll-bottom");
    setTimeout(() => (loadingBottom.value = false), 500); // Simulate loading time
  }
};

const props = defineProps<
  ScrollAreaRootProps & {
    class?: HTMLAttributes["class"];
    scrollToBottom?: boolean;
  }
>();

const delegatedProps = computed(() => {
  const { class: _, scrollToBottom, ...delegated } = props;

  return delegated;
});

onMounted(() => {
  if (props.scrollToBottom) {
    const viewport = document.querySelector(
      ".scroll-area-viewport"
    ) as HTMLElement;
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  }
});
</script>

<template>
  <ScrollAreaRoot
    v-bind="delegatedProps"
    :class="cn('relative overflow-hidden', props.class)">
    <ScrollAreaViewport
      @scroll="onScroll"
      class="scroll-area-viewport h-full w-full rounded-[inherit]">
      <slot />
      <div
        v-if="loadingTop"
        class="absolute bg-transparent top-0 left-0 right-0 flex justify-center items-center h-10">
        <span>...</span>
      </div>
      <div
        v-if="loadingBottom"
        class="absolute bg-transparent bottom-0 left-0 right-0 flex justify-center items-center h-10">
        <span>...</span>
      </div>
    </ScrollAreaViewport>
    <ScrollBar />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
