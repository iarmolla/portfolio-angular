import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutComponent } from './shared/components/about/about.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ProjectListComponent } from './shared/components/project-list/project-list.component';
import { SkillsComponent } from './shared/components/skills/skills.component';
import { ModalComponent } from './shared/components/modal/modal.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AboutComponent, SkillsComponent, NavbarComponent, ProjectListComponent, ModalComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'portfolio';

  constructor() {

  }
}
