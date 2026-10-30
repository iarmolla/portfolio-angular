import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RevealDirective } from './reveal.directive';

@Component({
  standalone: true,
  imports: [RevealDirective],
  template: `<div appReveal (revealed)="revealed = true"></div>`
})
class HostComponent {
  revealed = false
}

describe('RevealDirective', () => {
  let callback: IntersectionObserverCallback;
  const original = window.IntersectionObserver;

  beforeEach(() => {
    window.IntersectionObserver = class {
      constructor(cb: IntersectionObserverCallback) { callback = cb; }
      observe() {}
      disconnect() {}
    } as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    window.IntersectionObserver = original;
  });

  it('should add is-visible and emit when the element intersects', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('div') as HTMLElement;
    expect(element.classList).not.toContain('is-visible');
    callback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    expect(element.classList).toContain('is-visible');
    expect(fixture.componentInstance.revealed).toBeTrue();
  });
});
