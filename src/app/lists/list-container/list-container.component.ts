import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListsService } from 'src/app/shared/services/lists.service';

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.scss'],
})
export class ListContainerComponent implements OnInit {
  constructor(private listsService: ListsService) {}

  ngOnInit(): void {
    this.listsService.getCurrentUserList();
  }

  get lists(): any {
    const currentUserLists = this.listsService.currentUserLists;
    return currentUserLists;
  }
}
