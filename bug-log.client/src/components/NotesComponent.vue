<template>
  <div class="NotesComponent">
    <div class="card">
      <div class="row">
        <div class="col-2">
          <img :src="noteProp.creator.picture" alt="">
        </div>
        <div class="col-6">
          <h2 class="text-center">
            {{ noteProp.body }}
          </h2>
        </div>
        <div class="col-3">
          <h3>
            {{ noteProp.creator.email }}
          </h3>
        </div>
        <div class="col-1">
          <i class="fa fa-times-circle text-danger fa-2x" v-if="state.account.id == noteProp.creatorId" @click="removeNote()"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { notesService } from '../services/NotesService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { computed } from '@vue/runtime-core'

export default {
  name: 'NotesComponent',
  props: {
    noteProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user)
    })
    return {
      state,
      async removeNote() {
        try {
          if (window.confirm('Are you sure?')) {
            await notesService.deleteNote(props.noteProp.id)
          }
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
