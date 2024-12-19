import { useWindowSize } from "@vueuse/core";
import { computed } from "vue";

export const useScreen = () => {
  const { width } = useWindowSize();

  const screenSize = computed(() => {
    if (width.value < 640) return "small";
    if (width.value >= 640 && width.value < 768) return "medium";
    if (width.value >= 768 && width.value < 1024) return "large";
    if (width.value >= 1024 && width.value < 1280) return "x-large";
    return "xx-large";
  });

  const isLargerThanSmall = computed(() => width.value >= 640);
  const isLargerThanMedium = computed(() => width.value >= 768);
  const isLargerThanLarge = computed(() => width.value >= 1024);
  const isLargerThanXLarge = computed(() => width.value >= 1280);

  return {
    screenSize: screenSize.value,
    isLargerThanSmall: isLargerThanSmall.value,
    isLargerThanMedium: isLargerThanMedium.value,
    isLargerThanLarge: isLargerThanLarge.value,
    isLargerThanXLarge: isLargerThanXLarge.value,
  };
};
