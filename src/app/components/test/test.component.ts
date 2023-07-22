import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FieldConfig } from './field-config';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  ngOnInit(): void {}
  constructor(private fb: FormBuilder) {}
  form = this.fb.group({
    email: [
      '',
      {
        validators: [Validators.required, Validators.email],
      },
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
    roles: this.fb.array([]),
  });

  formValue(): void {
    console.log(this.form.value);
  }
  remove(i: number): void {
    this.rolesFieldAsFormArray.removeAt(i);
  }
  addControl(): void {
    this.rolesFieldAsFormArray.push(this.role());
  }
  role(): any {
    return this.fb.group({
      role: this.fb.control(''),
    });
  }
  get rolesFieldAsFormArray(): any {
    return this.form.get('roles') as FormArray;
  }
  /* form!: FormGroup;
  dynamicFormControls: FormControl[] = [];
  fieldConfigs: FieldConfig[] = [];
  fieldTypeOptions = ['text', 'note', 'chiffre', 'date', 'fichier', 'dropdown'];
  selectedFieldType!: string;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({});
  }

  addFormControl(fieldType: string) {
    const fieldConfig: FieldConfig = {
      type: fieldType,
      label: fieldType.charAt(0).toUpperCase() + fieldType.slice(1) + ' Field',
      name: fieldType + 'Field',
    };
    if (fieldType === 'text') {
      fieldConfig.validations = [{ type: 'required' }];
    } else if (fieldType === 'dropdown') {
      fieldConfig.options = ['Option 1', 'Option 2', 'Option 3'];
    }
    const newControl = new FormControl(
      '',
      this.mapValidations(fieldConfig.validations!)
    );
    this.dynamicFormControls.push(newControl);
    this.form.addControl(fieldConfig.name, newControl);
    this.fieldConfigs.push(fieldConfig);
  }

  removeFormControl(index: number) {
    const fieldName = this.fieldConfigs[index].name;
    this.form.removeControl(fieldName);
    this.dynamicFormControls.splice(index, 1);
    this.fieldConfigs.splice(index, 1);
  }

  mapValidations(validations: any[]): any {
    const formValidations: any = [];
    if (validations) {
      validations.forEach((validation) => {
        if (validation.type === 'required') {
          formValidations.push(Validators.required);
        }
        // Add more validation mappings based on your requirements
      });
    }
    return formValidations;
  }

  getFormData() {
    const formData: {
      fields: { label: string; type: string; name: string; value: any }[];
    } = {
      fields: [],
    };

    for (const config of this.fieldConfigs) {
      formData.fields.push({
        label: config.label,
        type: config.type,
        name: config.name,
        value: this.form.get(config.name)?.value,
      });
    }

    console.log(formData); // You can do further processing with the JSON data as needed
  }*/
}
