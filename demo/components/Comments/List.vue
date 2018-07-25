<script>
// CORE COMPONENT
import CoreComponentList from '@/components/List'
// LOCAL CONFIG
import localConfig from './component'

// Extend
export default {
  extends: CoreComponentList,
  data () {
    return {
      config: localConfig
    }
  }
}
</script>

<style lang="sass">
</style>
