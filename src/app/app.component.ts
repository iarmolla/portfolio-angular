import { Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutComponent } from './shared/components/about/about.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ProjectListComponent } from './shared/components/project-list/project-list.component';
import { SkillsComponent } from './shared/components/skills/skills.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { isPlatformBrowser } from '@angular/common';
import { FullpageService } from './core/services/fullpage.service';
import { Section } from './core/enums/Section';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AboutComponent, SkillsComponent, NavbarComponent, ProjectListComponent, ModalComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  section = Section
  title = 'portfolio';
  platformId = inject(PLATFORM_ID)
  fullPageService = inject(FullpageService)
  isBrowser: boolean;
  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId)
  }
  ngAfterViewInit() {
    if (!this.isBrowser) return
    this.fullPageService.showFullPage = window.innerWidth >= 1024
    if(this.fullPageService.showFullPage) {
      this.fullPageService.initialize()
    }
  }
}
