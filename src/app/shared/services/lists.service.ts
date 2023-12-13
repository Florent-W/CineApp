import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fiche } from './fiches.service';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  public currentUserLists: List[] = [];
  constructor(private http: HttpClient) {}

  public getCurrentUserList(): void {
    this.http
      .get<List[]>(
        `http://localhost:3000/lists?userId=${localStorage.getItem('user')}`
      )
      .subscribe((lists) => {
        this.currentUserLists = lists;
      });
  }

  public addList(data: { title: string }) {
    console.log(data);
    return this.http.post<List>('http://localhost:3000/lists', {
      userId: +localStorage.getItem('user')!,
      title: data.title,
      items: [],
    });
  }

  public updateList(data: List) {
    return this.http.patch(`http://localhost:3000/lists/${data.id}`, data);
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
