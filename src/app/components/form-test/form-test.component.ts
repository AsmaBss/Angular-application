import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldType } from '../../form/field-type';
import { FormService } from 'src/app/services/form.service';
import { Form } from 'src/app/models/form';
//fieldTypeOptions = Object.values(FieldType);

@Component({
  selector: 'app-test',
  templateUrl: './form-test.component.html',
  styleUrls: ['./form-test.component.css'],
})
export class FormTestComponent implements OnInit {
  submitted = false;

  dynamicForm1!: FormGroup;
  fieldTypeOptions = Object.values(FieldType);
  selectedFieldType!: string;

  constructor(
    private formBuilder1: FormBuilder,
    private formService: FormService
  ) {}

  ngOnInit() {
    this.dynamicForm1 = this.formBuilder1.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      fields: this.formBuilder1.array([]), //new FormArray([]),
    });
  }

  get f1() {
    return this.dynamicForm1.controls;
  }
  get t1() {
    return this.f1['fields'] as FormArray;
  }
  get fieldsFormGroups() {
    return this.t1.controls as FormGroup[];
  }
  //
  get t2() {
    return this.t1.at(this.t1.controls.length - 1).get('items') as FormArray;
  }
  get itemsFormGroups() {
    return this.t2.controls as FormGroup[];
  }

  getItemss(fieldIndex: number) {
    const fieldGroup = this.t1.at(fieldIndex) as FormGroup;
    return fieldGroup.get('items') as FormArray;
  }
  itemsFormGroupsForField(fieldIndex: number) {
    const fieldGroup = this.t1.at(fieldIndex) as FormGroup;
    const itemsArray = fieldGroup.get('items') as FormArray;
    return itemsArray.controls as FormGroup[];
  }

  getKeyByValue(value: string) {
    return Object.keys(FieldType).filter(
      (key) => FieldType[key as keyof typeof FieldType] === value
    )[0];
  }

  onChangeTickets2(e: any) {
    var key = this.getKeyByValue(e);
    if (['Text', 'Note'].includes(e)) {
      this.t1.push(
        this.formBuilder1.group({
          type: key,
          label: ['', Validators.required],
          placeholder: ['', [Validators.required]],
          value: ['', [Validators.required]],
          required: [, [Validators.required]],
        })
      );
    } else if (e === 'Date') {
      this.t1.push(
        this.formBuilder1.group({
          type: key,
          label: ['', Validators.required],
          required: ['false', [Validators.required]],
        })
      );
    } else if (e == 'Switch') {
      this.t1.push(
        this.formBuilder1.group({
          type: key,
          label: ['', Validators.required],
          value: ['', [Validators.required]],
          //required: [, [Validators.required]],
        })
      );
    } else if (['Radio', 'Checkbox', 'Select'].includes(e)) {
      this.t1.push(
        this.formBuilder1.group({
          type: key,
          label: ['', Validators.required],
          value: ['', Validators.required],
          items: this.formBuilder1.array([]),
        })
      );
    }
  }

  addItem(fieldIndex: number) {
    //this.t2.push(this.role());
    const itemsArray = this.t1.at(fieldIndex).get('items') as FormArray;
    itemsArray.push(this.role());
  }
  role() {
    return this.formBuilder1.group({
      label: ['', Validators.required],
      value: ['', Validators.required],
    });
  }
  /*remove(i: number): void {
    this.t2.removeAt(i);
  }*/
  remove(fieldIndex: number, itemIndex: number): void {
    const itemsArray = this.getItemss(fieldIndex);
    itemsArray.removeAt(itemIndex);
  }

  onSubmit2() {
    this.submitted = true;
    alert(
      'SUCCESS!! :-)\n\n' + JSON.stringify(this.dynamicForm1.value, null, 4)
    );
    let form: Form = new Form();
    form.titre = this.dynamicForm1.value.titre;
    form.description = this.dynamicForm1.value.description;
    form.fields = JSON.stringify(this.dynamicForm1.value.fields);
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
    this.dynamicForm1.reset();
    this.t1.clear();
  }

  onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.t1.reset();
  }
}
