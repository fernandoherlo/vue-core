// Modules
export const globalTableConfig = {
  noDataText: 'Sin datos en la tabla.',
	lineNumbers: false,
  sortOptions: {
    enabled: true
  },
  searchOptions: {
    enabled: true,
    placeholder: 'Buscar'
  },
  paginationOptions: {
    enabled: true,
    perPage: 100,
    perPageDropdown: [5, 20, 50, 100, 200],
    dropdownAllowAll: false,
    nextLabel: 'Siguiente',
    prevLabel: 'Anterior',
    rowsPerPageLabel: 'Filas por página',
    ofLabel: 'de'
  },
  selectOptions: { 
    enabled: false,
    selectOnCheckboxOnly: true,
    selectionText: 'filas seleccionadas',
    clearSelectionText: '[limpiar]'
  }
}

export const globalTableColumns = {
  label: 'Acciones',
  field: 'id',
  type: 'number',
  thClass: 'actions',
  tdClass: 'actions',
  sortable: false
}
