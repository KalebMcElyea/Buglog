<template>
  <div class="bugComponent">
    <div class="card">
      <div class="card-top bg-info">
        <router-link :to="`/BugDetailsPage/${bugProp.id}`">
          <h3>
            {{ bugProp.title }}
          </h3>
        </router-link>
      </div>
      <div class="card-body">
        {{ bugProp.description }}
      </div>
      <div class="card-footer bg-dark text-light">
        {{ bugProp.creator.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { bugsService } from '../services/BugsService'
import { logger } from '../utils/Logger'
export default {
  name: 'BugComponent',

  props: {
    bugProp: { type: Object, required: true }
  },

  setup(props) {
    return {
      async getOne() {
        try {
          await bugsService.getBugsById(props.bugProp.id)
        } catch (error) {
          logger.log(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
