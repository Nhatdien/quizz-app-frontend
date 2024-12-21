<template>
    <div class="flashcard" @click="flipCard">
        <div :class="{'flipped': isFlipped}">
            <div class="front">
                <p>{{ question }}</p>
            </div>
            <div class="back">
                <p>{{ answer }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
    question: string;
    answer: string;
}>();

const isFlipped = ref(false);

function flipCard() {
    isFlipped.value = !isFlipped.value;
}
</script>

<style scoped>
.flashcard {
    width: 300px;
    height: 200px;
    perspective: 1000px;
    cursor: pointer;
}

.flashcard > div {
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    position: relative;
}

.flashcard .flipped {
    transform: rotateY(180deg);
}

.flashcard .front, .flashcard .back {
    backface-visibility: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    padding: 20px;
    box-sizing: border-box;
}

.flashcard .back {
    transform: rotateY(180deg);
}
</style>
