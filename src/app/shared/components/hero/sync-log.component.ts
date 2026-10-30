import { afterNextRender, Component, OnDestroy, signal } from '@angular/core';

interface LogLine {
  kind: 'command' | 'step' | 'done',
  text: string
}

const TYPE_MS = 38
const STEP_MS = 650
// Each step "works" with a spinner before resolving to ok
const PENDING_MS = 520
const RESOLVE_MS = 220
const RESTART_MS = 4500
// On load, wait for the hero name to finish typing so both animations don't compete
const FIRST_RUN_DELAY_MS = 2000

@Component({
  selector: 'app-sync-log',
  standalone: true,
  templateUrl: './sync-log.component.html',
  styleUrl: './sync-log.component.css'
})
export class SyncLogComponent implements OnDestroy {
  lines: LogLine[] = [
    { kind: 'command', text: `connector sync --period=${this.currentPeriod()}` },
    { kind: 'step', text: 'descargando liquidaciones vía SFTP' },
    { kind: 'step', text: '1.284 transacciones normalizadas' },
    { kind: 'step', text: 'ventas vs. liquidaciones: 0 diferencias' },
    { kind: 'done', text: 'sincronización completa en 4.2s' },
  ]
  // How many lines are fully shown, and the partially typed command
  shown = signal(this.lines.length)
  typed = signal(this.lines[0].text)
  running = signal(false)
  pending = signal(-1)
  timer?: ReturnType<typeof setTimeout>
  constructor() {
    afterNextRender(() => {
      const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      if (!reduceMotion) this.play(FIRST_RUN_DELAY_MS)
    })
  }
  // Clears the terminal right away and starts typing after the delay
  play(delay = 0) {
    this.running.set(true)
    this.shown.set(0)
    this.typed.set('')
    this.timer = setTimeout(() => this.typeCommand(0), delay)
  }
  typeCommand(chars: number) {
    const command = this.lines[0].text
    this.typed.set(command.slice(0, chars))
    if (chars < command.length) {
      this.timer = setTimeout(() => this.typeCommand(chars + 1), TYPE_MS)
      return
    }
    this.shown.set(1)
    this.timer = setTimeout(() => this.showNext(2), STEP_MS)
  }
  showNext(count: number) {
    this.shown.set(count)
    const index = count - 1
    if (this.lines[index].kind != 'step') {
      this.finish()
      return
    }
    this.pending.set(index)
    this.timer = setTimeout(() => {
      this.pending.set(-1)
      this.timer = setTimeout(() => this.showNext(count + 1), RESOLVE_MS)
    }, PENDING_MS)
  }
  finish() {
    this.running.set(false)
    this.timer = setTimeout(() => this.play(), RESTART_MS)
  }
  currentPeriod(): string {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  }
  ngOnDestroy() {
    clearTimeout(this.timer)
  }
}
