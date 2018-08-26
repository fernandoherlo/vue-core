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
    },
    disabledCondition: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<template>
  <div class="form-group">
    <label>{{ field.label }}</label>
    <template v-if="field.firstFocusForm">
      <input class="form-control" type="password" v-model="item[field.field]" ref="firstFocusForm" :disabled="disabledCondition">
    </template>
    <template v-else>
      <input class="form-control" type="password" v-model="item[field.field]" :disabled="disabledCondition">
    </template>
  </div>
</template>

<style lang="sass" scoped>
</style>
