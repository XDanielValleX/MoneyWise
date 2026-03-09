import { Component, EventEmitter, Output } from '@angular/core';
import { CATEGORIAS } from '../../../core/constants/app.constants';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
  standalone: false
})
export class FilterBarComponent {
  // Importamos las categorías para llenar el menú desplegable automáticamente
  categorias = CATEGORIAS;

  // Variables que guardan lo que el usuario ha seleccionado
  searchText: string = '';
  tipoFilter: string = 'todos';
  categoriaFilter: string = 'todas';

  // @Output permite "gritarle" a la pantalla principal que los filtros cambiaron
  @Output() onSearch = new EventEmitter<string>();
  @Output() onTypeChange = new EventEmitter<string>();
  @Output() onCategoryChange = new EventEmitter<string>();

  buscar(event: any) {
    this.searchText = event.detail.value;
    this.onSearch.emit(this.searchText);
  }

  cambiarTipo(event: any) {
    this.tipoFilter = event.detail.value;
    this.onTypeChange.emit(this.tipoFilter);
  }

  cambiarCategoria(event: any) {
    this.categoriaFilter = event.detail.value;
    this.onCategoryChange.emit(this.categoriaFilter);
  }
}