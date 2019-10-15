import { Component, OnInit, AfterViewInit } from '@angular/core';
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
import { XCommercialPaperTypeService } from '../../../services/Lookups/XCommercialPaperType.service';
import { XCommercialPaperType } from '../../../models/Lookups/XCommercialPaperType';
import { SellCurrencyService } from '../../../services/CurrencyExchange/SellCurrency.service';
import { SellCurrency } from '../../../models/CurrencyExchange/SellCurrency';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';


import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';

@Component({
	selector: 'app-chequesellcurrency',
	templateUrl: './ChequeSellCurrency.component.html',
	styleUrls: ['./ChequeSellCurrency.component.scss'],

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
export class ChequeSellCurrencyComponent implements OnInit {
	public myForm: FormGroup;
	public SellCurrency: any;
	public CurrencyList: any;
	public XCommercialPaperTypeList: any;
	public BankAccountList: any;
	public IssuerBankList: any;

	constructor(

		private _CurrencyService: CurrencyService,
		private _BankService: BankService,
		private _BankAccountService: BankAccountService,
		private _XCommercialPaperTypeService: XCommercialPaperTypeService,
		private _SellCurrencyService: SellCurrencyService,
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
			DocumentCode: [''],
			DocumentDate: [new Date(), Validators.required],
			DocumentNo: [''],
			Notes: [''],
			Amount: ['', Validators.required],
			SellPrice: ['', Validators.required],
			CurrencyID: [''],
			Phone: [''],
			XCommercialPaperTypeID: [''],
			BankAccountID: [''],
			BankDocumentNo: [''],
			IssuerBankID: [''],
			Total: ['', Validators.required],
			Seller: [''],
			Currency: ['', Validators.required],
			XCommercialPaperType: [''],
			BankAccount: [''],
			IssuerBank: [''],
		});

		this.get('Currency').valueChanges.subscribe(value => {
			this.Currency_AutoComplete(value);
		});

		this.get('XCommercialPaperType').valueChanges.subscribe(value => {
			this.XCommercialPaperType_AutoComplete(value);
		});

		this.get('BankAccount').valueChanges.subscribe(value => {
			this.BankAccount_AutoComplete(value);
		});

		this.get('IssuerBank').valueChanges.subscribe(value => {
			this.IssuerBank_AutoComplete(value);
		});
	}
	fillForm(_SellCurrency: SellCurrency) {

		this.myForm.reset();

		this.myForm.patchValue({
			DocumentID: _SellCurrency.DocumentID,
			DocumentCode: _SellCurrency.DocumentCode,
			DocumentDate: _SellCurrency.DocumentDate,
			DocumentNo: _SellCurrency.DocumentNo,
			Notes: _SellCurrency.Notes,
			Amount: _SellCurrency.Amount,
			SellPrice: _SellCurrency.SellPrice,
			CurrencyID: _SellCurrency.CurrencyID,
			Currency: this.initObject(_SellCurrency.Currency),
			Phone: _SellCurrency.Phone,
			XCommercialPaperTypeID: _SellCurrency.XCommercialPaperTypeID,
			XCommercialPaperType: this.initObject(_SellCurrency.XCommercialPaperType),
			BankAccountID: _SellCurrency.BankAccountID,
			BankAccount: this.initObject(_SellCurrency.BankAccount),
			BankDocumentNo: _SellCurrency.BankDocumentNo,
			IssuerBankID: _SellCurrency.IssuerBankID,
			IssuerBank: this.initObject(_SellCurrency.IssuerBank),
			Total: _SellCurrency.Total,
			Seller: _SellCurrency.Seller,
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
			this.SellCurrency = new SellCurrency();
			const Id: number = params.id as number;
			this.getById(Id);
		});


	}

	getById(Id: number) {

		this._SellCurrencyService.GetSellCurrency(Id).subscribe(res => {
			if (res === null) {
				this.SellCurrency = null;
			} else {
				this.SellCurrency = null;
				this.SellCurrency = res;
				this.fillForm(this.SellCurrency);
			}
		});

	}

	New() {
		this.SellCurrency = new SellCurrency();
		this.myForm.reset();
	}

	Save() {
		if (this.myForm.valid) {
			this.SellCurrency = this.myForm.value;
			this.SellCurrency.XObjectTypeID = XObjectTypeEnum.ChequeSellCurrency;
			this._SellCurrencyService.AddSellCurrency(this.SellCurrency)
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
			this.SellCurrency = this.myForm.value;
			this.SellCurrency.XObjectTypeID = XObjectTypeEnum.ChequeSellCurrency;
			this._SellCurrencyService.UpdateSellCurrency(this.SellCurrency)
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
				this._SellCurrencyService.DeleteSellCurrency(this.SellCurrency.ID).subscribe(res => {
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

	XCommercialPaperType_AutoComplete(name?: string) {
		this._XCommercialPaperTypeService.XCommercialPaperType_Auto(name).subscribe(res => {
			this.XCommercialPaperTypeList = res.Data;
		});
	}

	onXCommercialPaperTypeChanged($event?: any) {
		if ($event) {
			const selected: any = $event.option.value;
			this.get('XCommercialPaperTypeID').setValue(selected.ID);
		} else {
			this.get('XCommercialPaperType').setValue(null);
			this.get('XCommercialPaperTypeID').setValue(null);
		}
	}

	BankAccount_AutoComplete(name?: string) {
		this._BankAccountService.BankAccount_Auto(name).subscribe(res => {
			this.BankAccountList = res.Data;
		});
	}

	onBankAccountChanged($event?: any) {
		if ($event) {
			const selected: any = $event.option.value;
			this.get('BankAccountID').setValue(selected.ID);
		} else {
			this.get('BankAccount').setValue(null);
			this.get('BankAccountID').setValue(null);
		}
	}

	IssuerBank_AutoComplete(name?: string) {
		this._BankService.Bank_Auto(name).subscribe(res => {
			this.IssuerBankList = res.Data;
		});
	}

	onIssuerBankChanged($event?: any) {
		if ($event) {
			const selected: any = $event.option.value;
			this.get('IssuerBankID').setValue(selected.ID);
		} else {
			this.get('IssuerBank').setValue(null);
			this.get('IssuerBankID').setValue(null);
		}
	}
	
	Total_Calc() {
		// Total = SellPrice * Amount
		const SellPrice = this.get('SellPrice').value;
		const Amount = this.get('Amount').value;
		let Total: any = Amount * SellPrice;
		Total = parseFloat(Total).toFixed(2);
		this.get('Total').setValue(Total);
	}

	Total_Changed() {
		// Amount = Total / SellPrice
		const Total = this.get('Total').value;
		const SellPrice = this.get('SellPrice').value;
		let Amount: any = Total / SellPrice;
		Amount = parseFloat(Amount).toFixed(2);
		this.get('Amount').setValue(Amount);
	}

} // the end :)

