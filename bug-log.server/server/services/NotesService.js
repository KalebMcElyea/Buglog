import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

// async findNotesByBugId(id) {
//   const note = await dbContext.Note.findById(id).populate('creator')
//   if (note) {
//     throw new BadRequest('Invalid Id')
//   }
//   return note
// }
class NotesService {
  async getAllNotes(query = {}) {
    const note = await dbContext.Note.find(query).populate('creator')
    return note
  }

  async findById(id) {
    const note = await dbContext.Note.findById(id).populate('creator')
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }

  async create(body) {
    return await dbContext.Note.create(body)
  }

  async edit(id, userId, body) {
    return await dbContext.Note.findOneAndUpdate(id, userId, body).populate('creator')
  }

  async delete(id) {
    return await dbContext.Note.findByIdAndDelete(id).populate('creator')
  }

  async getAll(query = {}) {
    return await dbContext.Note.find(query)
  }
}

export const notesService = new NotesService()
