<script>
/*
|--------------------------------------------------------------------------
| Extend
|--------------------------------------------------------------------------
|
*/
export default {
  props: {
    item: {
      type: Object,
      required: false
    },
    itemIDParent: {
      type: Number,
      required: false
    },
    isNew: {
      type: Boolean,
      required: false,
      default: false
    },
    extrasForm: {
      type: Object,
      required: false
    }
  },
  created () {
    // Degub
    this.$log.debug('FORM')
    // pre-Created children
    this.__precreated()
    // Tick
    this.$nextTick(() => {
      if (this.$refs.firstFocusForm) {
        this.$refs.firstFocusForm.focus()
        this.$refs.firstFocusForm.select()
      }
    })
    // Created children
    this.__created()
  },
  methods: {
    __created () {
      // Degub
      this.$log.debug('FORM')
    },
    __precreated () {
      // Degub
      this.$log.debug('FORM')
    },
    __send () {
      // Degub
      this.$log.debug('FORM')
      if (!this.isNew){
        this.$parent.__update()
      }
      if (this.isNew){
        this.$parent.__save()
      }
      return false;
    }
  }
}
</script>

<template>
  <form v-if="item" v-on:submit.prevent="__send">
    Form...
  </form>
</template>

<style lang="scss" scoped>
</style>
