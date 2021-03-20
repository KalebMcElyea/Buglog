<template>
  <div class="bugComponent m-5">
    <div class="card">
      <div class="card-top bg-info">
        <router-link :to="`/BugDetailsPage/${bugProp.id}`">
          <h3>
            {{ bugProp.title }}
          </h3>
        </router-link>
      </div>
      <div class="card-body">
        <p class="m-2">
          {{ bugProp.description }}
        </p>
        <p class="text-info">
          {{ bugProp.createdAt }}
        </p>
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
