import { Component, inject } from '@angular/core';
import { ExperienceService } from '../../../core/services/experience.service';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  experienceService = inject(ExperienceService)
}
