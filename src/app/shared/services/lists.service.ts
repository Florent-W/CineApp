import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fiche } from './fiches.service';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  public currentUserLists: List[] = [];
  constructor(private http: HttpClient) {}

  public getCurrentUserList() {
    return this.http
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
    return this.http
      .patch(`http://localhost:3000/lists/${data.id}`, data)
      .subscribe();
  }

  public deleteList(id: number) {
    return this.http.delete(`http://localhost:3000/lists/${id}`).subscribe();
  }

  bulkUpdateList(listToUpdate: List[]): Observable<any[]> {
    return forkJoin(listToUpdate.map((list) => this.updateList(list)));
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
