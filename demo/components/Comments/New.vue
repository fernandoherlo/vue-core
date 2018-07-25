<script>
// CORE COMPONENT
import CoreComponentNew from '@/components/New'
// LOCAL CONFIG
import localConfig from './component'
// Form
import Form from './Form'

// Extend
export default {
  extends: CoreComponentNew,
  data () {
    return {
      Form: Form,
      config: localConfig
    }
  }
}
</script>
