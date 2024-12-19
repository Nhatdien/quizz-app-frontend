<template>
  <div v-if="useReviewStore().reviews?.length > 0" class="review-list">
    <Review
      class="review-item"
      v-for="review in useReviewStore().reviews"
      :review="review"
      :key="review?.id"/>
  </div>
</template>

<script setup lang="ts">
import { useReviewStore } from '~/stores/stores/review';
import Review from './Review.vue';

const { $quizzAppSDK } = useNuxtApp();
const route = useRoute();

</script>

<style scoped lang="scss">

</style>
