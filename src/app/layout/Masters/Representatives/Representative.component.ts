import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormService } from '../../../services/FormService';
import { Messages } from '../../../enums/Messages';
import Swal from 'sweetalert2';

import { RepresentativeService } from '../../../services/Masters/Representative.service';
import { Representative } from '../../../models/Masters/Representative';

import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';

@Component({
	selector: 'app-representative',
	templateUrl: './Representative.component.html',
	styleUrls: ['./Representative.component.scss']
})
export class RepresentativeComponent implements OnInit {
	public myForm: FormGroup;
	public Representative: any;

	constructor(

		private _RepresentativeService: RepresentativeService,
		public formBuilder: FormBuilder,
		private _FormService: FormService,
		private router: Router,
		private route: ActivatedRoute,
	) {

	}

	buildForm() {

		this.myForm = this.formBuilder.group({
			PersonID: [''],
			Code: [''],
			Status: [''],
			Name: ['', Validators.required],
			ViberNo: [''],
			WhatsAppNo: ['', Validators.required],
			IDNo: [''],
			Email: [''],
			Mobile: ['', Validators.required],
			Address: [''],
		});
	}
	fillForm(_Representative: Representative) {

		this.myForm.reset();

		this.myForm.patchValue({
			PersonID: _Representative.PersonID,
			Code: _Representative.Code,
			Status: _Representative.Status,
			Name: _Representative.Name,
			ViberNo: _Representative.ViberNo,
			WhatsAppNo: _Representative.WhatsAppNo,
			IDNo: _Representative.IDNo,
			Email: _Representative.Email,
			Mobile: _Representative.Mobile,
			Address: _Representative.Address,
		});

	}

	formArray(formArrayName: string): FormArray {
		return <FormArray>this.myForm.get(formArrayName);
	}

	formControl(formArrayName: string, formControlName: string, i: number): FormControl {
		return <FormControl>this.formArray(formArrayName).controls[i].get(formControlName);
	}

	initObject = (obj?: any): any => {
		if (obj === null || obj === undefined) {
			return {};
		} else {
			return obj;
		}
	}

	get(name: string): FormControl {
		return this.myForm.get(name) as FormControl;
	}

	ngOnInit() {

		this.buildForm();

		this.route.params.subscribe((params: Params) => {
			this.Representative = new Representative();
			const Id: number = params.id as number;
			this.getById(Id);
		});


	}

	getById(Id: number) {

		this._RepresentativeService.GetRepresentative(Id).subscribe(res => {
			if (res === null) {
				this.Representative = null;
			} else {
				this.Representative = null;
				this.Representative = res;
				this.fillForm(this.Representative);
			}
		});

	}

	New() {
		this.Representative = new Representative();
		this.myForm.reset();
	}

	Save() {
		if (this.myForm.valid) {
			this.Representative = this.myForm.value;
			this.Representative.XObjectTypeID = XObjectTypeEnum.Representative;
			this._RepresentativeService.AddRepresentative(this.Representative)
				.subscribe(res => {
					Messages.HandleResultViewModel(res);
					if (res.Success) {
						this.ngOnInit();
					}
				});
		} else {
			const errors = [];
			this._FormService.markFormGroupTouched(this.myForm, errors);
		}
	}

	Update() {
		if (this.myForm.valid) {
			this.Representative = this.myForm.value;
			this.Representative.XObjectTypeID = XObjectTypeEnum.Representative;
			this._RepresentativeService.UpdateRepresentative(this.Representative)
				.subscribe(res => {
					Messages.HandleResultViewModel(res);
					if (res.Success) {
						this.ngOnInit();
					}
				});
		} else {
			const errors = [];
			this._FormService.markFormGroupTouched(this.myForm, errors);
		}
	}

	Delete() {
		Swal.fire({
			title: Messages.DeleteConfirmation,
			text: Messages.DeleteWarning,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			cancelButtonText: 'لا',
			confirmButtonText: 'نعم'
		}).then((result) => {
			if (result.value) {
				this._RepresentativeService.DeleteRepresentative(this.Representative.ID).subscribe(res => {
					if (!res.Success) {
						Messages.ShowMessag(res.Message, 'error');
					} else {
						this.ngOnInit();
					}
				});
			}
		});
	}

} // the end :)

