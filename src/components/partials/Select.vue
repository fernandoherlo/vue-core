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
    values: {
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
    <select class="custom-select" v-model="item[field.field]" ref="firstFocusForm">
    </template>
    <template v-else>
    <select class="custom-select" v-model="item[field.field]">
    </template>
      <option disabled>{{ field.labelDefault }}</option>
      <option v-for="val in values" v-bind:value="val.id" v-bind:key="val.id">
        {{ val.name }}
      </option>
    </select>
  </div>
</template>

<style lang="sass" scoped>
</style>
