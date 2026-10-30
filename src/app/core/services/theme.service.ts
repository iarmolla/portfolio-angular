import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

const STORAGE_KEY = 'theme'
const REVEAL_MS = 500

// View Transitions API (not yet in this TypeScript version's DOM types)
interface ViewTransition {
  ready: Promise<void>,
  finished: Promise<void>
}
type ViewTransitionDocument = Document & { startViewTransition?: (update: () => void) => ViewTransition }

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  platformId = inject(PLATFORM_ID)
  isDark = signal(true)
  constructor() {
    if (!isPlatformBrowser(this.platformId)) return
    // Dark is the default; the inline script in index.html already applied a saved light choice
    this.isDark.set(document.documentElement.classList.contains('dark'))
  }
  toggle(event?: MouseEvent) {
    const dark = !this.isDark()
    try {
      localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
    } catch { }
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!event || reduceMotion || !(document as ViewTransitionDocument).startViewTransition) {
      this.apply(dark)
      return
    }
    this.reveal(dark, this.origin(event))
  }
  apply(dark: boolean) {
    this.isDark.set(dark)
    document.documentElement.classList.toggle('dark', dark)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0b1226' : '#eef2f8')
  }
  // Expands the new theme as a circle from the toggle button
  private reveal(dark: boolean, { x, y }: { x: number, y: number }) {
    const root = document.documentElement
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    root.classList.add('theme-switching')
    const transition = (document as ViewTransitionDocument).startViewTransition!(() => this.apply(dark))
    transition.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: REVEAL_MS, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', pseudoElement: '::view-transition-new(root)' }
      )
    }).catch(() => { })
    transition.finished.finally(() => root.classList.remove('theme-switching'))
  }
  private origin(event: MouseEvent): { x: number, y: number } {
    // Keyboard activation reports 0,0, so fall back to the button's center
    if (event.detail === 0 && event.currentTarget instanceof Element) {
      const rect = event.currentTarget.getBoundingClientRect()
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    }
    return { x: event.clientX, y: event.clientY }
  }
}
