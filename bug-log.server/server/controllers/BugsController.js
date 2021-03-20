import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAll)
      .get('/:id/notes', this.getAllNotes)
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getBugsById)
      .post('', this.create)
      .delete('/:id', this.delete)
      .put('/:id', this.edit)
  }

  async getBugsById(req, res, next) {
    try {
      res.send(await bugsService.findById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      res.send(await bugsService.find())
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const bugs = await bugsService.create(req.body)
      res.send(await bugsService.findById(bugs.id))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      req.body.closed = true
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      res.send(await bugsService.closeBug(req.body))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      // NOTE see paddyday blogs controller
      delete req.body.closed
      const creatorId = req.userInfo.id
      res.send(await bugsService.edit(req.params.id, creatorId, req.body))
    } catch (error) {
      next(error)
    }
  }

  async getAllNotes(req, res, next) {
    try {
      res.send(await notesService.getAllNotes({ bug: req.params.id }))
    } catch (error) {
      next(error)
    }
  }
}
