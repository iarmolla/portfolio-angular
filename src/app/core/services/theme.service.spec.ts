import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    document.documentElement.classList.add('dark');
    localStorage.removeItem('theme');
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('theme');
  });

  it('should start in dark mode by default', () => {
    expect(service.isDark()).toBeTrue();
  });

  it('should toggle the dark class and remember the choice', () => {
    service.toggle();
    expect(service.isDark()).toBeFalse();
    expect(document.documentElement.classList).not.toContain('dark');
    expect(localStorage.getItem('theme')).toBe('light');

    service.toggle();
    expect(document.documentElement.classList).toContain('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});
