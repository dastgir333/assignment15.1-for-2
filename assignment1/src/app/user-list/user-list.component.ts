import { Component, OnInit, trigger, state, animate, transition, style } from '@angular/core';
import { ListService } from 'app/service/list.service';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  animations: [
    trigger('userState',
      [
        state('active', style({
        backgroundColor: '#cfd8dc'
      }))
      ]
    )]
})
export class UserListComponent implements OnInit {

  arrayList: Observable<any[]>;

  searchData: string;

  constructor(private _listService: ListService) { }

  ngOnInit() {
    this.searchData = '';
    this.arrayList = this._listService.getUserList();
  }

  deleteData(userId) {
    this._listService.deleteUser(userId).subscribe(data => {
      /**Using 3rd party library to show message. */
      this.arrayList = this._listService.getUserList();
    },
      error => console.log(error));
  }
}
