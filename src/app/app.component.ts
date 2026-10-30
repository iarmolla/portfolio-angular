import { Component } from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HeroComponent } from './shared/components/hero/hero.component';
import { AboutComponent } from './shared/components/about/about.component';
import { ExperienceComponent } from './shared/components/experience/experience.component';
import { StackComponent } from './shared/components/stack/stack.component';
import { ProjectListComponent } from './shared/components/project-list/project-list.component';
import { ContactComponent } from './shared/components/contact/contact.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, HeroComponent, AboutComponent, ExperienceComponent, StackComponent, ProjectListComponent, ContactComponent, FooterComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'portfolio';
}
