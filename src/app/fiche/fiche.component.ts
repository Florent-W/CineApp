import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FichesService } from '../shared/services/fiches.service';

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.scss']
})
export class FicheComponent {
  fiche: any;

  constructor(
    private route: ActivatedRoute,
    private fichesService: FichesService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const idFiche = +params['idFiche']; 
      if (idFiche) {
        this.fichesService.getFicheById(idFiche).subscribe(fiche => {
          this.fiche = fiche;
          console.log(this.fiche);
        },
        error => {
          console.error('Erreur sur la fiche :', error);
        });
      }
    });
  }
}
