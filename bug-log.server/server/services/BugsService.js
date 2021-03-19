import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async edit(id, creatorId, body) {
    const bug = await dbContext.Bug.findOneAndUpdate({ _id: id, creatorId, closed: false }, body, { new: true })
    if (!bug) {
      throw new BadRequest('invalid access or id or closed bug')
    }
    return bug
  }

  async closeBug(body) {
    const bug = await dbContext.Bug.findByIdAndUpdate(body.id, body, { new: true }).populate('creator')
    if (!bug) {
      throw new BadRequest('invalid access or id or closed bug')
    }
    return bug
  }

  async create(body) {
    return await dbContext.Bug.create(body)
  }

  async find(query = {}) {
    const bug = await dbContext.Bug.find(query).populate('creator')
    return bug
  }

  async findById(id) {
    const bug = await dbContext.Bug.findById(id).populate('creator')
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async findNotesByBugId(id) {
    const note = await dbContext.Note.findById(id).populate('creator')
    if (note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }
}

export const bugsService = new BugsService()
