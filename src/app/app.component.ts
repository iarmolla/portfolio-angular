import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutComponent } from "./components/about/about.component";
import { SkillsComponent } from "./components/skills/skills.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ProjectListComponent } from "./components/project-list/project-list.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AboutComponent, SkillsComponent, NavbarComponent, ProjectListComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'portfolio';

  constructor() {

  }
}
