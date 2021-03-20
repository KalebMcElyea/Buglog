<template>
  <div class="BugDetailsPage container-fluid">
    <div class="row">
      <div class="card">
        {{ state.activeBug }}
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'
export default {
  name: 'BugDetailsPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      activeBug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes)
    })
    onMounted(async() => {
      try {
        await bugsService.getBugsById(route.params.id)
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      state
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
