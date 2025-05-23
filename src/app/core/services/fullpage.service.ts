import { Injectable } from '@angular/core';
import { Section } from '../enums/Section';
declare var fullpage: any;
@Injectable({
  providedIn: 'root'
})
export class FullpageService {
  fpInstance: any
  showFullPage = false
  section = Section
  constructor() {}
  initialize() {
    if(this.fpInstance) {
      this.fpInstance.reBuild()
      this.removeOverflow()
      return
    }
    this.fpInstance = new fullpage('#fullpage', {
      anchors: [Section.INIT, Section.ABOUT, Section.SKILLS, Section.PROJECTS],
      autoScrolling: true,
      scrollHorizontally: true,
      navigation: true,
      navigationPosition: 'right'
    });
    this.removeOverflow()
  }
  removeOverflow() {
    const fp = document.querySelector("a[href='https://alvarotrigo.com/fullPage/']") as HTMLElement
    fp.style.display = 'none';
    (document.querySelector(".fp-overflow") as HTMLElement)?.classList?.remove('fp-overflow')
  }
  moveToSection(section: Section, width?: number): void {
    if(!this.fpInstance) {
      const element = document.getElementById(`${section}1`)  as HTMLElement
      element.scrollIntoView()
      return
    }
    this.fpInstance.moveTo(section);
  }
}
