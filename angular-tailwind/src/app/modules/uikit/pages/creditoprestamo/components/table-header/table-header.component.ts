import { Component, EventEmitter, Output } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: '[app-table-header]',
  imports: [AngularSvgIconModule],
  templateUrl: './table-header.component.html',
  styleUrl: './table-header.component.css',
})
export class TableHeaderComponent {
  @Output() onCheck = new EventEmitter<boolean>();

  
  onHeaderCheck(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.onCheck.emit(checked);
  }
}

