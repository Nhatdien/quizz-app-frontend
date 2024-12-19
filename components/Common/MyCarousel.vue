<script setup lang="ts" generic="T">
import { defineProps, type DefineComponent } from "vue";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const props = defineProps<{
  items: Array<T>;
}>();
</script>

<template>
  <Carousel
    class="relative w-full"
    :opts="{
      align: 'start',
    }">
    <CarouselContent>
      <CarouselItem
        v-for="(item, index) in items"
        :key="index"
        class="sm:basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
        <div class="p-1" style="width: 100%; height: 100%;">
          <Card style="width: 100%; height: 100%;">
            <CardContent style="width: 100%; height: 100%;">
              <slot name="item-component" :item="item" />
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>
