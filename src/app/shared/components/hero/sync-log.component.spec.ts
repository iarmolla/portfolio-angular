import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncLogComponent } from './sync-log.component';

describe('SyncLogComponent', () => {
  let component: SyncLogComponent;
  let fixture: ComponentFixture<SyncLogComponent>;

  const create = () => {
    fixture = TestBed.createComponent(SyncLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  afterEach(() => component.ngOnDestroy());

  it('should show the complete log when the user prefers reduced motion', () => {
    spyOn(window, 'matchMedia').and.returnValue({ matches: true } as MediaQueryList);
    create();
    expect(component.running()).toBeFalse();
    expect(component.shown()).toBe(component.lines.length);
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('sincronización completa');
  });

  it('should type the command and reveal each step in order', () => {
    spyOn(window, 'matchMedia').and.returnValue({ matches: true } as MediaQueryList);
    create();
    jasmine.clock().install();
    component.play();
    expect(component.shown()).toBe(0);
    jasmine.clock().tick(component.lines[0].text.length * 38 + 10);
    expect(component.typed()).toBe(component.lines[0].text);
    expect(component.shown()).toBe(1);

    // First step shows a spinner, then resolves to ok
    jasmine.clock().tick(650);
    expect(component.shown()).toBe(2);
    expect(component.pending()).toBe(1);
    jasmine.clock().tick(520);
    expect(component.pending()).toBe(-1);

    jasmine.clock().tick(3000);
    expect(component.shown()).toBe(component.lines.length);
    expect(component.running()).toBeFalse();
    component.ngOnDestroy();
    jasmine.clock().uninstall();
  });

  it('should use the current year and month as the sync period', () => {
    spyOn(window, 'matchMedia').and.returnValue({ matches: true } as MediaQueryList);
    create();
    expect(component.lines[0].text).toContain(component.currentPeriod());
  });
});
