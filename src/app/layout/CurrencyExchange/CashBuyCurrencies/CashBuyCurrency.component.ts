import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormService } from '../../../services/FormService';
import { Messages } from '../../../enums/Messages';
import Swal from 'sweetalert2';

import { Currency } from '../../../models/Masters/Currency';
import { BuyCurreny } from '../../../models/CurrencyExchange/BuyCurreny';

import { CurrencyService } from '../../../services/Masters/Currency.service';
import { BuyCurrenyService } from '../../../services/CurrencyExchange/BuyCurreny.service';
import { SystemSettingService } from '../../../services/Configurations/SystemSetting.service';

import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
	selector: 'app-CashBuyCurrency',
	templateUrl: './CashBuyCurrency.component.html',
	styleUrls: ['./CashBuyCurrency.component.scss'],
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

export class CashBuyCurrencyComponent implements OnInit {

	public myForm: FormGroup;
	public BuyCurreny: any;
	public CurrencyList: any;

	@ViewChild("Amount") TxtAmount: ElementRef;

	constructor(
		private _CurrencyService: CurrencyService,
		private _BuyCurrenyService: BuyCurrenyService,
		private _SystemSettingService: SystemSettingService,

		public formBuilder: FormBuilder,
		private _FormService: FormService,
		private router: Router,
		private route: ActivatedRoute,
	) { }

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

	buildForm() {

		this.myForm = this.formBuilder.group({
			DocumentID: [''],
			DocumentCode: [''],
			DocumentDate: [new Date(), Validators.required],
			DocumentNo: [''],
			Notes: [''],
			Amount: [''],
			BuyPrice: [''],
			CurrencyID: [''],
			Phone: [''],
			Total: [''],
			Buyer: ['', Validators.required],
			Currency: ['', Validators.required],
		});

		this.get('Currency').valueChanges.subscribe(value => {
			this.Currency_AutoComplete(value);
		});

		// this.get('BuyPrice').valueChanges.subscribe(() => {
		// 	this.BuyPrice_Change();
		// });
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

	ngAfterViewInit(): void {
		// this.TxtAmount.nativeElement.focus();
		document.getElementById('Amount').focus();
	}

	ngOnInit() {

		this.buildForm();

		this.route.params.subscribe((params: Params) => {
			this.BuyCurreny = new BuyCurreny();
			const Id: any = params.id as number;
			if (Id !== "0") {
				this.getById(Id);
			}
		});
      
		this._SystemSettingService.GetSystemSetting(1).subscribe(SystemSetting => {

			if (SystemSetting) {

				if (SystemSetting.NationalCurrency) {
					this.get('CurrencyID').setValue(SystemSetting.DefaultForeignCurrencyID);
					this.get('Currency').setValue(SystemSetting.DefaultForeignCurrency);
				}

			}

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
		this.get('DocumentDate').setValue(new Date());
		this.ngOnInit();
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
			this.BuyCurreny.XObjectTypeID = XObjectTypeEnum.CashBuyCurrency;
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


} // the end :)
