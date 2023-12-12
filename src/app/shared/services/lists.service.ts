import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fiche, FichesService } from './fiches.service';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  public currentUserLists: List[] = [];
  constructor(private http: HttpClient, private fichesService: FichesService) {}

  getCurrentUserList(): void {
    console.log(localStorage.getItem('user'));

    this.http
      .get<List[]>(
        `http://localhost:3000/lists?userId=${localStorage.getItem('user')}`
      )
      .subscribe((lists) => {
        this.currentUserLists = lists;
      });
  }
}

export type List = {
  id: number;
  title: string;
  userId: number;
  items: number[];
};
export type ListWithFiches = {
  id: number;
  title: string;
  userId: number;
  items: Fiche[];
};
