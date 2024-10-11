import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { ToggleComponent } from '@ngx-dark-mode-toggle/core';
import { FullpageService } from '../../../core/services/fullpage.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ToggleComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  showDarkMode: string = 'false'
  isBrowser: boolean = false
  platformId = inject(PLATFORM_ID)
  fullPageService = inject(FullpageService)
  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId)
  }
  ngOnInit() {
    if(!this.isBrowser) return
    this.getStorage()
  }
  getStorage() {
    const darkModeStorage = localStorage.getItem('darkModeEnabled')
    this.showDarkMode = darkModeStorage as unknown as string
  }
  openCv() {
    window.open('../../../../assets/ivanarmolla.pdf', '_blank')
  }
  darkMode() {
    const btn = document.querySelector("input[type='checkbox']") as HTMLElement
    if(btn) btn?.click()
    this.getStorage()
  }
}
