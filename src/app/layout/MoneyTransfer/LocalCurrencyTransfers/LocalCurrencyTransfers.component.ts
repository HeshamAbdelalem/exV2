import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Messages } from '../../../enums/Messages';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { FormService } from '../../../services/FormService';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../../services/GeneralLedger/Account.service';
import { Account } from '../../../models/GeneralLedger/Account';
import { CurrencyService } from '../../../services/Masters/Currency.service';
import { Currency } from '../../../models/Masters/Currency';
import { CityService } from '../../../services/Masters/City.service';
import { City } from '../../../models/Masters/City';
import { CurrencyTransferService } from '../../../services/MoneyTransfer/CurrencyTransfer.service';
import { CurrencyTransfer } from '../../../models/MoneyTransfer/CurrencyTransfer';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';


import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';

@Component({
	selector: 'app-localcurrencytransfers',
	templateUrl: './LocalCurrencyTransfers.component.html',
	styleUrls: ['./LocalCurrencyTransfers.component.scss'],

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

export class LocalCurrencyTransfersComponent implements OnInit {

	public displayedColumns = ['RowNo', 'DocumentNo', 'DocumentDate', 'DocumentCode', 'CurrencyID', 'Amount', 'ReceiverAccountID', 'DeliveryLocationID', 'Links'];

	public dataSource = new MatTableDataSource();
	public resultsLength = 0;
	public isLoadingResults = true;
	public CurrencyTransfer: any;
	public myForm: FormGroup;
	public AccountList: any;
	public CurrencyList: any;
	public CityList: any;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	DeliveryLocationList: any;
	ReceiverAccountList: any;


	constructor(
		private _FormService: FormService,
		private _AccountService: AccountService,
		private _CurrencyService: CurrencyService,
		private _CityService: CityService,
		private _CurrencyTransferService: CurrencyTransferService,
		public formBuilder: FormBuilder
	) { }


	BuildForm() {
		this.myForm = this.formBuilder.group({
			ID: [''],
			DocumentNo: [''],
			Notes: [''],
			DocumentCode: [''],
			DocumentDate: [new Date(), Validators.required],
			Amount: [''],
			Price: [''],
			CurrencyID: [''],
			ReceiverAccountID: [''],
			ReceiverCommission: [''],
			SenderName: [''],
			ReceiverName: [''],
			SenderPhone: [''],
			ReceiverPhone: [''],
			DeliveryLocationID: [''],
			Total: [''],
			Currency: [''],
			ReceiverAccount: [''],
			DeliveryLocation: [''],
		});

		this.get('Currency').valueChanges.subscribe(value => {
			this.Currency_AutoComplete(value);
		});


		this.get('ReceiverAccount').valueChanges.subscribe(value => {
			this.ReceiverAccount_AutoComplete(value);
		});


		this.get('DeliveryLocation').valueChanges.subscribe(value => {
			this.DeliveryLocation_AutoComplete(value);
		});

	}

	get(name: string): FormControl {
		return this.myForm.get(name) as FormControl;
	}

	ngOnInit() {
		this.CurrencyTransfer = null;

		this.BuildForm();

		this.Display();
	}


	Display() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;

		this.isLoadingResults = true;
		const _CurrencyTransfer: any = this.myForm.value;
		_CurrencyTransfer.PageIndex = 1;
		_CurrencyTransfer.PageSize = 1000;
		return this._CurrencyTransferService.GetCurrencyTransferPage(_CurrencyTransfer).subscribe(res => {
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
				this._CurrencyTransferService.DeleteCurrencyTransfer(id).subscribe(res => {
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

	ReceiverAccount_AutoComplete(name) {
		this._AccountService.Account_Auto(name).subscribe(res => {
			this.ReceiverAccountList = res.Data;
		});
	}

	onReceiverAccountChanged($event) {
		const selected: Account = $event.option.value as Account;
		this.get('ReceiverAccountID').setValue(selected.ID);
	}

	DeliveryLocation_AutoComplete(name) {
		this._CityService.City_Auto(name).subscribe(res => {
			this.DeliveryLocationList = res.Data;
		});
	}

	onDeliveryLocationChanged($event) {
		const selected: City = $event.option.value as City;
		this.get('DeliveryLocationID').setValue(selected.ID);
	}


	displayText(obj?: any): string | undefined {
		return obj ? obj.Name : undefined;
	}

}
