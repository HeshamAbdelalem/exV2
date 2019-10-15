import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormService } from '../../../services/FormService';
import { Messages } from '../../../enums/Messages';
import Swal from 'sweetalert2';

import { CurrencyService } from '../../../services/Masters/Currency.service';
import { Currency } from '../../../models/Masters/Currency';
import { BuyCurrenyService } from '../../../services/CurrencyExchange/BuyCurreny.service';
import { BuyCurreny } from '../../../models/CurrencyExchange/BuyCurreny';
import { BankAccountService } from '../../../services/Configurations/BankAccount.service';
import { BankAccount } from '../../../models/Configurations/BankAccount';
import { XCommercialPaperTypeService } from '../../../services/Lookups/XCommercialPaperType.service';
import { XCommercialPaperType } from '../../../models/Lookups/XCommercialPaperType';

import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';
import { DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

@Component({
	selector: 'app-chequebuycurreny',
	templateUrl: './ChequeBuyCurreny.component.html',
	styleUrls: ['./ChequeBuyCurreny.component.scss'],
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

export class ChequeBuyCurrenyComponent implements OnInit {
	public myForm: FormGroup;
	public BuyCurreny: any;
	public CurrencyList: any;
	public XCommercialPaperTypeList: any;
	public BankAccountList: any;

	constructor(

		private _CurrencyService: CurrencyService,
		private _BuyCurrenyService: BuyCurrenyService,
		private _BankAccountService: BankAccountService,
		private _XCommercialPaperTypeService: XCommercialPaperTypeService,
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
			BuyPrice: ['', Validators.required],
			CurrencyID: [''],
			Phone: [''],
			XCommercialPaperTypeID: [''],
			BankAccountID: [''],
			BankDocumentNo: ['', Validators.required],
			Total: ['', Validators.required],
			Buyer: [''],
			Currency: ['', Validators.required],
			XCommercialPaperType: ['', Validators.required],
			BankAccount: ['', Validators.required],
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
	}

	fillForm(_BuyCurreny: BuyCurreny) {

		this.myForm.reset();

		this.myForm.patchValue({
			DocumentID: _BuyCurreny.DocumentID,
			DocumentCode: _BuyCurreny.DocumentCode,
			DocumentDate: _BuyCurreny.DocumentDate,
			DocumentNo: _BuyCurreny.DocumentNo,
			Notes: _BuyCurreny.Notes,
			Amount: _BuyCurreny.Amount,
			BuyPrice: _BuyCurreny.BuyPrice,
			CurrencyID: _BuyCurreny.CurrencyID,
			Currency: this.initObject(_BuyCurreny.Currency),
			Phone: _BuyCurreny.Phone,
			XCommercialPaperTypeID: _BuyCurreny.XCommercialPaperTypeID,
			XCommercialPaperType: this.initObject(_BuyCurreny.XCommercialPaperType),
			BankAccountID: _BuyCurreny.BankAccountID,
			BankAccount: this.initObject(_BuyCurreny.BankAccount),
			BankDocumentNo: _BuyCurreny.BankDocumentNo,
			Total: _BuyCurreny.Total,
			Buyer: _BuyCurreny.Buyer,
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
			this.BuyCurreny = new BuyCurreny();
			const Id: number = params.id as number;
			this.getById(Id);
		});


	}

	getById(Id: number) {

		this._BuyCurrenyService.GetBuyCurreny(Id).subscribe(res => {
			if (res === null) {
				this.BuyCurreny = null;
			} else {
				this.BuyCurreny = null;
				this.BuyCurreny = res;
				this.fillForm(this.BuyCurreny);
			}
		});

	}

	New() {
		this.BuyCurreny = new BuyCurreny();
		this.myForm.reset();
	}

	Save() {
		if (this.myForm.valid) {
			this.BuyCurreny = this.myForm.value;
			this.BuyCurreny.XObjectTypeID = XObjectTypeEnum.CashBuyCurrency;
			this._BuyCurrenyService.AddBuyCurreny(this.BuyCurreny)
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
			this.BuyCurreny = this.myForm.value;
			this.BuyCurreny.XObjectTypeID = XObjectTypeEnum.ChequeBuyCurreny;
			this._BuyCurrenyService.UpdateBuyCurreny(this.BuyCurreny)
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
				this._BuyCurrenyService.DeleteBuyCurreny(this.BuyCurreny.ID).subscribe(res => {
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

	Total_Calc() {
		// Total = BuyPrice * Amount
		const BuyPrice = this.get('BuyPrice').value;
		const Amount = this.get('Amount').value;
		let Total: any = Amount * BuyPrice;
		Total = parseFloat(Total).toFixed(2);
		this.get('Total').setValue(Total);
	}

	Total_Changed() {
		// Amount = Total / BuyPrice
		const Total = this.get('Total').value;
		const BuyPrice = this.get('BuyPrice').value;
		let Amount: any = Total / BuyPrice;
		Amount = parseFloat(Amount).toFixed(2);
		this.get('Amount').setValue(Amount);
	}

} // the end :)

