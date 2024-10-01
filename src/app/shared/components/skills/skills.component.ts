import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../../core/services/projects.service';
@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  projectService = inject(ProjectsService)
  randomProject(tech: string): void {  
    let projects = this.projectService.projects.sort(() => Math.random() - 0.5)
    projects.forEach((project) => {
      const stack = project.stack.find((stack) => stack.toLowerCase() == tech.toLowerCase())
      if(stack) {
        window.open(project.link, '_blank')
      }
    })
  }
}
