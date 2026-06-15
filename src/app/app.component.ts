import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isDarkMode = false;
  showScrollTop = false;

  ngOnInit() {
    this.onScroll();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('dark-theme');
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.showScrollTop = window.scrollY > 300;

    const sections = ['about', 'skills', 'projects', 'contact'];
    let currentSection = '';
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        const top = element.offsetTop - 200;

        if (window.scrollY >= top) {
          currentSection = section;
        }
      }
    });

    const bottomReached =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 50;

    if (bottomReached) {
      currentSection = 'contact';
    }

    document
      .querySelectorAll('.nav-links a')
      .forEach(link => link.classList.remove('active'));

    if (currentSection) {
      document
        .getElementById(`${currentSection}-link`)
        ?.classList.add('active');
    }
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}