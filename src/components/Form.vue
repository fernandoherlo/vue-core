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
  methods: {
    __send () {
      if (!this.isNew){
        this.$parent.__update()
      }
      if (this.isNew){
        this.$parent.__save()
      }
    }
  }
}
</script>

<template>
  <form>
    Form...
  </form>
</template>

<style lang="sass" scoped>
</style>
