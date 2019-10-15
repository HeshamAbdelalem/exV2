import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormService } from '../../../services/FormService';
import { Messages } from '../../../enums/Messages';
import Swal from 'sweetalert2';

import { AccountService } from '../../../services/GeneralLedger/Account.service';
import { Account } from '../../../models/GeneralLedger/Account';
import { CurrencyService } from '../../../services/Masters/Currency.service';
import { Currency } from '../../../models/Masters/Currency';
import { CurrencyTransferService } from '../../../services/MoneyTransfer/CurrencyTransfer.service';
import { CurrencyTransfer } from '../../../models/MoneyTransfer/CurrencyTransfer';
import { XCommissionTypeService } from '../../../services/Lookups/XCommissionType.service';
import { XCommissionType } from '../../../models/Lookups/XCommissionType';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';


import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';

@Component({
	selector: 'app-currencytransfer',
	templateUrl: './CurrencyTransfer.component.html',
	styleUrls: ['./CurrencyTransfer.component.scss'],

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
export class CurrencyTransferComponent implements OnInit {
	public myForm: FormGroup;
	public CurrencyTransfer: any;
	public CurrencyList: any;
	public SenderCurrencyList: any;
	public SenderXCommissionTypeList: any;
	public ReceiverAccountList: any;
	public ReceiverCurrencyList: any;
	public ReceiverXCommissionTypeList: any;
	public SenderAccountList: any;

	constructor(
		private _AccountService: AccountService,
		private _CurrencyService: CurrencyService,
		private _CurrencyTransferService: CurrencyTransferService,
		private _XCommissionTypeService: XCommissionTypeService,
		public formBuilder: FormBuilder,
		private _FormService: FormService,
		private router: Router,
		private route: ActivatedRoute,
	) {

	}
	
	ngAfterViewInit(): void {
		// this.TxtAmount.nativeElement.focus();
		document.getElementById('Amount').focus();
	}

	buildForm() {

		this.myForm = this.formBuilder.group({
			DocumentID: [''],
			DocumentNo: [''],
			Notes: [''],
			DocumentCode: [''],
			DocumentDate: [new Date(), Validators.required],
			Amount: ['', Validators.required],
			Price: ['', Validators.required],
			CurrencyID: [''],
			SenderCommission: ['', Validators.required],
			SenderCurrencyID: [''],
			SenderXCommissionTypeID: [''],
			ReceiverAccountID: [''],
			ReceiverCommission: ['', Validators.required],
			ReceiverCurrencyID: [''],
			ReceiverXCommissionTypeID: [''],
			SenderName: [''],
			ReceiverName: [''],
			SenderPhone: [''],
			ReceiverPhone: [''],
			Total: ['', Validators.required],
			SenderAccountID: [''],
			Currency: ['', Validators.required],
			SenderCurrency: ['', Validators.required],
			SenderXCommissionType: ['', Validators.required],
			ReceiverAccount: ['', Validators.required],
			ReceiverCurrency: ['', Validators.required],
			ReceiverXCommissionType: ['', Validators.required],
			SenderAccount: ['', Validators.required],
		});

		this.get('Currency').valueChanges.subscribe(value => {
			this.Currency_AutoComplete(value);
		});

		this.get('SenderCurrency').valueChanges.subscribe(value => {
			this.SenderCurrency_AutoComplete(value);
		});

		this.get('SenderXCommissionType').valueChanges.subscribe(value => {
			this.SenderXCommissionType_AutoComplete(value);
		});

		this.get('ReceiverAccount').valueChanges.subscribe(value => {
			this.ReceiverAccount_AutoComplete(value);
		});

		this.get('ReceiverCurrency').valueChanges.subscribe(value => {
			this.ReceiverCurrency_AutoComplete(value);
		});

		this.get('ReceiverXCommissionType').valueChanges.subscribe(value => {
			this.ReceiverXCommissionType_AutoComplete(value);
		});

		this.get('SenderAccount').valueChanges.subscribe(value => {
			this.SenderAccount_AutoComplete(value);
		});
	}

	fillForm(_CurrencyTransfer: CurrencyTransfer) {

		this.myForm.reset();

		this.myForm.patchValue({
			DocumentID: _CurrencyTransfer.DocumentID,
			DocumentNo: _CurrencyTransfer.DocumentNo,
			Notes: _CurrencyTransfer.Notes,
			DocumentCode: _CurrencyTransfer.DocumentCode,
			DocumentDate: _CurrencyTransfer.DocumentDate,
			Amount: _CurrencyTransfer.Amount,
			Price: _CurrencyTransfer.Price,
			CurrencyID: _CurrencyTransfer.CurrencyID,
			Currency: this.initObject(_CurrencyTransfer.Currency),
			SenderCommission: _CurrencyTransfer.SenderCommission,
			SenderCurrencyID: _CurrencyTransfer.SenderCurrencyID,
			SenderCurrency: this.initObject(_CurrencyTransfer.SenderCurrency),
			SenderXCommissionTypeID: _CurrencyTransfer.SenderXCommissionTypeID,
			SenderXCommissionType: this.initObject(_CurrencyTransfer.SenderXCommissionType),
			ReceiverAccountID: _CurrencyTransfer.ReceiverAccountID,
			ReceiverAccount: this.initObject(_CurrencyTransfer.ReceiverAccount),
			ReceiverCommission: _CurrencyTransfer.ReceiverCommission,
			ReceiverCurrencyID: _CurrencyTransfer.ReceiverCurrencyID,
			ReceiverCurrency: this.initObject(_CurrencyTransfer.ReceiverCurrency),
			ReceiverXCommissionTypeID: _CurrencyTransfer.ReceiverXCommissionTypeID,
			ReceiverXCommissionType: this.initObject(_CurrencyTransfer.ReceiverXCommissionType),
			SenderName: _CurrencyTransfer.SenderName,
			ReceiverName: _CurrencyTransfer.ReceiverName,
			SenderPhone: _CurrencyTransfer.SenderPhone,
			ReceiverPhone: _CurrencyTransfer.ReceiverPhone,
			Total: _CurrencyTransfer.Total,
			SenderAccountID: _CurrencyTransfer.SenderAccountID,
			SenderAccount: this.initObject(_CurrencyTransfer.SenderAccount),
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
			this.CurrencyTransfer = new CurrencyTransfer();
			const Id: number = params.id as number;
			this.getById(Id);
		});


	}

	getById(Id: number) {

		this._CurrencyTransferService.GetCurrencyTransfer(Id).subscribe(res => {
			if (res === null) {
				this.CurrencyTransfer = null;
			} else {
				this.CurrencyTransfer = null;
				this.CurrencyTransfer = res;
				this.fillForm(this.CurrencyTransfer);
			}
		});

	}

	New() {
		this.CurrencyTransfer = new CurrencyTransfer();
		this.myForm.reset();
	}

	Save() {
		if (this.myForm.valid) {
			this.CurrencyTransfer = this.myForm.value;
			this.CurrencyTransfer.XObjectTypeID = XObjectTypeEnum.CurrencyTransfer;
			this._CurrencyTransferService.AddCurrencyTransfer(this.CurrencyTransfer)
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
			this.CurrencyTransfer = this.myForm.value;
			this.CurrencyTransfer.XObjectTypeID = XObjectTypeEnum.CurrencyTransfer;
			this._CurrencyTransferService.UpdateCurrencyTransfer(this.CurrencyTransfer)
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
				this._CurrencyTransferService.DeleteCurrencyTransfer(this.CurrencyTransfer.ID).subscribe(res => {
					if (!res.Success) {
						Messages.ShowMessag(res.Message, 'error');
					} else {
						this.ngOnInit();
					}
				});
			}
		});
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

	SenderCurrency_AutoComplete(name?: string) {
		this._CurrencyService.Currency_Auto(name).subscribe(res => {
			this.SenderCurrencyList = res.Data;
		});
	}

	onSenderCurrencyChanged($event?: any) {
		if ($event) {
			const selected: any = $event.option.value;
			this.get('SenderCurrencyID').setValue(selected.ID);
		} else {
			this.get('SenderCurrency').setValue(null);
			this.get('SenderCurrencyID').setValue(null);
		}
	}

	SenderXCommissionType_AutoComplete(name?: string) {
		this._XCommissionTypeService.XCommissionType_Auto(name).subscribe(res => {
			this.SenderXCommissionTypeList = res.Data;
		});
	}

	onSenderXCommissionTypeChanged($event?: any) {
		if ($event) {
			const selected: any = $event.option.value;
			this.get('SenderXCommissionTypeID').setValue(selected.ID);
		} else {
			this.get('SenderXCommissionType').setValue(null);
			this.get('SenderXCommissionTypeID').setValue(null);
		}
	}

	ReceiverAccount_AutoComplete(name?: string) {
		this._AccountService.Account_Auto(name).subscribe(res => {
			this.ReceiverAccountList = res.Data;
		});
	}

	onReceiverAccountChanged($event?: any) {
		if ($event) {
			const selected: any = $event.option.value;
			this.get('ReceiverAccountID').setValue(selected.ID);
		} else {
			this.get('ReceiverAccount').setValue(null);
			this.get('ReceiverAccountID').setValue(null);
		}
	}

	ReceiverCurrency_AutoComplete(name?: string) {
		this._CurrencyService.Currency_Auto(name).subscribe(res => {
			this.ReceiverCurrencyList = res.Data;
		});
	}

	onReceiverCurrencyChanged($event?: any) {
		if ($event) {
			const selected: any = $event.option.value;
			this.get('ReceiverCurrencyID').setValue(selected.ID);
		} else {
			this.get('ReceiverCurrency').setValue(null);
			this.get('ReceiverCurrencyID').setValue(null);
		}
	}

	ReceiverXCommissionType_AutoComplete(name?: string) {
		this._XCommissionTypeService.XCommissionType_Auto(name).subscribe(res => {
			this.ReceiverXCommissionTypeList = res.Data;
		});
	}

	onReceiverXCommissionTypeChanged($event?: any) {
		if ($event) {
			const selected: any = $event.option.value;
			this.get('ReceiverXCommissionTypeID').setValue(selected.ID);
		} else {
			this.get('ReceiverXCommissionType').setValue(null);
			this.get('ReceiverXCommissionTypeID').setValue(null);
		}
	}

	SenderAccount_AutoComplete(name?: string) {
		this._AccountService.Account_Auto(name).subscribe(res => {
			this.SenderAccountList = res.Data;
		});
	}

	onSenderAccountChanged($event?: any) {
		if ($event) {
			const selected: any = $event.option.value;
			this.get('SenderAccountID').setValue(selected.ID);
		} else {
			this.get('SenderAccount').setValue(null);
			this.get('SenderAccountID').setValue(null);
		}
	}

	Total_Calc() {
		// Total = Price * Amount
		const Price = this.get('Price').value;
		const Amount = this.get('Amount').value;
		let Total: any = Amount * Price;
		Total = parseFloat(Total).toFixed(2);
		this.get('Total').setValue(Total);
	}

	Total_Changed() {
		// Amount = Total / Price
		const Total = this.get('Total').value;
		const Price = this.get('Price').value;
		let Amount: any = Total / Price;
		Amount = parseFloat(Amount).toFixed(2);
		this.get('Amount').setValue(Amount);
	}

} // the end :)