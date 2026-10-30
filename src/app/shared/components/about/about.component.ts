import { Component, inject } from '@angular/core';
import { ExperienceService } from '../../../core/services/experience.service';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  experienceService = inject(ExperienceService)
  facts = [
    { label: 'Actualmente', value: 'Backend en Nubceo' },
    { label: 'Experiencia', value: `+${this.experienceService.yearsOfExperience} años en la industria` },
    { label: 'Estudios', value: 'Lic. en Gestión de la Información (UNLZ)' },
    { label: 'Idiomas', value: 'Español nativo · Inglés técnico' },
  ]
}
