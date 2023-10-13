import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Input() 'title': string;
  @Input() data: any[] = [];
  @Output() selectedCategory = new EventEmitter();
  constructor() {}
  detectChanges(event: any) {
    this.selectedCategory.emit(event);
  }
}
