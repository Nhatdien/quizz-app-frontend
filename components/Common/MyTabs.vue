<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const props = defineProps({
  tabOptions: {
    type: Array as PropType<{ value: string; label: string }[]>,
    required: true,
  },
});

const currentTab = ref(props.tabOptions[0].value);
</script>

<template>
  <Tabs
    :default-value="tabOptions[0].value"
    class="w-full">
    <TabsList class="grid w-full grid-cols-2">
      <TabsTrigger v-for="option in tabOptions" :value="option.value">
        <slot :name="`tab-trigger-${option.value}`">
          {{ option.label }}
        </slot>
      </TabsTrigger>
    </TabsList>
    <TabsContent v-for="option in tabOptions" :value="option.value">
      <slot :name="`tab-content-${option.value}`" />
    </TabsContent>
  </Tabs>
</template>
