import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe((response: any) => {
      if (response && response.length > 0) {
        this.authService.user = {
          id: response[0].id,
          username: response[0].username,
          imageUrl: response[0].imageUrl,
          email: response[0].email,
          statut: response[0].statut
        };
        this.authService.saveUser();
        this.router.navigate(['/']);
      } else {
        alert('Erreur dans le pseudo ou le mot de passe');
      }
    }, (error) => {
      alert('Erreur dans la requête');
    });
  }  
}
