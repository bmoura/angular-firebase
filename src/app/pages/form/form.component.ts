import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Person } from 'src/app/@core/models/person.model';
import { DbService } from 'src/app/@core/sevices/db.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public formPerson: FormGroup;
  public editPerson: Person;
  public isEdit = false;

  constructor(
    private fb: FormBuilder,
    private dbService: DbService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.edit(this.route.snapshot.params);
  }

  edit(params: any) {
    if (Object.keys(params).length) {
      this.isEdit = true;
      this.initForm(params);
    } else {
      this.initForm();
    }
  }

  initForm(params?: Person): void {
    this.formPerson = this.fb.group({
      key: params ? params.key : null,
      name: [params ? params.name : null, Validators.required],
      birthday: [params ? params.birthday : null, Validators.required],
      email: [params ? params.email : null, [Validators.required, Validators.email]],
    }, { updateOn: 'blur' });
  }

  onSubmit(): void {
    const person: Person = this.formPerson.value;
    if (this.formPerson.valid) {
      if (this.isEdit) {
        this.dbService.update(person, person.key)
          .catch((e: any) => this.onError(e));
        this.router.navigate(['']);
      } else {
        delete person.key;
        this.dbService.create(person)
          .catch((e: any) => this.onError(e));
        this.router.navigate(['']);
      }
    }
  }

  onError(e: any) {
    console.log(e);
  }
}
