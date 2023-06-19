import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FieldType } from '../../form/field-type';
import { FieldConfig } from '../test/field-config';
import { TextElement } from 'src/app/form/text-element';
import { NoteElement } from 'src/app/form/note-element';
import { NumberElement } from 'src/app/form/number-element';
import { ImageElement } from 'src/app/form/image-element';
import { FormService } from 'src/app/services/form.service';
import { Form } from 'src/app/models/form';
//fieldTypeOptions = Object.values(FieldType);

@Component({
  selector: 'app-test',
  templateUrl: './form-test.component.html',
  styleUrls: ['./form-test.component.css'],
})
export class FormTestComponent implements OnInit {
  dynamicForm!: FormGroup;
  submitted = false;

  dynamicForm2!: FormGroup;
  fieldTypeOptions = Object.values(FieldType);
  selectedFieldType!: string;

  constructor(
    private formBuilder2: FormBuilder,
    private formService: FormService
  ) {}

  ngOnInit() {
    this.dynamicForm2 = this.formBuilder2.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      fields: new FormArray([]),
    });
  }

  get f2() {
    return this.dynamicForm2.controls;
  }
  get t2() {
    return this.f2['fields'] as FormArray;
  }
  get ticketFormGroups2() {
    return this.t2.controls as FormGroup[];
  }

  onChangeTickets2(e: any) {
    console.log('click', e);

    if (['text', 'chiffre', 'note'].includes(e)) {
      this.t2.push(
        this.formBuilder2.group({
          label: ['', Validators.required],
          placeholder: ['', [Validators.required]],
          required: [, [Validators.required]],
          type: e,
        })
      );
    } else if (e === 'date') {
      this.t2.push(
        this.formBuilder2.group({
          label: ['', Validators.required],
          required: ['false', [Validators.required]],
          type: e,
        })
      );
    }
  }

  updateRequiredValue(checkboxControl: any) {
    checkboxControl.setValue(checkboxControl.value ? false : true);
  }

  onSubmit2() {
    this.submitted = true;
    alert(
      'SUCCESS!! :-)\n\n' + JSON.stringify(this.dynamicForm2.value, null, 4)
    );
    let form: Form = new Form();
    form.titre = this.dynamicForm2.value.titre;
    form.description = this.dynamicForm2.value.description;
    form.fields = JSON.stringify(this.dynamicForm2.value.fields);
    this.formService.add(form).subscribe(
      (data) => {
        console.log('succes', data);
      },
      (error) => {
        console.log('failed', error);
      }
    );
  }

  onReset() {
    // reset whole form back to initial state
    this.submitted = false;
    this.dynamicForm2.reset();
    this.t2.clear();
  }

  onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.t2.reset();
  }
}
/*
  text1: any = {};
  text2: any = {};
  number: any = {};

  convertToJson() {
    const formData = {
      text1: this.text1,
      text2: this.text2,
      number: this.number,
    };

    const jsonData = JSON.stringify(formData);
    console.log(jsonData); // You can do whatever you want with the JSON data
  }*/
