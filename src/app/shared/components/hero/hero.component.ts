import { afterNextRender, Component, OnDestroy, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { SyncLogComponent } from './sync-log.component';

const NAME = ['Iván', 'Armolla']
const GLYPHS = 'bcdeghknopqrsuxyz#%&$@'
const FRAME_MS = 45
const DECODE_MS = 1150
// Share of the decode spent only scrambling, while the hero fades in, before letters start resolving
const SCRAMBLE_ONLY = 0.35

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [SyncLogComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnDestroy {
  socialMedia = environment.socialMedia
  // Server render and reduced motion show the final name; the browser decodes it once on load
  nameLines = signal(NAME)
  timer?: ReturnType<typeof setTimeout>
  constructor() {
    afterNextRender(() => {
      const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      if (!reduceMotion) this.decode()
    })
  }
  // Letters cycle through random glyphs and resolve left to right into the name
  decode() {
    const total = NAME.join('').length
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      let index = 0
      this.nameLines.set(NAME.map((word) => [...word].map((char) => {
        const resolveAt = DECODE_MS * (SCRAMBLE_ONLY + (1 - SCRAMBLE_ONLY) * index++ / total)
        return elapsed >= resolveAt ? char : this.randomGlyph(char)
      }).join('')))
      if (elapsed < DECODE_MS) this.timer = setTimeout(tick, FRAME_MS)
    }
    tick()
  }
  private randomGlyph(char: string): string {
    const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
    return char === char.toUpperCase() ? glyph.toUpperCase() : glyph
  }
  ngOnDestroy() {
    clearTimeout(this.timer)
  }
}
