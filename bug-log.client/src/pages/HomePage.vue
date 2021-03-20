<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <h1 class="my-5 bg-dark text-light p-3 rounded d-flex align-items-center">
      <span class="mx-2 text-white">Bug-Log</span>
    </h1>
    <div>
      <BugComponent v-for="bug in state.bugs" :key="bug.id" :bug-prop="bug" />
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'

export default {
  name: 'Home',

  setup() {
    const state = reactive({
      bugs: computed(() => AppState.bugs)
    })
    onMounted(() => bugsService.getAllBugs)
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
