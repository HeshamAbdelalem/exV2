import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Messages } from '../../../enums/Messages';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { FormService } from '../../../services/FormService';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CurrencyService } from '../../../services/Masters/Currency.service';
import { Currency } from '../../../models/Masters/Currency';
import { CurrencyPriceService } from '../../../services/CurrencyExchange/CurrencyPrice.service';
import { CurrencyPrice } from '../../../models/CurrencyExchange/CurrencyPrice';
import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';

import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
	selector: 'app-currencypricelist',
	templateUrl: './CurrencyPrices.component.html',
	styleUrls: ['./CurrencyPrices.component.scss'],
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

export class CurrencyPricesComponent implements OnInit {

	public displayedColumns = ['RowNo', 'DocumentDate', 'DocumentCode', 'CurrencyID', 'CashSellPrice', 'CashBuyPrice', 'ChequeSellPrice', 'ChequeBuyPrice', 'Links'];

	public dataSource = new MatTableDataSource();
	public resultsLength = 0;
	public isLoadingResults = true;
	public CurrencyPrice: any;
	public myForm: FormGroup;
	public CurrencyList: any;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(
		private _FormService: FormService,
		private _CurrencyService: CurrencyService,
		private _CurrencyPriceService: CurrencyPriceService,
		public formBuilder: FormBuilder
	) { }

	BuildForm() {
		this.myForm = this.formBuilder.group({
			ID: [''],
			DocumentDate: [new Date(), Validators.required],
			Notes: [''],
			DocumentCode: [''],
			CashSellPrice: [''],
			ChequeBuyPrice: [''],
			ChequeSellPrice: [''],
			CashBuyPrice: [''],
			CurrencyID: [''],
			Currency: [''],
		});

		this.get('Currency').valueChanges.subscribe(value => {
			this.Currency_AutoComplete(value);
		});

	}

	get(name: string): FormControl {
		return this.myForm.get(name) as FormControl;
	}

	ngOnInit() {
		this.CurrencyPrice = null;

		this.BuildForm();

		this.Display();
	}

	Display() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;

		this.isLoadingResults = true;
		const _CurrencyPrice: any = this.myForm.value;
		_CurrencyPrice.PageIndex = 1;
		_CurrencyPrice.PageSize = 1000;
		_CurrencyPrice.XObjectTypeID = XObjectTypeEnum.CurrencyPrice;
		return this._CurrencyPriceService.GetCurrencyPricePage(_CurrencyPrice).subscribe(res => {
			this.isLoadingResults = false;
			this.dataSource.data = res.Data;
		});
	}

	Delete(id: number) {
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
				this._CurrencyPriceService.DeleteCurrencyPrice(id).subscribe(res => {
					if (!res.Success) {
						Messages.ShowMessag(res.Message, 'error');
					} else {
						this.ngOnInit();
					}
				});
			}
		});
	}

	Clear() {
		this.BuildForm();
		this.Display();
	}

	Currency_AutoComplete(name?: string) {
		this._CurrencyService.Currency_Auto(name).subscribe(res => {
			this.CurrencyList = res.Data;
		});
	}

	onCurrencyChanged($event) {
		const selected: Currency = $event.option.value as Currency;
		this.get('CurrencyID').setValue(selected.ID);
	}

	displayText(obj?: any): string | undefined {
		return obj ? obj.Name : undefined;
	}

}
