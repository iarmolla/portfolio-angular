import { Directive, ElementRef, EventEmitter, inject, NgZone, OnDestroy, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements OnInit, OnDestroy {
  @Output() revealed = new EventEmitter<void>()
  element = inject(ElementRef<HTMLElement>)
  platformId = inject(PLATFORM_ID)
  zone = inject(NgZone)
  observer?: IntersectionObserver
  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return
    if (typeof IntersectionObserver === 'undefined') {
      this.reveal()
      return
    }
    this.observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        this.reveal()
        this.observer?.disconnect()
      }
    // Reveal as soon as the element's top edge crosses 92% of the viewport, whatever its height
    }, { threshold: 0, rootMargin: '0px 0px -8% 0px' })
    this.observer.observe(this.element.nativeElement)
  }
  reveal() {
    this.element.nativeElement.classList.add('is-visible')
    // IntersectionObserver callbacks run outside Angular's zone
    this.zone.run(() => this.revealed.emit())
  }
  ngOnDestroy() {
    this.observer?.disconnect()
  }
}
