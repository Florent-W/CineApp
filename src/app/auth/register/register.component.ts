import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
      imageUrl: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.minLength(1)])
    }, { validators: this.checkPasswords });
  }

  addUser() {
    if (this.registerForm.invalid) return;
    this.authService.addUser({
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      imageUrl : this.registerForm.value.imageUrl,
      email: this.registerForm.value.email,
      statut: 'utilisateur'
    });
    this.router.navigate(['/login']);
  }

  private checkPasswords(control: FormGroup) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password?.value !== confirmPassword?.value ? { missMatch: true } : null;
  }

  get getErrorLabel() {
    if (this.registerForm.get('username')?.errors?.['required']) {
      return 'Le nom d\'utilisateur est obligatoire';
    }
    if (this.registerForm.get('password')?.errors?.['required']) {
      return 'Le mot de passe est obligatoire';
    }
    if (this.registerForm.get('password')?.errors?.['minlength']) {
      return `La longueur minimale pour votre mot de passe est ${this.registerForm.get('password')?.errors?.['minlength']?.requiredLength}`;
    }
    if (this.registerForm.get('confirmPassword')?.errors?.['required']) {
      return 'La confirmation du mot de passe est obligatoire';
    }
    if (this.registerForm.get('email')?.errors?.['required']) {
      return 'L\'email est obligatoire';
    }
    if (this.registerForm.get('email')?.errors?.['minlength']) {
      return `La longueur minimale pour votre email est ${this.registerForm.get('email')?.errors?.['minlength']?.requiredLength}`;
    } 
    if (this.registerForm.get('imageUrl')?.errors?.['required']) {
      return 'L\'URL de l\'image de profil est obligatoire';
    }
    if (this.registerForm.get('imageUrl')?.errors?.['minlength']) {
      return `La longueur minimale pour l\'URL de l'image de profil est ${this.registerForm.get('imageUrl')?.errors?.['minlength']?.requiredLength}`;
    }
    if (this.registerForm.errors?.['missMatch']) {
      return 'Les mots de passe ne correspondent pas';
    }
  
    // Message par défaut si aucune autre erreur n'est trouvée
    return 'Un problème est survenu';
  }
}
