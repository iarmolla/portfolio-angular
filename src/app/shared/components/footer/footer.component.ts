import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="border-t border-line">
      <div class="wrap py-8 flex flex-col sm:flex-row justify-between gap-2 font-mono text-xs text-muted">
        <span>© {{ year }} Iván Armolla</span>
        <a href="#inicio" class="hover:text-fg transition-colors">Volver arriba ↑</a>
      </div>
    </footer>
  `
})
export class FooterComponent {
  year = new Date().getFullYear()
}
