import { Component } from '@angular/core';
import { SettingsService } from '../services/settings.service';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {


  constructor(private settingsService: SettingsService) { }

  ngOnInit() {

  }
}
