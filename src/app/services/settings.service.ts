import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  // LEO EL LOCALSTORAGE QUE ESTA EN ACCOUNT-SETTINGS.TS
  public linkTheme = document.querySelector('#theme')
  constructor() {

    const url = localStorage.getItem('theme',) || "./assets/css/colors/default-dark.css";
    this.linkTheme?.setAttribute('href', url)
  }

  changeTheme(theme: string) {
    // console.log(theme);
    const url = `./assets/css/colors/${theme}.css`
    this.linkTheme?.setAttribute('href', url)

    //guaradar el tema cuando recargue
    localStorage.setItem('theme', url);

    this.checkCurrentTime();
  }

  checkCurrentTime() {
    const links = document.querySelectorAll('.selector')
    links.forEach((elem) => {
      elem.classList.remove('working')

      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`
      const currentTime = this.linkTheme?.getAttribute('href');

      if (btnThemeUrl === currentTime) {
        elem.classList.add('working');
      }
    })

  }
}
