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
	selector: 'app-chequesellcurrencies',
	templateUrl: './ChequeSellCurrencies.component.html',
	styleUrls: ['./ChequeSellCurrencies.component.scss'],

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

export class ChequeSellCurrenciesComponent implements OnInit {

	public displayedColumns = ['RowNo', 'DocumentDate', 'DocumentCode', 'CurrencyID', 'Amount', 'Seller', 'BankAccountID', 'Links'];

	public dataSource = new MatTableDataSource();
	public resultsLength = 0;
	public isLoadingResults = true;
	public SellCurrency: any;
	public myForm: FormGroup;
	public CurrencyList: any;
	public BankList: any;
	public BankAccountList: any;
	public XCommercialPaperTypeList: any;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	IssuerBankList: any;


	constructor(
		private _FormService: FormService,
		private _CurrencyService: CurrencyService,
		private _BankService: BankService,
		private _BankAccountService: BankAccountService,
		private _XCommercialPaperTypeService: XCommercialPaperTypeService,
		private _SellCurrencyService: SellCurrencyService,
		public formBuilder: FormBuilder
	) { }


	BuildForm() {
		this.myForm = this.formBuilder.group({
			ID: [''],
			DocumentCode: [''],
			DocumentDate: [new Date(), Validators.required],
			DocumentNo: [''],
			Notes: [''],
			Amount: [''],
			SellPrice: [''],
			CurrencyID: [''],
			Phone: [''],
			XCommercialPaperTypeID: [''],
			BankAccountID: [''],
			BankDocumentNo: [''],
			IssuerBankID: [''],
			Total: [''],
			Seller: [''],
			Currency: [''],
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

	get(name: string): FormControl {
		return this.myForm.get(name) as FormControl;
	}

	ngOnInit() {
		this.SellCurrency = null;

		this.BuildForm();

		this.Display();
	}


	Display() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;

		this.isLoadingResults = true;
		const _SellCurrency: any = this.myForm.value;
		_SellCurrency.PageIndex = 1;
		_SellCurrency.PageSize = 1000;
		_SellCurrency.XObjectTypeID = XObjectTypeEnum.ChequeSellCurrency;
		return this._SellCurrencyService.GetSellCurrencyPage(_SellCurrency).subscribe(res => {
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
				this._SellCurrencyService.DeleteSellCurrency(id).subscribe(res => {
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

	Currency_AutoComplete(name) {
		this._CurrencyService.Currency_Auto(name).subscribe(res => {
			this.CurrencyList = res.Data;
		});
	}

	onCurrencyChanged($event) {
		const selected: Currency = $event.option.value as Currency;
		this.get('CurrencyID').setValue(selected.ID);
	}

	XCommercialPaperType_AutoComplete(name) {
		this._XCommercialPaperTypeService.XCommercialPaperType_Auto(name).subscribe(res => {
			this.XCommercialPaperTypeList = res.Data;
		});
	}

	onXCommercialPaperTypeChanged($event) {
		const selected: XCommercialPaperType = $event.option.value as XCommercialPaperType;
		this.get('XCommercialPaperTypeID').setValue(selected.ID);
	}

	BankAccount_AutoComplete(name) {
		this._BankAccountService.BankAccount_Auto(name).subscribe(res => {
			this.BankAccountList = res.Data;
		});
	}

	onBankAccountChanged($event) {
		const selected: BankAccount = $event.option.value as BankAccount;
		this.get('BankAccountID').setValue(selected.ID);
	}

	IssuerBank_AutoComplete(name) {
		this._BankService.Bank_Auto(name).subscribe(res => {
			this.IssuerBankList = res.Data;
		});
	}

	onIssuerBankChanged($event) {
		const selected: Bank = $event.option.value as Bank;
		this.get('IssuerBankID').setValue(selected.ID);
	}


	displayText(obj?: any): string | undefined {
		return obj ? obj.Name : undefined;
	}

}
