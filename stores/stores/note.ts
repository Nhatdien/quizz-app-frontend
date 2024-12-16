import { defineStore } from "pinia";
import QuizzAppSDK from "../quizzapp_sdk";
import type { NoteRequest, NoteResponse } from "@/types/note";

export const useNoteStore = defineStore({
  id: "note",
  state: () => ({
    notes: [] as NoteResponse[],
  }),
  actions: {
    async createNote(noteInfo: NoteRequest[]): Promise<void> {
      return QuizzAppSDK.getInstance()
        .createNote(noteInfo)
        .then((notes) => {
          this.notes.push(...notes);
        });
    },

    async deleteNote(noteId: string): Promise<void> {
      return QuizzAppSDK.getInstance()
        .deleteNote(noteId)
        .then(() => {
          this.notes = this.notes.filter((note) => note.id !== noteId);
        });
    },

    async getNotes(noteInfo: NoteRequest): Promise<void> {
      return QuizzAppSDK.getInstance()
        .getNotes(noteInfo)
        .then((notes) => {
          this.notes = notes;
        });
    },

    async updateNote(updatedNotes: NoteRequest[]): Promise<void> {
      return QuizzAppSDK.getInstance()
        .updateNote(updatedNotes)
        .then((notes) => {
          this.notes = notes;
        });
    },
  },
});
