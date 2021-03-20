import { AppState } from '../AppState'
import { api } from './AxiosService'

class NotesService {
  async getNotes(id) {
    const res = await api.get('api/bugs/' + id + '/notes')
    AppState.notes = res.data
  }

  async createNote(rawNote) {
    const res = await api.post('api/notes', rawNote)
    AppState.notes.push(res.data)
  }

  async deleteNote(id) {
    await api.delete('api/notes/' + id)
    const Index = AppState.notes.findIndex(note => note.id === id)
    AppState.notes.splice(Index, 1)
  }
}

export const notesService = new NotesService()
