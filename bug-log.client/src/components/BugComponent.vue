<template>
  <!-- ADD INTO EDITS v-if="bugProp.account.id == bugProp.user.id" -->
  <div class="bugComponent m-5">
    <div class="card">
      <div class="card-top bg-info">
        <router-link :to="`/BugDetailsPage/${bugProp.id}`">
          <h3 class="text-dark">
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
        <p class="text-success" v-if="bugProp.closed == false">
          {{ bugProp.closed ? 'Closed' : 'Open' }}
        </p>
        <p class="text-danger" v-if="bugProp.closed == true">
          {{ bugProp.closed ? 'Closed' : 'Open' }}
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
