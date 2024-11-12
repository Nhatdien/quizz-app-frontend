<template>
  <ClientOnly />
  <Dialog>
    <DialogTrigger as-child>
      <Button class="m-4">
        {{ "+ Create" }}
      </Button>
    </DialogTrigger>
    <DialogContent class="">
      <DialogHeader>
        <DialogTitle> Create Quiz </DialogTitle>
        <DialogDescription>
          {{ "Create a new quiz" }}
        </DialogDescription>
      </DialogHeader>

      <QuizCreateQuizForm />
    </DialogContent>
  </Dialog>
  <ClientOnly />
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
</script>
