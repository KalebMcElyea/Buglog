<template>
  <div class="bugComponent card">
    {{ bugProp.title }}
    {{ bugProp.description }}
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
