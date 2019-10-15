import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormService } from '../../../services/FormService';
import { Messages } from '../../../enums/Messages';
import Swal from 'sweetalert2';

import { CurrencyService } from '../../../services/Masters/Currency.service';
import { Currency } from '../../../models/Masters/Currency';
import { BankService } from '../../../services/Masters/Bank.service';
import { Bank } from '../../../models/Masters/Bank';
import { BankAccountService } from '../../../services/Configurations/BankAccount.service';
import { BankAccount } from '../../../models/Configurations/BankAccount';

import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
	selector: 'app-bankaccount',
	templateUrl: './BankAccount.component.html',
	styleUrls: ['./BankAccount.component.scss'],
	providers: [
		DatePipe,
		{ provide: MAT_DATE_LOCALE, useValue: 'ar-EG' },

		// The locale would typically be provided on the root module of your application. We do it at
		// the component level here, due to limitations of our example generation script.
		{ provide: MAT_DATE_LOCALE, useValue: 'ar-EG' },

		// `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
		// `MatMomentDateModule` in your applications root module. We provide it at the component level
		// here, due to limitations of our example generation script.
		{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
		{ provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
	]
})

export class BankAccountComponent implements OnInit {
	public myForm: FormGroup;
	public BankAccount: any;
	public BankList: any;
	public CurrencyList: any;

	constructor(
		private _CurrencyService: CurrencyService,
		private _BankService: BankService,
		private _BankAccountService: BankAccountService,
		public formBuilder: FormBuilder,
		private _FormService: FormService,
		private router: Router,
		private route: ActivatedRoute,
	) {

	}

	buildForm() {

		this.myForm = this.formBuilder.group({
			AccountID: [''],
			Status: [''],
			Notes: [''],
			BankID: [''],
			CurrencyID: [''],
			StartBalance: [''],
			StartDate: [''],
			Name: ['', Validators.required],
			Bank: ['', Validators.required],
			Currency: ['', Validators.required],
		});

		this.get('Bank').valueChanges.subscribe(value => {
			this.Bank_AutoComplete(value);
		});

		this.get('Currency').valueChanges.subscribe(value => {
			this.Currency_AutoComplete(value);
		});
	}
	
	fillForm(_BankAccount: BankAccount) {

		this.myForm.reset();

		this.myForm.patchValue({
			AccountID: _BankAccount.AccountID,
			Status: _BankAccount.Status,
			Notes: _BankAccount.Notes,
			BankID: _BankAccount.BankID,
			Bank: this.initObject(_BankAccount.Bank),
			CurrencyID: _BankAccount.CurrencyID,
			Currency: this.initObject(_BankAccount.Currency),
			StartBalance: _BankAccount.StartBalance,
			StartDate: _BankAccount.StartDate,
			Name: _BankAccount.Name,
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

	displayText(obj?: any): string | undefined {
		return obj ? obj.Name : undefined;
	}

	get(name: string): FormControl {
		return this.myForm.get(name) as FormControl;
	}

	ngOnInit() {

		this.buildForm();

		this.route.params.subscribe((params: Params) => {
			this.BankAccount = new BankAccount();
			const Id: number = params.id as number;
			this.getById(Id);
		});


	}

	getById(Id: number) {

		this._BankAccountService.GetBankAccount(Id).subscribe(res => {
			if (res === null) {
				this.BankAccount = null;
			} else {
				this.BankAccount = null;
				this.BankAccount = res;
				this.fillForm(this.BankAccount);
			}
		});

	}

	New() {
		this.BankAccount = new BankAccount();
		this.myForm.reset();
	}

	Save() {
		if (this.myForm.valid) {
			this.BankAccount = this.myForm.value;
			this.BankAccount.XObjectTypeID = XObjectTypeEnum.BankAccount;
			this._BankAccountService.AddBankAccount(this.BankAccount)
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
			this.BankAccount = this.myForm.value;
			this.BankAccount.XObjectTypeID = XObjectTypeEnum.BankAccount;
			this._BankAccountService.UpdateBankAccount(this.BankAccount)
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
				this._BankAccountService.DeleteBankAccount(this.BankAccount.ID).subscribe(res => {
					if (!res.Success) {
						Messages.ShowMessag(res.Message, 'error');
					} else {
						this.ngOnInit();
					}
				});
			}
		});
	}
	Bank_AutoComplete(name?: string) {
		this._BankService.Bank_Auto(name).subscribe(res => {
			this.BankList = res.Data;
		});
	}

	onBankChanged($event?: any) {
		if ($event) {
			const selected: any = $event.option.value;
			this.get('BankID').setValue(selected.ID);
		} else {
			this.get('Bank').setValue(null);
			this.get('BankID').setValue(null);
		}
	}

	Currency_AutoComplete(name?: string) {
		this._CurrencyService.Currency_Auto(name).subscribe(res => {
			this.CurrencyList = res.Data;
		});
	}

	onCurrencyChanged($event?: any) {
		if ($event) {
			const selected: any = $event.option.value;
			this.get('CurrencyID').setValue(selected.ID);
		} else {
			this.get('Currency').setValue(null);
			this.get('CurrencyID').setValue(null);
		}
	}


} // the end :)

