import { Component, HostListener, inject, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FullpageService } from '../../../core/services/fullpage.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  socialMedia = environment.socialMedia;
  fullPageService = inject(FullpageService);
  platformId = inject(PLATFORM_ID)
  isBrowser: boolean;
  windowWidth!: number;
  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId)
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (!this.isBrowser) return
    this.windowWidth = window.innerWidth;
  }
  ngOnInit() {
    if (!this.isBrowser) return
    this.windowWidth = window.innerWidth;
  }
}
