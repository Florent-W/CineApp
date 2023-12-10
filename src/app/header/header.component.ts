import { Component } from '@angular/core';
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  dropdownOpen = false;  

  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout();
  }

  get isUserConnected() {
    return this.authService.isUserConnected();
  }

  get getUsername() {
    return this.authService.user?.username || '';
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }  
}
