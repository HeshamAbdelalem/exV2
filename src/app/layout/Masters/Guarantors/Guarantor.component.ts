import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import { FormService } from '../../../services/FormService';
import { Messages } from '../../../enums/Messages';
import Swal from 'sweetalert2';
	
import { GuarantorService } from '../../../services/Masters/Guarantor.service';
import { Guarantor } from '../../../models/Masters/Guarantor';

import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';
	
	@Component({
	    selector: 'app-guarantor',
	    templateUrl: './Guarantor.component.html',
	    styleUrls: ['./Guarantor.component.scss']
	})
export class GuarantorComponent implements OnInit {
	public 	myForm: FormGroup;
	public 	Guarantor: any;
    
		constructor(
	
    private _GuarantorService: GuarantorService,
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
			WhatsAppNo: [''], 
			IDNo: [''], 
			Email: [''], 
			Mobile: ['', Validators.required], 
			Address: [''], 
		});
	}
	fillForm(_Guarantor: Guarantor) {
		
		this.myForm.reset();
		
		this.myForm.patchValue({
		    PersonID: _Guarantor.PersonID,
		    Code: _Guarantor.Code , 
		    Status: _Guarantor.Status , 
		    Name: _Guarantor.Name , 
		    ViberNo: _Guarantor.ViberNo , 
		    WhatsAppNo: _Guarantor.WhatsAppNo , 
		    IDNo: _Guarantor.IDNo , 
		    Email: _Guarantor.Email , 
		    Mobile: _Guarantor.Mobile , 
		    Address: _Guarantor.Address , 
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
				this.Guarantor = new Guarantor();
				const Id: number = params.id as number;
				this.getById(Id);
			});
	

		}
		
		getById(Id: number) {
	
			this._GuarantorService.GetGuarantor(Id).subscribe(res => {
				if (res === null) {
					this.Guarantor = null;
				} else {
					this.Guarantor = null;
					this.Guarantor = res;
					this.fillForm(this.Guarantor);
				}
			});

		}
		
		New() {
			this.Guarantor = new Guarantor();
			this.myForm.reset();
		}
		
		Save() {
			if (this.myForm.valid) {
				this.Guarantor = this.myForm.value;
				this.Guarantor.XObjectTypeID = XObjectTypeEnum.Guarantor;
				this._GuarantorService.AddGuarantor(this.Guarantor)
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
				this.Guarantor = this.myForm.value;
				this.Guarantor.XObjectTypeID = XObjectTypeEnum.Guarantor;
				this._GuarantorService.UpdateGuarantor(this.Guarantor)
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
				this._GuarantorService.DeleteGuarantor(this.Guarantor.ID).subscribe(res => {
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

