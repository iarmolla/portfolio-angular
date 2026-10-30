import { Component, inject } from '@angular/core';
import { ProjectsService } from '../../../core/services/projects.service';
import { ExperienceService } from '../../../core/services/experience.service';
import { StackItem } from '../../../core/interfaces/Technology';
import { RevealDirective } from '../../directives/reveal.directive';

interface StackColumn {
  label: string,
  period: string,
  entries: { name: string, stack: string[] }[]
}

interface StackRow {
  name: string,
  // For each column, the jobs or projects where the technology was used
  cells: string[][]
}

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './stack.component.html',
  styleUrl: './stack.component.css'
})
export class StackComponent {
  projectService = inject(ProjectsService)
  experienceService = inject(ExperienceService)
  columns: StackColumn[] = [
    ...this.experienceService.timeline
      .filter((item) => item.type == 'work')
      .reverse()
      .map((item) => ({
        label: item.shortPlace ?? item.place,
        period: this.period(item.start, item.current ? undefined : item.end),
        entries: [{ name: item.place, stack: item.stack }]
      })),
    {
      label: 'Proyectos',
      period: 'personales',
      entries: this.projectService.projects.map((project) => ({ name: project.title, stack: project.stack }))
    }
  ]
  groups = this.projectService.stack.map((group) => ({
    title: group.title,
    rows: group.items.map((item) => this.row(item))
  }))
  row(item: StackItem): StackRow {
    const uses = (stack: string[]) => stack.some((tech) => item.aliases.includes(tech.toLowerCase()))
    return {
      name: item.name,
      cells: this.columns.map((column) => column.entries.filter((entry) => uses(entry.stack)).map((entry) => entry.name))
    }
  }
  usedIn(row: StackRow): string[] {
    return row.cells.flatMap((names, i) => names.length ? [this.columns[i].label] : [])
  }
  private period(start: string, end?: string): string {
    const from = start.slice(-4)
    if (!end) return `${from}–hoy`
    const to = end.slice(-4)
    return from == to ? from : `${from}–${to.slice(2)}`
  }
}
