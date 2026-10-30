import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark the section crossing the viewport as active', () => {
    let callback!: IntersectionObserverCallback;
    const original = window.IntersectionObserver;
    window.IntersectionObserver = class {
      constructor(cb: IntersectionObserverCallback) { callback = cb; }
      observe() {}
      disconnect() {}
    } as unknown as typeof IntersectionObserver;
    const section = document.createElement('section');
    section.id = 'stack';
    document.body.appendChild(section);

    component.observeSections();
    callback([{ isIntersecting: true, target: section } as unknown as IntersectionObserverEntry], {} as IntersectionObserver);
    fixture.detectChanges();

    expect(component.active()).toBe('stack');
    expect((fixture.nativeElement as HTMLElement).querySelector('.nav-link.is-active')?.textContent).toContain('Stack');
    section.remove();
    window.IntersectionObserver = original;
  });
});
