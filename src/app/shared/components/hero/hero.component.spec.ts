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

  it('should type the name with the cursor moving to the second line', () => {
    // Fixed rhythm: every keystroke takes exactly 115ms
    spyOn(Math, 'random').and.returnValue(0.5);
    jasmine.clock().install();
    component.type();
    expect(component.nameLines()).toEqual(['', '']);
    expect(component.cursorLine()).toBe(0);

    // "Iván" ends at 350 + 3 × 115 = 695ms; "A" waits for the 280ms pause between words
    jasmine.clock().tick(900);
    expect(component.nameLines()).toEqual(['Iván', '']);
    expect(component.cursorLine()).toBe(0);

    jasmine.clock().tick(900);
    expect(component.nameLines()).toEqual(['Iván', 'Armolla']);
    expect(component.cursorLine()).toBe(1);
    expect(component.typing()).toBeFalse();
    jasmine.clock().uninstall();
  });
});
