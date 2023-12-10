import { Component } from '@angular/core';
import { AuthService } from '../../app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent {
  pseudo: string | undefined;
  imageUrl: string | undefined;
  email: string | undefined;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isUserConnected()) {
      this.pseudo = this.authService.user?.username;
      this.imageUrl = this.authService.user?.imageUrl;
      this.email = this.authService.user?.email;
      console.log(this.authService)
    }
   };  
  }
