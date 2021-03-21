<template>
  <div class="BugDetailsPage container-fluid text-center">
    <div class="row mt-3 justify-content-center">
      <div class="col-4">
        <div class="card">
          <div class="p-3 card-top bg-dark text-light">
            {{ state.activeBug.title }}
          </div>
          <div class="p-4 card-body">
            {{ state.activeBug.description }}
          </div>
          <!-- <div class="card-footer bg-info p-3">
            {{ state.activeBug.creator.email }}
          </div> -->
        <!-- {{ state.activeBug }} -->
        </div>
      </div>
      <div class="col-6">
        <div class="card">
          <div class="card-body">
            <div class="bg-dark  text-danger" v-if="state.activeBug.closed == true" @click="deleteBug">
              <h2>
                {{ state.activeBug.closed ? 'Closed' : 'Open' }}
              </h2>
            </div>
            <div class="bg-dark  text-success" v-if="state.activeBug.closed ==false" @click="deleteBug">
              <h2>
                {{ state.activeBug.closed ? 'Closed' : 'Open' }}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row m-4 justify-content-center">
      <form type="submit" @submit.prevent="createNote">
        <div class="form-group">
          <input type="text"
                 id="body"
                 v-model="state.newNote.body"
                 placeholder="Add note to bug..."
          />
          <button type="submit" class="btn btn-info">
            Submit
          </button>
        </div>
      </form>
    </div>
    <NotesComponent v-for="note in state.notes" :key="note.id" :note-prop="note" />
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'
import { notesService } from '../services/NotesService'
export default {
  name: 'BugDetailsPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      activeBug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes),
      newNote: { bug: route.params.id }
    })
    onMounted(async() => {
      try {
        await bugsService.getBugsById(route.params.id)
        await notesService.getNotes(route.params.id)
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      state,
      async createNote() {
        try {
          await notesService.createNote(state.newNote)
          state.newNote = { bug: route.params.id }
        } catch (error) {
          logger.log(error)
        }
      },
      async deleteBug() {
        try {
          if (window.confirm('Are you sure?')) {
            await bugsService.deleteBug(route.params.id)
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
.close:hover{
  cursor: pointer;
}
</style>
