<script>
// CORE COMPONENT
import CoreComponentForm from '../../../core/components/Form'
// LOCAL CONFIG
import localConfig from './component'

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
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" data-toggle="tab" href="#data" role="tab" aria-controls="data">Datos</a>
      </li>
      <li class="nav-item" v-if="!isNew">
        <a class="nav-link" data-toggle="tab" href="#addresses" role="tab" aria-controls="info">Direcciones</a>
      </li>
    </ul>
    <div class="tab-content">
      <!-- DATA -->
      <!-- ########################################################## -->
      <div class="tab-pane active" id="data" role="tabpanel">
        <div class="row row-line-bottom">
          <div class="col-md-12">
            <div class="form-group">
              <label>Nombre</label>
              <input type="text" class="form-control" v-model="item.name">
            </div>
          </div>
        </div>
      </div>
      <!-- ########################################################## -->
      <!-- ADDRESSES -->
      <!-- ########################################################## -->
      <div class="tab-pane" id="addresses" role="tabpanel" v-if="!isNew">
        <inline-list-addresses :items="extrasForm.addresses" :table-ref="extrasForm.tableAddresses" :id-ref="item.id"></inline-list-addresses>
        <new-inline-address-form :table-ref="extrasForm.tableAddresses" :id-ref="item.id"></new-inline-address-form>
      </div>
    </div>
  </form>
</template>
