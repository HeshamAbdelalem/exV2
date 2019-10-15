

import { FormGroup, FormArray, FormControl, ValidationErrors } from '@angular/forms';
import { Injectable } from "@angular/core";

@Injectable()
export class FormService {

	public myForm: FormGroup;

	constructor() { }


	public markFormGroupTouched(formGroup: FormGroup, errors) {

		// const errors = [];
		this.getFormValidationErrors(formGroup, errors);

		if (errors.length > 0) {
			console.log('errors: ', errors);
		}

		(<any>Object).values(formGroup.controls).forEach(control => {

			control.markAsTouched();

			if (control.controls) {
				this.markFormGroupTouched(control, errors);
			}

		});

	}

	public getFormValidationErrors(formGroup: FormGroup, errors) {

		// const result = [];

		Object.keys(formGroup.controls).forEach(key => {

			const controlErrors: ValidationErrors = formGroup.get(key).errors;

			if (controlErrors) {

				Object.keys(controlErrors).forEach(keyError => {

					errors.push({
						'control': key,
						'error': keyError,
						'value': controlErrors[keyError]
					});

				});

			}
		});

		// if (errors.length > 0) {
		// 	console.log('errors: ', errors);
		// }

		// return errors;

	}

	public formArray(formArrayName: string): FormArray {
		return <FormArray>this.myForm.get(formArrayName);
	}

	public formControl(formArrayName: string, formControlName: string, i: number): FormControl {
		return <FormControl>this.formArray(formArrayName).controls[i].get(formControlName);
	}

	public get(name: string): FormControl {
		return this.myForm.get(name) as FormControl;
	}
}
  
  

