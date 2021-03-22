<template>
  <div class="BugDetailsPage container-fluid text-center font" v-if="state.activeBug.creator">
    <div class="row mt-3 justify-content-center">
      <div class="col-4">
        <div class="card shadow-lg">
          <form type="submit" @submit.prevent="editBug()" class="m-1" v-if="state.activeBug.closed == false">
            <input type="text"
                   class="form-control"
                   id="title"
                   v-model="state.editedBug.title"
                   placeholder="Edit title"
                   required
            >
            <input type="text"
                   class="form-control"
                   id="description"
                   v-model="state.editedBug.description"
                   placeholder="Edit description"
                   required
            >
            <button type="submit" class="btn btn-outline-info mt-2">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </button>
          </form>
          <div class="p-3 card-top bg-dark text-light">
            <img class="pic p-2" :src="state.activeBug.creator.picture" alt=""> {{ state.activeBug.title }}
          </div>
          <hr>
          <div class="p-4 card-body">
            {{ state.activeBug.description }}
          </div>
          <hr>
          <div class="card-footer bg-info p-3">
            {{ state.activeBug.creator.email }}
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="card">
          <div class="card-body">
            <div class="bg-dark text-danger pt-2" v-if="state.activeBug.closed == true" @click="deleteBug">
              <h2 class="">
                {{ state.activeBug.closed ? 'Closed' : 'Open' }}
              </h2>
            </div>
            <div class="bg-dark text-success pt-2" v-if="state.activeBug.closed ==false" @click="deleteBug">
              <h2 class="">
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
          <button type="submit" class="btn btn-info m-1">
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
      loading: true,
      account: computed(() => AppState.account),
      activeBug: computed(() => AppState.activeBug),
      editedBug: {},
      notes: computed(() => AppState.notes),
      newNote: { bug: route.params.id }
    })
    onMounted(async() => {
      try {
        await bugsService.getBugsById(route.params.id)
        await notesService.getNotes(route.params.id)
        state.loading = false
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
          if (window.confirm('Are you sure you want to close this BUG?')) {
            await bugsService.deleteBug(route.params.id)
          }
        } catch (error) {
          logger.log(error)
        }
      },
      async editBug() {
        try {
          await bugsService.editBug(state.activeBug.id, state.editedBug)
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
// .close:hover{
//   cursor: pointer;
//   width: 550px;
//   height:max
// }

.pic{
  height: 50px;
  width: 50px;
}
.font{
  font-family:'Special Elite', cursive;
  font-size: 25px;
}
</style>
