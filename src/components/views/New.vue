<script>
/*
|--------------------------------------------------------------------------
| CORE component & config
|--------------------------------------------------------------------------
|
*/
import CoreComponentEdit from '@/components/views/Edit'
import componentConfig from '@/components/config'

/*
|--------------------------------------------------------------------------
| Extend
|--------------------------------------------------------------------------
|
*/
export default {
  extends: CoreComponentEdit,
  data () {
    return {
      config: componentConfig,
      isNew: true
    }
  }
}
</script>
