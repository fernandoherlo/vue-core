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
      type: Array,
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
      <select class="custom-select" v-model="item[field.field]" ref="firstFocusForm" :disabled="disabledCondition">
        <option disabled>{{ field.labelDefault }}</option>
        <option v-for="val in values" v-bind:value="val.id" v-bind:key="val.id">
          {{ val.name }}
        </option>
      </select>
    </template>
    <template v-else>
      <select class="custom-select" v-model="item[field.field]" :disabled="disabledCondition">
        <option disabled>{{ field.labelDefault }}</option>
        <option v-for="val in values" v-bind:value="val.id" v-bind:key="val.id">
          {{ val.name }}
        </option>
      </select>
    </template>
  </div>
</template>

<style lang="sass" scoped>
</style>
