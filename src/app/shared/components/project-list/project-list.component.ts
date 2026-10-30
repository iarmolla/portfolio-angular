import { Component, inject } from '@angular/core';
import { ProjectsService } from '../../../core/services/projects.service';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {
  projectService = inject(ProjectsService)
  domain(link: string): string {
    return new URL(link).hostname
  }
}
