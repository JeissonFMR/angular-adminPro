import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  manuItems: any;
  constructor(private sidebarService: SidebarService) {
    this.manuItems = sidebarService.menu
    console.log(this.manuItems);
  }
}
