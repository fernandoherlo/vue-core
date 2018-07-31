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
    if (this.$refs.firstFocusForm) {
      this.$nextTick(() => {
        this.$refs.firstFocusForm.$el.focus()
      })
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

<style lang="sass" scoped>
</style>
