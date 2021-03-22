<template>
  <!-- ADD INTO EDITS v-if="bugProp.account.id == bugProp.user.id" -->
  <div class="bugComponent m-5">
    <div class="card font">
      <div class="card-top bg-info">
        <router-link :to="`/BugDetailsPage/${bugProp.id}`">
          <h3 class="text-dark title-size pl-1 pr-1 pt-1">
            {{ bugProp.title }}
          </h3>
        </router-link>
      </div>
      <div class="card-body shadow-lg">
        <p class="m-2">
          {{ bugProp.description }}
        </p>
        <hr>
        <p class="text-info">
          Created: {{ bugProp.updatedAt.slice(5,7) }} /{{ bugProp.createdAt.slice(8,10) }}/ {{ bugProp.createdAt.slice(0,4) }}
          <br>
        </p>
        <hr>
        <p>
          Updated: {{ bugProp.updatedAt.slice(5,7) }} /{{ bugProp.updatedAt.slice(8,10) }}/ {{ bugProp.updatedAt.slice(0,4) }}
        </p>
        <p class="text-success" v-if="bugProp.closed == false">
          {{ bugProp.closed ? 'Closed' : 'Open' }}
        </p>
        <p class="text-danger" v-if="bugProp.closed == true">
          {{ bugProp.closed ? 'Closed' : 'Open' }}
        </p>
        <hr>
      </div>
      <div class="card-footer bg-dark text-light">
        <img class="pic p-2" :src="bugProp.creator.picture" alt="">
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

<style>
.pic{
  height: 40px;
  width: 40px;
}

.font{
  font-family:'Special Elite', cursive;
  font-size: 15px;
}
.title-size{
  font-size: 25px
}
</style>
