<script>
/*
|--------------------------------------------------------------------------
| CORE component & config
|--------------------------------------------------------------------------
|
*/
import CONFIG_CORE from '../config'

/*
|--------------------------------------------------------------------------
| Mixins
|--------------------------------------------------------------------------
|
*/
let authUtils = require('../../' + CONFIG_CORE.pathAuthUtils).default

/*
|--------------------------------------------------------------------------
| Extend
|--------------------------------------------------------------------------
|
*/
export default {
  mixins: [authUtils],
  props: {
    item: {
      type: Object,
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
  }
}
</script>

<template>
  <form class="form-only">
    Form...
  </form>
</template>

<style lang="sass" scoped>
</style>
