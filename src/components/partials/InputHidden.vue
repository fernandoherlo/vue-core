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
  <input v-validate="field.validate" type="hidden" v-model="item[field.field]">
</template>

<style lang="sass" scoped>
</style>
