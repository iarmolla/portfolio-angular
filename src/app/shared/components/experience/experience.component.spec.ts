import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceComponent } from './experience.component';

describe('ExperienceComponent', () => {
  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render every timeline item with a single current one', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.timeline-item').length).toBe(component.experienceService.timeline.length);
    expect(compiled.querySelectorAll('.timeline-item--current').length).toBe(1);
  });

  it('should count at least three years of experience', () => {
    expect(component.experienceService.yearsOfExperience).toBeGreaterThanOrEqual(3);
  });
});
