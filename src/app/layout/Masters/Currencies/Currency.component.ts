import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import { FormService } from '../../../services/FormService';
import { Messages } from '../../../enums/Messages';
import Swal from 'sweetalert2';
	
import { CurrencyService } from '../../../services/Masters/Currency.service';
import { Currency } from '../../../models/Masters/Currency';

import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';
	
	@Component({
	    selector: 'app-currency',
	    templateUrl: './Currency.component.html',
	    styleUrls: ['./Currency.component.scss']
	})
export class CurrencyComponent implements OnInit {
	public 	myForm: FormGroup;
	public 	Currency: any;
    
		constructor(
	
    private _CurrencyService: CurrencyService,
	public formBuilder: FormBuilder,
		private _FormService: FormService,
		private router: Router, 
		private route: ActivatedRoute,
		) { 
	
		}
    
	buildForm() {
		
		this.myForm = this.formBuilder.group({
			NamedObjectID: [''],
			Name: ['', Validators.required], 
			Code: [''], 
			Status: [''], 
			ChequeSellPrice: ['', Validators.required], 
			Symbole: ['', Validators.required], 
			CashBuyPrice: ['', Validators.required], 
			CashSellPrice: ['', Validators.required], 
			ChequeBuyPrice: ['', Validators.required], 
		});
	}
	fillForm(_Currency: Currency) {
		
		this.myForm.reset();
		
		this.myForm.patchValue({
		    NamedObjectID: _Currency.NamedObjectID,
		    Name: _Currency.Name , 
		    Code: _Currency.Code , 
		    Status: _Currency.Status , 
		    ChequeSellPrice: _Currency.ChequeSellPrice , 
		    Symbole: _Currency.Symbole , 
		    CashBuyPrice: _Currency.CashBuyPrice , 
		    CashSellPrice: _Currency.CashSellPrice , 
		    ChequeBuyPrice: _Currency.ChequeBuyPrice , 
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
				this.Currency = new Currency();
				const Id: number = params.id as number;
				this.getById(Id);
			});
	

		}
		
		getById(Id: number) {
	
			this._CurrencyService.GetCurrency(Id).subscribe(res => {
				if (res === null) {
					this.Currency = null;
				} else {
					this.Currency = null;
					this.Currency = res;
					this.fillForm(this.Currency);
				}
			});

		}
		
		New() {
			this.Currency = new Currency();
			this.myForm.reset();
		}
		
		Save() {
			if (this.myForm.valid) {
				this.Currency = this.myForm.value;
				this.Currency.XObjectTypeID = XObjectTypeEnum.Currency;
				this._CurrencyService.AddCurrency(this.Currency)
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
				this.Currency = this.myForm.value;
				this.Currency.XObjectTypeID = XObjectTypeEnum.Currency;
				this._CurrencyService.UpdateCurrency(this.Currency)
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
				this._CurrencyService.DeleteCurrency(this.Currency.ID).subscribe(res => {
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

