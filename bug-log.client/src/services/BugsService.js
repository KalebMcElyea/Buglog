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
    try {
      const res = await api.post('api/bugs', body)
      AppState.bug.push(res.data)
      return res.data.id
    } catch (error) {
      console.error(error)
    }
  }

  // WANT TO TURN THIS INTO A CLOSED INSTEAD OF DELETE
  // async deleteBoard(id) {
  //   try {
  //     await api.delete('api/boards/' + id)
  //     this.getAllBoards()
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  async editBug(id, body) {
    try {
      const res = await api.put('api/bugs/' + id, body)
      console.log(res)
      AppState.activeBug = res.data
    } catch (error) {
      console.error(error)
    }
  }
}

export const bugsService = new BugsService()
