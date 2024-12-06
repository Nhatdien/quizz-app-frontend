import { Base } from "../base";
import type { NoteRequest, NoteResponse } from "@/types/note";

export class Note extends Base {
  createNote(noteInfo: NoteRequest[]): Promise<NoteResponse[]> {
    return this.fetch(`${this.config.base_url}/note/create`, {
      method: "POST",
      body: JSON.stringify(noteInfo),
    });
  }

  getNotes(noteInfo: NoteRequest): Promise<NoteResponse[]> {
    return this.fetch(`${this.config.base_url}/note/get-note`, {
      method: "POST",
      body: JSON.stringify(noteInfo),
    });
  }

  updateNote(updatedNotes: NoteRequest[]): Promise<NoteResponse[]> {
    return this.fetch(`${this.config.base_url}/note/update`, {
      method: "POST",
      body: JSON.stringify(updatedNotes),
    });
  }

  deleteNote(noteId: string): Promise<string> {
    return this.fetch(`${this.config.base_url}/note/delete/${noteId}`, {
      method: "DELETE",
    });
  }
}
