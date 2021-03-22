/* eslint-disable no-console */
import { AppState } from '../AppState'
import { api } from './AxiosService'

class BugsService {
  async getAllBugs() {
    try {
      const res = await api.get('api/bugs')
      AppState.bugs = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async getBugsById(id) {
    try {
      const res = await api.get('api/bugs/' + id)
      AppState.activeBug = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async getNotesByBugId(id) {
    try {
      const res = await api.get(`api/bugs/${id}/notes`)
      AppState.lists = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async createBug(body) {
    const res = await api.post('api/bugs', body)
    AppState.bugs.push(res.data)
    return res.data.id
  }

  async editBug(id, body) {
    try {
      const res = await api.put('api/bugs/' + id, body)
      console.log(res)
      AppState.activeBug = res.data
      this.getBugsById(id)
    } catch (error) {
      console.error(error)
    }
  }

  async deleteBug(id) {
    const res = await api.delete('api/bugs/' + id)
    const index = AppState.bugs.findIndex(bug => bug.id === id)
    AppState.bugs.splice(index, 1)
    AppState.activeBug = res.data
  }
}

export const bugsService = new BugsService()
