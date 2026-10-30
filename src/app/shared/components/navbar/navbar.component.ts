import { afterNextRender, Component, HostListener, inject, NgZone, OnDestroy, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { Section } from '../../../core/enums/Section';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnDestroy {
  themeService = inject(ThemeService)
  platformId = inject(PLATFORM_ID)
  zone = inject(NgZone)
  section = Section
  links = [
    { id: Section.EXPERIENCE, label: 'Experiencia' },
    { id: Section.STACK, label: 'Stack' },
    { id: Section.PROJECTS, label: 'Proyectos' },
  ]
  active = signal<string>(Section.INIT)
  scrolled = signal(false)
  menuOpen = signal(false)
  observer?: IntersectionObserver
  constructor() {
    // Runs only in the browser, once every section is in the DOM
    afterNextRender(() => this.observeSections())
  }
  observeSections() {
    if (typeof IntersectionObserver === 'undefined') return
    // A section counts as active while it crosses the middle band of the viewport
    this.observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting)
      if (visible) this.zone.run(() => this.active.set(visible.target.id))
    }, { rootMargin: '-45% 0px -50% 0px' })
    Object.values(Section).forEach((id) => {
      const element = document.getElementById(id)
      if (element) this.observer!.observe(element)
    })
    this.onScroll()
  }
  @HostListener('window:scroll')
  onScroll() {
    if (!isPlatformBrowser(this.platformId)) return
    this.scrolled.set(window.scrollY > 8)
  }
  toggleMenu() {
    this.menuOpen.update((open) => !open)
  }
  closeMenu() {
    this.menuOpen.set(false)
  }
  ngOnDestroy() {
    this.observer?.disconnect()
  }
}
