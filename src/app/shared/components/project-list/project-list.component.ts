import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../../core/services/projects.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {
  projectService = inject(ProjectsService)
}
