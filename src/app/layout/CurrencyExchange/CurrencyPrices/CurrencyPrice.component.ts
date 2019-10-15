import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormService } from '../../../services/FormService';
import { Messages } from '../../../enums/Messages';
import Swal from 'sweetalert2';

import { CurrencyService } from '../../../services/Masters/Currency.service';
import { Currency } from '../../../models/Masters/Currency';
import { CurrencyPriceService } from '../../../services/CurrencyExchange/CurrencyPrice.service';
import { CurrencyPrice } from '../../../models/CurrencyExchange/CurrencyPrice';
import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';

import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
	selector: 'app-currencyprice',
	templateUrl: './CurrencyPrice.component.html',
	styleUrls: ['./CurrencyPrice.component.scss'],
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

export class CurrencyPriceComponent implements OnInit {
	public myForm: FormGroup;
	public CurrencyPrice: any;
	public CurrencyList: any;

	constructor(

		private _CurrencyService: CurrencyService,
		private _CurrencyPriceService: CurrencyPriceService,
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
			DocumentDate: [new Date(), Validators.required],
			Notes: [''],
			DocumentCode: ['', Validators.required],
			CashSellPrice: ['', Validators.required],
			ChequeBuyPrice: ['', Validators.required],
			ChequeSellPrice: ['', Validators.required],
			CashBuyPrice: ['', Validators.required],
			CurrencyID: [''],
			Currency: ['', Validators.required],
		});

		this.get('Currency').valueChanges.subscribe(value => {
			this.Currency_AutoComplete(value);
		});
	}

	fillForm(_CurrencyPrice: CurrencyPrice) {

		this.myForm.reset();

		this.myForm.patchValue({
			DocumentID: _CurrencyPrice.DocumentID,
			DocumentDate: _CurrencyPrice.DocumentDate,
			Notes: _CurrencyPrice.Notes,
			DocumentCode: _CurrencyPrice.DocumentCode,
			CashSellPrice: _CurrencyPrice.CashSellPrice,
			ChequeBuyPrice: _CurrencyPrice.ChequeBuyPrice,
			ChequeSellPrice: _CurrencyPrice.ChequeSellPrice,
			CashBuyPrice: _CurrencyPrice.CashBuyPrice,
			CurrencyID: _CurrencyPrice.CurrencyID,
			Currency: this.initObject(_CurrencyPrice.Currency),
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
			this.CurrencyPrice = new CurrencyPrice();
			const Id: number = params.id as number;
			this.getById(Id);
		});


	}

	getById(Id: number) {

		this._CurrencyPriceService.GetCurrencyPrice(Id).subscribe(res => {
			if (res === null) {
				this.CurrencyPrice = null;
			} else {
				this.CurrencyPrice = null;
				this.CurrencyPrice = res;
				this.fillForm(this.CurrencyPrice);
			}
		});

	}

	New() {
		this.CurrencyPrice = new CurrencyPrice();
		this.myForm.reset();
	}

	Save() {
		if (this.myForm.valid) {
			this.CurrencyPrice = this.myForm.value;
			this.CurrencyPrice.XObjectTypeID = XObjectTypeEnum.CurrencyPrice;
			this._CurrencyPriceService.AddCurrencyPrice(this.CurrencyPrice)
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
			this.CurrencyPrice = this.myForm.value;
			this.CurrencyPrice.XObjectTypeID = XObjectTypeEnum.CurrencyPrice;
			this._CurrencyPriceService.UpdateCurrencyPrice(this.CurrencyPrice)
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
				this._CurrencyPriceService.DeleteCurrencyPrice(this.CurrencyPrice.ID).subscribe(res => {
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


} // the end :)

