<template>

    <div>
        Your score is {{ useRoomStore().currentScore }}
    </div>
</template>

<script lang="ts">
import { useRoomStore } from "~/stores/stores/room";


</script>