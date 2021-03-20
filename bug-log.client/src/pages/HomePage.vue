<template>
  <div class="home container-fluid">
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
// import { useRouter } from 'vue-router'

export default {
  name: 'Home',
  setup() {
    // const router = useRouter()
    const state = reactive({
      bugs: computed(() => AppState.bugs)
    })
    onMounted(async() => {
      try {
        await bugsService.getAllBugs()
      } catch (error) {
        logger.log(error)
      }
    })

    return { state }
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
