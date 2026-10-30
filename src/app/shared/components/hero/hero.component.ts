import { afterNextRender, Component, computed, OnDestroy, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { SyncLogComponent } from './sync-log.component';

const NAME = ['Iván', 'Armolla']
const TOTAL_CHARS = NAME.join('').length
// Wait for the hero fade-in before typing; keystrokes vary around KEY_MS like a person typing
const START_MS = 350
const KEY_MS = 115
const WORD_PAUSE_MS = 280

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [SyncLogComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnDestroy {
  socialMedia = environment.socialMedia
  // Server render and reduced motion show the full name; the browser types it once on load
  typed = signal(TOTAL_CHARS)
  typing = signal(false)
  nameLines = computed(() => {
    let remaining = this.typed()
    return NAME.map((word) => {
      const part = word.slice(0, Math.max(0, remaining))
      remaining -= word.length
      return part
    })
  })
  // The underscore cursor stays on the first line until the second word starts
  cursorLine = computed(() => this.typing() && this.typed() <= NAME[0].length ? 0 : 1)
  timer?: ReturnType<typeof setTimeout>
  constructor() {
    afterNextRender(() => {
      const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      if (!reduceMotion) this.type()
    })
  }
  type() {
    this.typing.set(true)
    this.typed.set(0)
    const next = (count: number) => {
      this.typed.set(count)
      if (count >= TOTAL_CHARS) {
        this.typing.set(false)
        return
      }
      const endOfWord = count === NAME[0].length
      const delay = KEY_MS * (0.6 + Math.random() * 0.8) + (endOfWord ? WORD_PAUSE_MS : 0)
      this.timer = setTimeout(() => next(count + 1), delay)
    }
    this.timer = setTimeout(() => next(1), START_MS)
  }
  ngOnDestroy() {
    clearTimeout(this.timer)
  }
}
