<template>
  <Card class="quiz-card">
    <CardHeader>
      <CardTitle>{{ title }}</CardTitle>
      <CardDescription>{{ description }}</CardDescription>
    </CardHeader>
    <CardContent> Card Content </CardContent>
    <CardFooter> Card Footer </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'


const props = defineProps<{
  title: string;
  description: string;
}>();
</script>

<style scoped lang="scss">

.quiz-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
}
</style>