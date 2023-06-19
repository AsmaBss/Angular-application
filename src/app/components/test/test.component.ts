import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FieldConfig } from './field-config';
import { FieldType } from '../../form/field-type';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  form!: FormGroup;
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
  }
}
