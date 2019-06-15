import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/@core/models/person.model';
import { Observable } from 'rxjs';
import { DbService } from 'src/app/@core/sevices/db.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public peaple: Observable <Person[]>;

  constructor(
    private dbService: DbService
  ) { }

  ngOnInit() {
    this.getPeaple();
  }

  onClick(person: Person) {
    console.log(person)
  }

  getPeaple(): void {
    this.peaple = this.dbService.getAll();
  }

}
