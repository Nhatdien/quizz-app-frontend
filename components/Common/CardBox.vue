<template>
  <div
    class="flex relative flex-col items-center justify-center bg-[#0F3D42] rounded-lg p-6 shadow-lg text-center">
    <!-- Image -->
    <div class="section-pin"></div>
    <div class="mb-4">
      <slot name="image" />
    </div>

    <!-- Title -->
    <h2 class="sm:text-2xl md:text-3xl font-extrabold text-[#FDFD96] mb-2">
      <slot name="title" />
    </h2>

    <!-- Description -->
    <p class="text-[#B2D8D8] text-lg mb-4">
      <slot name="description" />
    </p>

    <!-- Button -->
    <div>
      <slot name="button" />
    </div>
  </div>
</template>
