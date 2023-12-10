import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { FichesService } from "../fiches/fiches.service";
import { GenresService, TGenres } from "../genre/genres.service";

@Component({
  selector: "app-ajoutfiche",
  templateUrl: "./ajoutfiche.component.html",
  styleUrls: ["./ajoutfiche.component.scss"],
})
export class AjoutficheComponent implements OnInit, OnDestroy {
  ficheForm = new FormGroup({
    title: new FormControl("Le titre de ton film"),
    category: new FormControl("film"),
    duration: new FormControl(0),
    firstAired: new FormControl(""),
    genres: new FormControl([0]),
    platforms: new FormControl(""),
  });

  constructor(
    private genresService: GenresService,
    private fichesService: FichesService,
    @Inject(DOCUMENT) private document: Document
  ) {}
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }
  async ngOnInit(): Promise<void> {
    await this.genresService.getGenres();
  }

  onSubmit(): void {
    console.log(this.ficheForm.value);

    if (this.ficheForm.valid) {
      this.fichesService.addFiche(this.ficheForm.value as any);
      this.removeDomElement();
    }
  }

  private removeDomElement() {
    const appModal = this.document
      .querySelector("app-modal")
      ?.remove() as unknown as Element[];
    appModal?.forEach((appBar) => {
      const modalChild = appBar.querySelector("#modal-ajout-fiche");
      if (modalChild) {
        appBar.remove();
      }
    });
  }

  resetForm(): void {
    this.ficheForm.reset();
  }
  get genresContent(): TGenres[] {
    return this.genresService.genresContent;
  }
}
