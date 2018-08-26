<script>

export default {
  props: {
    item: {
      type: Object,
      required: false
    },
    field: {
      type: Object,
      required: false
    }
  }
}
</script>

<template>
  <div class="form-group">
    <label>{{ field.label }}</label>
    <template v-if="field.firstFocusForm">
      <input class="form-control" type="password" v-model="item[field.field]" ref="firstFocusForm">
    </template>
    <template v-else>
      <input class="form-control" type="password" v-model="item[field.field]">
    </template>
  </div>
</template>

<style lang="sass" scoped>
</style>
