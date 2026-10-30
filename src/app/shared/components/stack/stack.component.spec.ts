import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackComponent } from './stack.component';

describe('StackComponent', () => {
  let component: StackComponent;
  let fixture: ComponentFixture<StackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const row = (name: string) => component.groups.flatMap((group) => group.rows).find((item) => item.name == name)!;

  it('should order workplace columns chronologically and end with personal projects', () => {
    expect(component.columns.map((column) => column.label)).toEqual(['NoCountry', 'Eurekaplicaciones', 'DSN', 'Nubceo', 'Proyectos']);
    expect(component.columns[3].period).toBe('2025–hoy');
  });

  it('should mark PHP / Laravel only at Eurekaplicaciones', () => {
    expect(component.usedIn(row('PHP / Laravel'))).toEqual(['Eurekaplicaciones']);
  });

  it('should list the jobs and projects that used each database', () => {
    expect(component.usedIn(row('PostgreSQL'))).toEqual(['DSN', 'Nubceo']);
    expect(row('MySQL').cells[4]).toEqual(['Dashboard']);
  });

  it('should render one row per technology in the matrix', () => {
    const rows = (fixture.nativeElement as HTMLElement).querySelectorAll('.stack-row');
    expect(rows.length).toBe(component.groups.flatMap((group) => group.rows).length);
  });
});
