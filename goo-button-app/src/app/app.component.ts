import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Ajuste o caminho de importação conforme a estrutura do seu projeto
import { GooFabComponent, GooFabOption } from './goo-fab/goo-fab.component';

import { BreathingGuideComponent } from './break/breathing-guide.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BreathingGuideComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // Defina as opções que quer passar para o botão
  minhasOpcoes: GooFabOption[] = [
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

  // Função que será chamada quando uma opção for selecionada
  lidarComSelecao(opcaoId: string) {
    if (opcaoId === 'insumo') {
      console.log('O utilizador escolheu Insumo! Abrir modal de insumo...');
      // Lógica para insumo
    } else if (opcaoId === 'servico') {
      console.log('O utilizador escolheu Serviço! Abrir modal de serviço...');
      // Lógica para serviço
    }
  }
}