<script setup lang="ts">
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { defineProps } from "vue";

const props = defineProps<{
    title?: string;
    description?: string;
    submitText?: string;
    cancelText?: string;
}>();
</script>

<template>
    <Drawer>
        <DrawerTrigger>
            <slot name="trigger">Open</slot>
        </DrawerTrigger>
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle v-if="title">{{ title }}</DrawerTitle>
                <DrawerDescription v-if="description">{{ description }}</DrawerDescription>
            </DrawerHeader>
            <slot />
            <DrawerFooter>
                <Button v-if="submitText">{{ submitText }}</Button>
                <DrawerClose>
                    <Button v-if="cancelText" variant="outline">
                        {{ cancelText }}
                    </Button>
                </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
</template>
