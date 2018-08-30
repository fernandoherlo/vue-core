<script>
/*
|--------------------------------------------------------------------------
| CORE component & config
|--------------------------------------------------------------------------
|
*/
import CoreComponentEdit from '@/components/Edit'
import componentConfig from '@/components/component'

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
  },
  methods: {
    __construct () {
      // Validate
      this.$nextTick(() => {
        this.$refs.formdefault.$children.forEach(vm => {
          console.log(vm.$options._componentTag);
          vm.$validator.validate()
        })
      })
      // Init methods
      this.__created()
    }
  }
}
</script>
