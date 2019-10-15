import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import { FormService } from '../../../services/FormService';
import { Messages } from '../../../enums/Messages';
import Swal from 'sweetalert2';
	
import { EmployeeService } from '../../../services/Masters/Employee.service';import { Employee } from '../../../models/Masters/Employee';

import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';
	
	@Component({
	    selector: 'app-employee',
	    templateUrl: './Employee.component.html',
	    styleUrls: ['./Employee.component.scss']
	})
export class EmployeeComponent implements OnInit {
	public 	myForm: FormGroup;
	public 	Employee: any;
    
		constructor(
	
    private _EmployeeService: EmployeeService,
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
			Name: ['', Validators.required], 
			Mobile: [''], 
			ViberNo: [''], 
			WhatsAppNo: [''], 
			IDNo: [''], 
			Email: [''], 
			Address: [''], 
		});
	}
	fillForm(_Employee: Employee) {
		
		this.myForm.reset();
		
		this.myForm.patchValue({
		    PersonID: _Employee.PersonID,
		    Code: _Employee.Code , 
		    Name: _Employee.Name , 
		    Mobile: _Employee.Mobile , 
		    ViberNo: _Employee.ViberNo , 
		    WhatsAppNo: _Employee.WhatsAppNo , 
		    IDNo: _Employee.IDNo , 
		    Email: _Employee.Email , 
		    Address: _Employee.Address , 
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
				this.Employee = new Employee();
				const Id: number = params.id as number;
				this.getById(Id);
			});
	

		}
		
		getById(Id: number) {
	
			this._EmployeeService.GetEmployee(Id).subscribe(res => {
				if (res === null) {
					this.Employee = null;
				} else {
					this.Employee = null;
					this.Employee = res;
					this.fillForm(this.Employee);
				}
			});

		}
		
		New() {
			this.Employee = new Employee();
			this.myForm.reset();
		}
		
		Save() {
			if (this.myForm.valid) {
				this.Employee = this.myForm.value;
				this.Employee.XObjectTypeID = XObjectTypeEnum.Employee;
				this._EmployeeService.AddEmployee(this.Employee)
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
				this.Employee = this.myForm.value;
				this.Employee.XObjectTypeID = XObjectTypeEnum.Employee;
				this._EmployeeService.UpdateEmployee(this.Employee)
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
				this._EmployeeService.DeleteEmployee(this.Employee.ID).subscribe(res => {
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
