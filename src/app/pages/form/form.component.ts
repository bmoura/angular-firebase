import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Person } from 'src/app/@core/models/person.model';
import { DbService } from 'src/app/@core/sevices/db.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public formPerson: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dbService: DbService 
  ) { }

  ngOnInit(): void {
    this.initForm();
  }


  initForm(): void {
    this.formPerson = this.fb.group({
      name: ['', Validators.required],
      birthday: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.formPerson.valid){
      const person: Person = this.formPerson.value;
      this.dbService.create(person);
      this.formPerson.reset();
    }
  }
}
