import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    spyOn(window, 'matchMedia').and.returnValue({ matches: true } as MediaQueryList);
    await TestBed.configureTestingModule({
      imports: [HeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    fixture.detectChanges();
  });

  it('should render the name with the decorative underscore hidden from screen readers', () => {
    const h1 = (fixture.nativeElement as HTMLElement).querySelector('h1')!;
    expect(h1.textContent).toContain('Armolla');
    expect(h1.querySelector('[aria-hidden="true"]')?.textContent).toBe('_');
  });
});
