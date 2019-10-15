import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormService } from '../../../services/FormService';
import { Messages } from '../../../enums/Messages';
import Swal from 'sweetalert2';

import { CurrencyService } from '../../../services/Masters/Currency.service';
import { BankService } from '../../../services/Masters/Bank.service';
import { CardTypeService } from '../../../services/Masters/CardType.service';
import { CardIssuerService } from '../../../services/Masters/CardIssuer.service';

import { Currency } from '../../../models/Masters/Currency';
import { Bank } from '../../../models/Masters/Bank';
import { CardType } from '../../../models/Masters/CardType';
import { CardIssuer } from '../../../models/Masters/CardIssuer';

import { CardService } from '../../../services/CardsTransactions/Card.service';
import { Card } from '../../../models/CardsTransactions/Card';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';

@Component({
	selector: 'app-card',
	templateUrl: './Card.component.html',
	styleUrls: ['./Card.component.scss'],
	providers: [
		CurrencyService,
		BankService,
		CardTypeService,
		CardIssuerService,
		CardService,
		{ provide: MAT_DIALOG_DATA, useValue: {} },
		{ provide: MatDialogRef, useValue: {} }
	]
})

export class CardComponent implements OnInit {
	public myForm: FormGroup;
	public Card: any;
	public CardTypeList: any;
	public CardIssuerList: any;
	public BankList: any;
	public CardCurrencyList: any;

	constructor(
		@Inject(MAT_DIALOG_DATA) public dialogParams: any,
		public dialogRef: MatDialogRef<CardComponent>,
		private _CurrencyService: CurrencyService,
		private _BankService: BankService,
		private _CardTypeService: CardTypeService,
		private _CardIssuerService: CardIssuerService,
		private _CardService: CardService,
		public formBuilder: FormBuilder,
		private _FormService: FormService,
		private router: Router,
		private route: ActivatedRoute,
	) {

	}

	buildForm() {

		this.myForm = this.formBuilder.group({
			ID: [''],
			CardNo: ['', Validators.required],
			CardTypeID: [''],
			CardCode: ['', Validators.required],
			NameOnCard: [''],
			CardOwnerName: [''],
			CardIssuerID: [''],
			BankID: [''],
			CardCurrencyID: [''],
			CardPin: [''],
			OwnerPhone: [''],
			CardType: ['', Validators.required],
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

	fillForm(_Card: Card) {

		this.myForm.reset();

		this.myForm.patchValue({
			ID: _Card.ID,
			CardNo: _Card.CardNo,
			CardTypeID: _Card.CardTypeID,
			CardType: this.initObject(_Card.CardType),
			CardCode: _Card.CardCode,
			NameOnCard: _Card.NameOnCard,
			CardOwnerName: _Card.CardOwnerName,
			CardIssuerID: _Card.CardIssuerID,
			CardIssuer: this.initObject(_Card.CardIssuer),
			BankID: _Card.BankID,
			Bank: this.initObject(_Card.Bank),
			CardCurrencyID: _Card.CardCurrencyID,
			CardCurrency: this.initObject(_Card.CardCurrency),
			CardPin: _Card.CardPin,
			OwnerPhone: _Card.OwnerPhone,
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
			this.Card = new Card();
			const Id: number = params.id as number;
			this.getById(Id);
		});


	}

	getById(Id: number) {

		this._CardService.GetCard(Id).subscribe(res => {
			if (res === null) {
				this.Card = null;
			} else {
				this.Card = null;
				this.Card = res;
				this.fillForm(this.Card);
			}
		});

	}

	New() {
		this.Card = new Card();
		this.myForm.reset();
	}

	Save() {
		if (this.myForm.valid) {
			this.Card = this.myForm.value;
			this.Card.XObjectTypeID = XObjectTypeEnum.Card;
			this._CardService.AddCard(this.Card)
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

		this.dialogRef.close();
	}

	Update() {
		if (this.myForm.valid) {
			this.Card = this.myForm.value;
			this.Card.XObjectTypeID = XObjectTypeEnum.Card;
			this._CardService.UpdateCard(this.Card)
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

		this.dialogRef.close();
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
				this._CardService.DeleteCard(this.Card.ID).subscribe(res => {
					if (!res.Success) {
						Messages.ShowMessag(res.Message, 'error');
					} else {
						this.ngOnInit();
					}
				});
			}
		});
	}

	CardType_AutoComplete(name?: string) {
		this._CardTypeService.CardType_Auto(name).subscribe(res => {
			this.CardTypeList = res.Data;
		});
	}

	onCardTypeChanged($event?: any) {
		if ($event) {
			const selected: any = $event.option.value;
			this.get('CardTypeID').setValue(selected.ID);
		} else {
			this.get('CardType').setValue(null);
			this.get('CardTypeID').setValue(null);
		}
	}

	CardIssuer_AutoComplete(name?: string) {
		this._CardIssuerService.CardIssuer_Auto(name).subscribe(res => {
			this.CardIssuerList = res.Data;
		});
	}

	onCardIssuerChanged($event?: any) {
		if ($event) {
			const selected: any = $event.option.value;
			this.get('CardIssuerID').setValue(selected.ID);
		} else {
			this.get('CardIssuer').setValue(null);
			this.get('CardIssuerID').setValue(null);
		}
	}

	Bank_AutoComplete(name?: string) {
		this._BankService.Bank_Auto(name).subscribe(res => {
			this.BankList = res.Data;
		});
	}

	onBankChanged($event?: any) {
		if ($event) {
			const selected: any = $event.option.value;
			this.get('BankID').setValue(selected.ID);
		} else {
			this.get('Bank').setValue(null);
			this.get('BankID').setValue(null);
		}
	}

	CardCurrency_AutoComplete(name?: string) {
		this._CurrencyService.Currency_Auto(name).subscribe(res => {
			this.CardCurrencyList = res.Data;
		});
	}

	onCardCurrencyChanged($event?: any) {
		if ($event) {
			const selected: any = $event.option.value;
			this.get('CardCurrencyID').setValue(selected.ID);
		} else {
			this.get('CardCurrency').setValue(null);
			this.get('CardCurrencyID').setValue(null);
		}
	}

	closeDialog(): void {
		this.dialogRef.close();
	}


} // the end :)

