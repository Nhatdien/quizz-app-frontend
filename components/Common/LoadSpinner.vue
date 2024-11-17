<template>
    <div class="loading loading--full-height"></div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
/* Style #1 */
.loading {
  display: flex;
  justify-content: center;
}

.loading--full-height {
  align-items: center;
  height: 100%;
}

.loading::after {
  content: "";
  width: 50px;
  height: 50px;
  border: 5px solid #dddddd;
  border-top-color: hsl(var(--primary));
  border-radius: 50%;
  transform: rotate(0.16turn);
  animation: loading 1s ease infinite;
}

@keyframes loading {
  /* Safari support */
  from {
    transform: rotate(0turn);
  }
  
  to {
    transform: rotate(1turn);
  }
}
</style>