import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent {

  public linkTheme = document.querySelector('#theme')

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.settingsService.checkCurrentTime()
  }


  changeTheme(theme: string) {
    this.settingsService.changeTheme(theme);
  }




}
