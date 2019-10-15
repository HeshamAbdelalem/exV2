import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import { FormService } from '../../../services/FormService';
import { Messages } from '../../../enums/Messages';
import Swal from 'sweetalert2';
	
import { CustomerService } from '../../../services/Masters/Customer.service';import { Customer } from '../../../models/Masters/Customer';

import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';
	
	@Component({
	    selector: 'app-customer',
	    templateUrl: './Customer.component.html',
	    styleUrls: ['./Customer.component.scss']
	})
export class CustomerComponent implements OnInit {
	public 	myForm: FormGroup;
	public 	Customer: any;
    
		constructor(
	
    private _CustomerService: CustomerService,
	public formBuilder: FormBuilder,
		private _FormService: FormService,
		private router: Router, 
		private route: ActivatedRoute,
		) { 
	
		}
    
	buildForm() {
		
		this.myForm = this.formBuilder.group({
			PersonID: [''],
			Name: ['', Validators.required], 
			Code: [''], 
			Email: [''], 
			Address: [''], 
			Mobile: ['', Validators.required], 
			IDNo: [''], 
			WhatsAppNo: ['', Validators.required], 
			ViberNo: [''], 
		});
	}
	fillForm(_Customer: Customer) {
		
		this.myForm.reset();
		
		this.myForm.patchValue({
		    PersonID: _Customer.PersonID,
		    Name: _Customer.Name , 
		    Code: _Customer.Code , 
		    Email: _Customer.Email , 
		    Address: _Customer.Address , 
		    Mobile: _Customer.Mobile , 
		    IDNo: _Customer.IDNo , 
		    WhatsAppNo: _Customer.WhatsAppNo , 
		    ViberNo: _Customer.ViberNo , 
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
				this.Customer = new Customer();
				const Id: number = params.id as number;
				this.getById(Id);
			});
	

		}
		
		getById(Id: number) {
	
			this._CustomerService.GetCustomer(Id).subscribe(res => {
				if (res === null) {
					this.Customer = null;
				} else {
					this.Customer = null;
					this.Customer = res;
					this.fillForm(this.Customer);
				}
			});

		}
		
		New() {
			this.Customer = new Customer();
			this.myForm.reset();
		}
		
		Save() {
			if (this.myForm.valid) {
				this.Customer = this.myForm.value;
				this.Customer.XObjectTypeID = XObjectTypeEnum.Customer;
				this._CustomerService.AddCustomer(this.Customer)
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
				this.Customer = this.myForm.value;
				this.Customer.XObjectTypeID = XObjectTypeEnum.Customer;
				this._CustomerService.UpdateCustomer(this.Customer)
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
				this._CustomerService.DeleteCustomer(this.Customer.ID).subscribe(res => {
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
