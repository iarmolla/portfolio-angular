import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    spyOn(window, 'matchMedia').and.returnValue({ matches: true } as MediaQueryList);
    await TestBed.configureTestingModule({
      imports: [HeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => component.ngOnDestroy());

  it('should render the full name for screen readers and without motion', () => {
    const h1 = (fixture.nativeElement as HTMLElement).querySelector('h1')!;
    expect(h1.querySelector('.sr-only')?.textContent).toBe('Iván Armolla');
    expect(component.nameLines()).toEqual(['Iván', 'Armolla']);
  });

  it('should scramble the name and resolve it after the decode', () => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2026, 0, 1));
    component.decode();
    expect(component.nameLines().join('')).not.toBe('IvánArmolla');

    jasmine.clock().tick(1250);
    expect(component.nameLines()).toEqual(['Iván', 'Armolla']);
    jasmine.clock().uninstall();
  });
});
