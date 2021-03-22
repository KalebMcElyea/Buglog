<template>
  <div class="home container-fluid ">
    <div class="row mt-3 justify-content-center">
      <form type="submit" @submit.prevent="create">
        <div class="form-group m-2">
          <input type="text"
                 class="form-control"
                 id="title"
                 v-model="state.newBug.title"
                 placeholder="What's the Bug..."
                 required
          >
          <input type="text"
                 class="form-control"
                 id="description"
                 v-model="state.newBug.description"
                 placeholder="Description..."
                 required
          >
          <button type="submit" class="btn btn-outline-info mt-2">
            Create Bug
          </button>
        </div>
      </form>
    </div>
    <div class="row justify-content-center">
      <BugComponent v-for="bug in state.bugs" :key="bug.id" :bug-prop="bug" />
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { logger } from '../utils/Logger'
import { useRouter } from 'vue-router'

export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    const state = reactive({
      bugs: computed(() => AppState.bugs),
      newBug: {}
    })
    onMounted(async() => {
      try {
        await bugsService.getAllBugs()
      } catch (error) {
        logger.log(error)
      }
    })

    return {
      state,
      async create() {
        try {
          const id = await bugsService.createBug(state.newBug)
          state.newBug = {}
          router.push({ name: 'BugDetailsPage', params: { id } })
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
