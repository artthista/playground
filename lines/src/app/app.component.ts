import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  simplificarFigura(event: Event): void {
    const document = (event.target as HTMLIFrameElement).contentDocument;
    if (!document) return;
    const style = document.createElement('style');
    style.textContent = `
      body { min-height: 100%; padding: 0; }
      main { width: 100%; max-width: none; }
      .plate { border: 0; border-radius: 0; }
      .tag, .controls, #means, #rules { display: none; }
    `;
    document.head.appendChild(style);
  }
}
