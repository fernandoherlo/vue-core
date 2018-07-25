<script>
// CORE COMPONENT
import CoreComponentEdit from '@/components/Edit'
// LOCAL CONFIG
import localConfig from './component'

// Extend
export default {
  extends: CoreComponentEdit,
  data () {
    return {
      config: localConfig,
    }
  },
  methods: {
    __created () {
    }
  }
}
</script>
