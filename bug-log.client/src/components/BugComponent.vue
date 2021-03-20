<template>
  <div class="bugComponent">
    <div class="card">
      <div class="card-top bg-info">
        {{ bugProp.title }}
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
export default {
  name: 'BugComponent',

  props: {
    bugProp: { type: Object, required: true }
  },

  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
