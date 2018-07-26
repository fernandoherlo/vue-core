<script>
// CORE COMPONENT
import CoreComponentForm from '@/components/Form'
// LOCAL CONFIG
import localConfig from '../config/component'

// Extend
export default {
  extends: CoreComponentForm,
  data () {
    return {
      config: localConfig
    }
  }
}
</script>

<template>
  <form>
    <div>
      <div v-if="item">
        <h5>EOO: {{ item.name }}</h5>
        <input type="text" v-model="item.name">
      </div>
    </div>
  </form>
</template>
