import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { SyncLogComponent } from './sync-log.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [SyncLogComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  socialMedia = environment.socialMedia
}
