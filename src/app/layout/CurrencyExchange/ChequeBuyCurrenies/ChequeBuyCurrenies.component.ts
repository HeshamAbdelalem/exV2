import { Component, OnInit, ViewChild } from '@angular/core';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
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
import { BuyCurrenyService } from '../../../services/CurrencyExchange/BuyCurreny.service';
import { BuyCurreny } from '../../../models/CurrencyExchange/BuyCurreny';
import { BankAccountService } from '../../../services/Configurations/BankAccount.service';
import { BankAccount } from '../../../models/Configurations/BankAccount';
import { XCommercialPaperTypeService } from '../../../services/Lookups/XCommercialPaperType.service';
import { XCommercialPaperType } from '../../../models/Lookups/XCommercialPaperType';

import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';
import { DatePipe } from '@angular/common';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

@Component({
	selector: 'app-chequebuycurrenies',
	templateUrl: './ChequeBuyCurrenies.component.html',
	styleUrls: ['./ChequeBuyCurrenies.component.scss'],
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

export class ChequeBuyCurreniesComponent implements OnInit {

	public displayedColumns = ['RowNo', 'DocumentNo', 'DocumentDate', 'DocumentCode', 'CurrencyID', 'Amount', 'Buyer', 'XCommercialPaperTypeID', 'BankAccountID', 'BankDocumentNo', 'Links'];

	public dataSource = new MatTableDataSource();
	public resultsLength = 0;
	public isLoadingResults = true;
	public BuyCurreny: any;
	public myForm: FormGroup;
	public CurrencyList: any;
	public BankAccountList: any;
	public XCommercialPaperTypeList: any;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;


	constructor(
		private _FormService: FormService,
		private _CurrencyService: CurrencyService,
		private _BuyCurrenyService: BuyCurrenyService,
		private _BankAccountService: BankAccountService,
		private _XCommercialPaperTypeService: XCommercialPaperTypeService,
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
			BuyPrice: [''],
			CurrencyID: [''],
			Phone: [''],
			XCommercialPaperTypeID: [''],
			BankAccountID: [''],
			BankDocumentNo: [''],
			Total: [''],
			Buyer: [''],
			Currency: [''],
			XCommercialPaperType: [''],
			BankAccount: [''],
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

	get(name: string): FormControl {
		return this.myForm.get(name) as FormControl;
	}

	ngOnInit() {
		this.BuyCurreny = null;

		this.BuildForm();

		this.Display();
	}


	Display() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;

		this.isLoadingResults = true;
		const _BuyCurreny: any = this.myForm.value;
		_BuyCurreny.PageIndex = 1;
		_BuyCurreny.PageSize = 1000;
		_BuyCurreny.XObjectTypeID = XObjectTypeEnum.ChequeBuyCurreny;
		return this._BuyCurrenyService.GetBuyCurrenyPage(_BuyCurreny).subscribe(res => {
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
				this._BuyCurrenyService.DeleteBuyCurreny(id).subscribe(res => {
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

	XCommercialPaperType_AutoComplete(name?: string) {
		this._XCommercialPaperTypeService.XCommercialPaperType_Auto(name).subscribe(res => {
			this.XCommercialPaperTypeList = res.Data;
		});
	}

	onXCommercialPaperTypeChanged($event) {
		const selected: XCommercialPaperType = $event.option.value as XCommercialPaperType;
		this.get('XCommercialPaperTypeID').setValue(selected.ID);
	}

	BankAccount_AutoComplete(name?: string) {
		this._BankAccountService.BankAccount_Auto(name).subscribe(res => {
			this.BankAccountList = res.Data;
		});
	}

	onBankAccountChanged($event) {
		const selected: BankAccount = $event.option.value as BankAccount;
		this.get('BankAccountID').setValue(selected.ID);
	}


	displayText(obj?: any): string | undefined {
		return obj ? obj.Name : undefined;
	}

}
