import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FichesService } from '../shared/services/fiches.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.scss'],
})
export class FicheComponent {
  fiche: any;

  ficheForm = this.fb.group({
    note: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
    commentaire: [''],
  });
  userId: number | undefined;

  notes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private fichesService: FichesService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = this.authService.user?.id!;

    this.route.params.subscribe((params) => {
      const idFiche = +params['idFiche'];
      if (idFiche) {
        this.fichesService.getFicheById(idFiche).subscribe(
          (fiche) => {
            this.fiche = fiche;
            console.log(this.fiche);
          },
          (error) => {
            console.error('Erreur sur la fiche :', error);
          }
        );

        this.fichesService.getNotesFiche(idFiche).subscribe((notes) => {
          this.notes = notes;
          console.log(this.notes);
          if (notes.some(note => note.idUtilisateur === this.userId)) {
            this.ficheForm.disable();
          }
        });
      }
    });
  }

  ajouterAvis() {
    if (this.ficheForm.valid && this.authService.isUserConnected()) {
      const note = parseInt(this.ficheForm.value.note!);
      const userId = this.userId!;
      const idFiche = this.fiche.id;
      const commentaire = this.ficheForm.value.commentaire!;

      console.log('Note:', note, 'Commentaire:', commentaire);
      this.fichesService
        .addNote(note, idFiche, userId, commentaire)
        .subscribe(
          (response) => {
            console.log('Note ajoutée avec succès', response);
            this.ficheForm.disable();
            this.fichesService.getNotesFiche(idFiche).subscribe((notesMisesAJour) => {
              this.notes = notesMisesAJour;
        });
      },
          (error) => {
            console.error("Erreur lors de l'ajout de la note", error);
          }
        );
    } else {
      console.log('Formulaire non valide');
    }
  }

  get getErrorLabel(): string {
    const noteErrors = this.ficheForm.get('note')?.errors;

    if (noteErrors) {
      if (noteErrors['required']) {
        return 'La note est requise.';
      }
      if (noteErrors['min']) {
        return 'La note doit être au moins de 1.';
      }
      if (noteErrors['max']) {
        return 'La note ne peut pas dépasser 5.';
      }
    }

    return "Une erreur inattendue s'est produite";
  }
}
