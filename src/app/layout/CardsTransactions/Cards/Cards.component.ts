import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Messages } from '../../../enums/Messages';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { FormService } from '../../../services/FormService';

import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CurrencyService } from '../../../services/Masters/Currency.service';
import { Currency } from '../../../models/Masters/Currency';
import { BankService } from '../../../services/Masters/Bank.service';
import { Bank } from '../../../models/Masters/Bank';
import { CardTypeService } from '../../../services/Masters/CardType.service';
import { CardType } from '../../../models/Masters/CardType';
import { CardIssuerService } from '../../../services/Masters/CardIssuer.service';
import { CardIssuer } from '../../../models/Masters/CardIssuer';
import { CardService } from '../../../services/CardsTransactions/Card.service';
import { Card } from '../../../models/CardsTransactions/Card';

import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReceiveCardService } from '../../../services/CardsTransactions/ReceiveCard.service';

@Component({
	selector: 'app-cards',
	templateUrl: './Cards.component.html',
	styleUrls: ['./Cards.component.scss'],
	providers: [
		CurrencyService,
		BankService,
		CardTypeService,
		CardIssuerService,
		ReceiveCardService,
		CardService,
		{ provide: MAT_DIALOG_DATA, useValue: {} },
		{ provide: MatDialogRef, useValue: {} }
	]
})

export class CardsComponent implements OnInit {

	public displayedColumns = ['RowNo', 'CardNo', 'CardTypeID', 'CardCode', 'CardOwnerName', 'OwnerPhone', 'CardIssuerID', 'Links'];

	public dataSource = new MatTableDataSource();
	public resultsLength = 0;
	public isLoadingResults = true;
	public Card: any;
	public myForm: FormGroup;
	public CurrencyList: any;
	public BankList: any;
	public CardTypeList: any;
	public CardIssuerList: any;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	CardCurrencyList: any;


	constructor(
		public dialogRef: MatDialogRef<CardsComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,

		private _FormService: FormService,
		private _CurrencyService: CurrencyService,
		private _BankService: BankService,
		private _CardTypeService: CardTypeService,
		private _CardIssuerService: CardIssuerService,
		private _CardService: CardService,
		public formBuilder: FormBuilder,
	) {
		console.log('MAT_DIALOG_DATA: ', data);
	 }


	BuildForm() {
		this.myForm = this.formBuilder.group({
			ID: [''],
			CardNo: [''],
			CardTypeID: [''],
			CardCode: [''],
			NameOnCard: [''],
			CardOwnerName: [''],
			CardIssuerID: [''],
			BankID: [''],
			CardCurrencyID: [''],
			CardPin: [''],
			OwnerPhone: [''],
			CardType: [''],
			CardIssuer: [''],
			Bank: [''],
			CardCurrency: [''],
		});

		this.get('CardType').valueChanges.subscribe(value => {
			this.CardType_AutoComplete(value);
		});

		this.get('CardIssuer').valueChanges.subscribe(value => {
			this.CardIssuer_AutoComplete(value);
		});

		this.get('Bank').valueChanges.subscribe(value => {
			this.Bank_AutoComplete(value);
		});

		this.get('CardCurrency').valueChanges.subscribe(value => {
			this.CardCurrency_AutoComplete(value);
		});

	}

	get(name: string): FormControl {
		return this.myForm.get(name) as FormControl;
	}

	ngOnInit() {
		
		this.Card = null;

		this.BuildForm();

		this.Display();
	}


	Display() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;

		this.isLoadingResults = true;
		const _Card: any = this.myForm.value;
		_Card.PageIndex = 1;
		_Card.PageSize = 1000;
		return this._CardService.GetCardPage(_Card).subscribe(res => {
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
				this._CardService.DeleteCard(id).subscribe(res => {
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

	CardType_AutoComplete(name) {
		this._CardTypeService.CardType_Auto(name).subscribe(res => {
			this.CardTypeList = res.Data;
		});
	}

	onCardTypeChanged($event) {
		const selected: CardType = $event.option.value as CardType;
		this.get('CardTypeID').setValue(selected.ID);
	}

	CardIssuer_AutoComplete(name) {
		this._CardIssuerService.CardIssuer_Auto(name).subscribe(res => {
			this.CardIssuerList = res.Data;
		});
	}

	onCardIssuerChanged($event) {
		const selected: CardIssuer = $event.option.value as CardIssuer;
		this.get('CardIssuerID').setValue(selected.ID);
	}

	Bank_AutoComplete(name) {
		this._BankService.Bank_Auto(name).subscribe(res => {
			this.BankList = res.Data;
		});
	}

	onBankChanged($event) {
		const selected: Bank = $event.option.value as Bank;
		this.get('BankID').setValue(selected.ID);
	}

	CardCurrency_AutoComplete(name) {
		this._CurrencyService.Currency_Auto(name).subscribe(res => {
			this.CardCurrencyList = res.Data;
		});
	}

	onCardCurrencyChanged($event) {
		const selected: Currency = $event.option.value as Currency;
		this.get('CardCurrencyID').setValue(selected.ID);
	}


	displayText(obj?: any): string | undefined {
		return obj ? obj.Name : undefined;
	}

	close() {
		this.dialogRef.close();
	}
}
