import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface GooFabOption {
  id: string;
  label: string;
  iconSvg: string;
}

@Component({
  selector: 'app-goo-fab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './goo-fab.component.html',
  styleUrls: ['./goo-fab.component.css']
})
export class GooFabComponent {
  open = false;

  // Agora o componente pode receber as opções de fora
  @Input() options: GooFabOption[] = [
    {
      id: 'insumo',
      label: 'insumo',
      iconSvg: 'M12 3 4 7v10l8 4 8-4V7z M4 7l8 4 8-4 M12 11v10'
    },
    {
      id: 'servico',
      label: 'serviço',
      iconSvg: 'M14.5 3.5a4.5 4.5 0 0 0-5.9 5.7L3.6 14.2a2 2 0 1 0 2.8 2.8l5-5a4.5 4.5 0 0 0 5.7-5.9l-2.6 2.6-2.1-2.1z M14.8 14.8 20 20'
    }
  ];

  @Output() optionSelected = new EventEmitter<string>();

  onCoreClick(event: Event) {
    event.stopPropagation();
    this.open = !this.open;
  }

  onOptionClick(event: Event, optionId: string) {
    event.stopPropagation();
    this.optionSelected.emit(optionId);
    this.open = false; // Fecha após selecionar
  }
}