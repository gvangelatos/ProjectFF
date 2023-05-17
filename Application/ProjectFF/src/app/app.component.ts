import { Component, Inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DarkModeService } from './services/dark-mode/dark-mode.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule],
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private darkModeService: DarkModeService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('darkMode')) {
      this.darkModeService.isDarkMode =
        localStorage.getItem('darkMode') === 'true';
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.darkModeService.isDarkMode = true;
    } else {
      this.darkModeService.isDarkMode = false;
    }
  }

  onLogout() {}
}
