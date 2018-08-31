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
    this.$nextTick(() => {
      if (this.$refs.firstFocusForm) {
        this.$refs.firstFocusForm.focus()
        this.$refs.firstFocusForm.select()
      }
    })
  },
  methods: {
    __send () {
      if (!this.isNew){
        this.$parent.__update()
      }
      if (this.isNew){
        this.$parent.__save()
      }
      return false;
    },
    hasErrors (label) {
      if (this.errors) {
        if (this.errors.items.length > 0) {
          return this.errors.has('formDefaultValidate.' + label)
        }
      }
    },
    firstError (label) {
      if (this.errors) {
        if (this.errors.items.length > 0) {
          return this.errors.first('formDefaultValidate.' + label)
        }
      }
    }
  }
}
</script>

<template>
  <form v-if="item" v-on:submit.prevent="__send">
    Form...
  </form>
</template>

<style lang="sass" scoped>
</style>
