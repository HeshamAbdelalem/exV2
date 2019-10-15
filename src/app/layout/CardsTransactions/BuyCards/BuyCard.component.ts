import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormService } from '../../../services/FormService';
import { Messages } from '../../../enums/Messages';
import Swal from 'sweetalert2';

import { XCardsOperationsTypeService } from '../../../services/Lookups/XCardsOperationsType.service';
import { XCardsOperationsType } from '../../../models/Lookups/XCardsOperationsType';
import { CurrencyService } from '../../../services/Masters/Currency.service';
import { Currency } from '../../../models/Masters/Currency';
import { GuarantorService } from '../../../services/Masters/Guarantor.service';
import { Guarantor } from '../../../models/Masters/Guarantor';
import { ReceiveCardService } from '../../../services/CardsTransactions/ReceiveCard.service';
import { ReceiveCard } from '../../../models/CardsTransactions/ReceiveCard';
import { ReceiveCardDetailService } from '../../../services/CardsTransactions/ReceiveCardDetail.service';
import { ReceiveCardDetail } from '../../../models/CardsTransactions/ReceiveCardDetail';
import { CardService } from '../../../services/CardsTransactions/Card.service';
import { Card } from '../../../models/CardsTransactions/Card';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { CardTypeService } from '../../../services/Masters/CardType.service';

import { CardComponent } from '../Cards/Card.component';

import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';
import { CardsComponent } from '../Cards/Cards.component';
// import { CardSearchComponent } from '../card-search/card-search.component';
import { BankService } from '../../../services/Masters/Bank.service';
import { CardIssuerService } from '../../../services/Masters/CardIssuer.service';

@Component({
	selector: 'app-buycard',
	templateUrl: './BuyCard.component.html',
	styleUrls: ['./BuyCard.component.scss'],

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

export class BuyCardComponent implements OnInit {
	public myForm: FormGroup;
	public ReceiveCard: any;
	public XCardsOperationsTypeID: any;
	public GuarantorList: any;
	// ReceiveCardDetail
	public CardList: any;
	// ReceiveCardDetail
	public CommissionCurrencyList: any;
	public XCardsOperationsTypeList: any;
	public OperationTypeID: any;
	PageTitle: string;
	PageUrl: string;
	_XObjectTypeEnum: number;
	CardTypeList: any;
	CardIssuerList: any;
	BankList: any;
	CardCurrencyList: any;

	constructor(
		// private _CurrencyService: CurrencyService,
		private _BankService: BankService,
		// private _CardTypeService: CardTypeService,
		private _CardIssuerService: CardIssuerService,

		private _CardTypeService: CardTypeService,
		private _XCardsOperationsTypeService: XCardsOperationsTypeService,
		private _CurrencyService: CurrencyService,
		private _GuarantorService: GuarantorService,
		private _ReceiveCardService: ReceiveCardService,
		private _ReceiveCardDetailService: ReceiveCardDetailService,
		private _CardService: CardService,
		public formBuilder: FormBuilder,
		private _FormService: FormService,
		private router: Router,
		private route: ActivatedRoute,
		public dialog: MatDialog,
	) {

	}

	buildForm() {

		this.myForm = this.formBuilder.group({
			DocumentID: [''],
			DocumentCode: [''],
			DocumentDate: [new Date(), Validators.required],
			DocumentNo: [''],
			Notes: [''],
			XCardsOperationsTypeID: [''],
			GuarantorID: [''],
			XCardsOperationsType: [''],
			Guarantor: ['', Validators.required],
			ReceiveCardDetail: this.formBuilder.array([]),
		});

		this.get('XCardsOperationsType').valueChanges.subscribe(value => {
			this.XCardsOperationsType_AutoComplete(value);
		});

		this.get('Guarantor').valueChanges.subscribe(value => {
			this.Guarantor_AutoComplete(value);
		});
	}

	fillForm(_ReceiveCard: ReceiveCard) {

		this.myForm.reset();

		this.myForm.patchValue({
			DocumentID: _ReceiveCard.DocumentID,
			DocumentCode: _ReceiveCard.DocumentCode,
			DocumentDate: _ReceiveCard.DocumentDate,
			DocumentNo: _ReceiveCard.DocumentNo,
			Notes: _ReceiveCard.Notes,
			XCardsOperationsTypeID: _ReceiveCard.XCardsOperationsTypeID,
			XCardsOperationsType: this.initObject(_ReceiveCard.XCardsOperationsType),
			GuarantorID: _ReceiveCard.GuarantorID,
			Guarantor: this.initObject(_ReceiveCard.Guarantor),
		});

		this.formArray('ReceiveCardDetail').reset();

		if (_ReceiveCard.ReceiveCardDetail != null) {
			_ReceiveCard.ReceiveCardDetail.forEach(_ReceiveCardDetail => {
				const fg: FormGroup = this.initReceiveCardDetail(_ReceiveCardDetail);
				this.formArray('ReceiveCardDetail').push(fg);
			});
		}

	}

	formArray(formArrayName: string): FormArray {
		return <FormArray>this.myForm.get(formArrayName);
	}

	formControl(formArrayName: string, formControlName: string, i: number): FormControl {
		return <FormControl>this.formArray(formArrayName).controls[i].get(formControlName);
	}

	initReceiveCardDetail = (_ReceiveCardDetail?: ReceiveCardDetail): FormGroup => {

		let fg: FormGroup;

		if (!_ReceiveCardDetail) {
			fg = this.formBuilder.group({
				ID: [''],
				CardID: [''], Card: ['', Validators.required],

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

				EstimatedValue: [''],
				BuyPrice: [''],
				DueValue: [''],
				CommissionPercent: [''],
				CommissionValue: [''],
				CommissionCurrencyID: [''], CommissionCurrency: [''],
				Status: 1
			});
		} else {
			fg = this.formBuilder.group({
				ID: this.formBuilder.control(_ReceiveCardDetail.ID),
				CardID: this.formBuilder.control(_ReceiveCardDetail.CardID),
				Card: this.initObject(_ReceiveCardDetail.Card),

				CardNo: _ReceiveCardDetail.CardNo,
				CardTypeID: _ReceiveCardDetail.CardTypeID,
				CardType: this.initObject(_ReceiveCardDetail.CardType),
				CardCode: _ReceiveCardDetail.CardCode,
				NameOnCard: _ReceiveCardDetail.NameOnCard,
				CardOwnerName: _ReceiveCardDetail.CardOwnerName,
				CardIssuerID: _ReceiveCardDetail.CardIssuerID,
				CardIssuer: this.initObject(_ReceiveCardDetail.CardIssuer),
				BankID: _ReceiveCardDetail.BankID,
				Bank: this.initObject(_ReceiveCardDetail.Bank),
				CardCurrencyID: _ReceiveCardDetail.CardCurrencyID,
				CardCurrency: this.initObject(_ReceiveCardDetail.CardCurrency),
				CardPin: _ReceiveCardDetail.CardPin,
				OwnerPhone: _ReceiveCardDetail.OwnerPhone,

				// CardPin: this.formBuilder.control(_ReceiveCardDetail.CardPin),
				EstimatedValue: this.formBuilder.control(_ReceiveCardDetail.EstimatedValue),
				BuyPrice: this.formBuilder.control(_ReceiveCardDetail.BuyPrice),
				DueValue: this.formBuilder.control(_ReceiveCardDetail.DueValue),
				CommissionPercent: this.formBuilder.control(_ReceiveCardDetail.CommissionPercent),
				CommissionValue: this.formBuilder.control(_ReceiveCardDetail.CommissionValue),
				CommissionCurrencyID: this.formBuilder.control(_ReceiveCardDetail.CommissionCurrencyID),
				CommissionCurrency: this.initObject(_ReceiveCardDetail.CommissionCurrency),
				Status: this.formBuilder.control(_ReceiveCardDetail.Status)
			});
		}

		fg.get('Card').valueChanges.subscribe(value => {
			this.Card_AutoComplete(value);
		});

		fg.get('CommissionCurrency').valueChanges.subscribe(value => {
			this.CommissionCurrency_AutoComplete(value);
		});
		
		fg.get('CardType').valueChanges.subscribe(value => {
			this.CardType_AutoComplete(value);
		});

		fg.get('CardIssuer').valueChanges.subscribe(value => {
			this.CardIssuer_AutoComplete(value);
		});

		fg.get('Bank').valueChanges.subscribe(value => {
			this.Bank_AutoComplete(value);
		});

		fg.get('CardCurrency').valueChanges.subscribe(value => {
			this.CardCurrency_AutoComplete(value);
		});

		return fg;
	}

	add_ReceiveCardDetail() {
		this.formArray('ReceiveCardDetail').push(this.initReceiveCardDetail());
	}

	remove_ReceiveCardDetail(index) {
		const control = this.formArray('ReceiveCardDetail').controls[index];
		const item: ReceiveCardDetail = control.value as ReceiveCardDetail;
		if (item.ID && item.Status !== 3) {
			item.Status = 3;
		} else if (item.ID && item.Status === 3) {
			item.Status = null;
		} else {
			this.formArray('ReceiveCardDetail').controls.splice(index, 1);
		}
	}

	Card_AutoComplete(name) {
		this._CardService.Card_Auto(name).subscribe(res => {
			this.CardList = res.Data;
		});
	}

	onCardChanged($event, index: number) {
		if ($event.option.value) {
			const selected: any = $event.option.value;

			
			// CardType
			selected.CardType = { ID: selected.CardTypeID, Name: selected.CardType_Name };
			// Bank
			selected.Bank = { ID: selected.BankID, Name: selected.Bank_Name };
			// CardCurrency
			selected.CardCurrency = { ID: selected.CardCurrencyID, Name: selected.CardCurrency_Name };
			// CardIssuer
			selected.CardIssuer = { ID: selected.CardIssuerID, Name: selected.CardIssuer_Name };

			this.formControl('ReceiveCardDetail', 'CardID', index).setValue(selected.ID);
			
			this.formControl('ReceiveCardDetail', 'Card', index).setValue(selected);

			this.formControl('ReceiveCardDetail', 'CardType', index).setValue(selected.CardType);
			this.formControl('ReceiveCardDetail', 'Bank', index).setValue(selected.Bank);
			this.formControl('ReceiveCardDetail', 'CardCurrency', index).setValue(selected.CardCurrency);
			this.formControl('ReceiveCardDetail', 'CardIssuer', index).setValue(selected.CardIssuer);
 			this.formControl('ReceiveCardDetail', 'CardCode', index).setValue(selected.CardCode);
			this.formControl('ReceiveCardDetail', 'CardPin', index).setValue(selected.CardPin);
			this.formControl('ReceiveCardDetail', 'CardNo', index).setValue(selected.CardNo);
			this.formControl('ReceiveCardDetail', 'CardCode', index).setValue(selected.CardCode);
			this.formControl('ReceiveCardDetail', 'NameOnCard', index).setValue(selected.NameOnCard);
			this.formControl('ReceiveCardDetail', 'OwnerPhone', index).setValue(selected.OwnerPhone);

		} else {
			// const dialogRef = this.dialog.open(CardsComponent, {
			// 	width: '70%',
			// 	data: { popup: true }
			// });

			// dialogRef.afterClosed().subscribe((res) => {
			// 	console.log('res', res);
			// 	// this.display();
			// 	// console.log('The dialog was closed', result);
			// 	// if (result) {
			// 	// }
			// });
		}
	}
	CommissionCurrency_AutoComplete(name) {
		this._CurrencyService.Currency_Auto(name).subscribe(res => {
			this.CommissionCurrencyList = res.Data;
		});
	}

	onCommissionCurrencyChanged($event, index: number) {
		const selected: Currency = $event.option.value as Currency;
		this.formControl('ReceiveCardDetail', 'CommissionCurrencyID', index).setValue(selected.ID);
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

	displayCardNo(obj?: any): string | undefined {
		return obj ? obj.CardNo : undefined;
	}

	get(name: string): FormControl {
		return this.myForm.get(name) as FormControl;
	}

	ngOnInit() {

		this.buildForm();

		this.route.params.subscribe((params: Params) => {
			this.ReceiveCard = new ReceiveCard();
			const Id: number = params.id as number;
			this.XCardsOperationsTypeID = params.XCardsOperationsTypeID;

			// if (this.OperationTypeID === "1") {
			// 	this.PageTitle = 'شراء البطاقات';
			// 	this.PageUrl = 'BuyCards';
			// } else if (this.OperationTypeID === "2") {
			// 	this.PageTitle = 'سحب البطاقات بنسبة';
			// 	this.PageUrl = 'CollectCardForPercent';
			// } else if (this.OperationTypeID === "3") {
			// 	this.PageTitle = 'سحب بطاقات بقيمة ثابتة';
			// 	this.PageUrl = 'CollectCardForValue';
			// }

			if (this.XCardsOperationsTypeID === "1") {
				this.PageTitle = 'شراء البطاقات';
				this._XObjectTypeEnum = XObjectTypeEnum.BuyCard;
				this.PageUrl = 'BuyCards';
			} else if (this.XCardsOperationsTypeID === "2") {
				this._XObjectTypeEnum = XObjectTypeEnum.CollectCardForPercent;
				this.PageTitle = 'سحب البطاقات بنسبة';
				this.PageUrl = 'CollectCardForPercents';
			} else if (this.XCardsOperationsTypeID === "3") {
				this._XObjectTypeEnum = XObjectTypeEnum.CollectCardForValue;
				this.PageTitle = 'سحب بطاقات بقيمة ثابتة';
				this.PageUrl = 'CollectCardForValues';
			}

			this.getById(Id);
		});

		// this.route.data.subscribe(data => {
		// 	this.XCardsOperationsTypeID = data.XCardsOperationsTypeID;
		// });

	}

	getById(Id: number) {

		this._ReceiveCardService.GetReceiveCard(Id).subscribe(res => {
			if (res === null) {
				this.ReceiveCard = null;
			} else {
				this.ReceiveCard = null;
				this.ReceiveCard = res;
				this.fillForm(this.ReceiveCard);
			}
		});

	}

	New() {
		this.ReceiveCard = new ReceiveCard();
		this.myForm.reset();
	}

	Save() {
		if (this.myForm.valid) {
			this.ReceiveCard = this.myForm.value;
			this.ReceiveCard.XObjectTypeID = this._XObjectTypeEnum;
			this.ReceiveCard.XCardsOperationsTypeID = this.XCardsOperationsTypeID;;
			this._ReceiveCardService.AddReceiveCard(this.ReceiveCard)
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
			this.ReceiveCard = this.myForm.value;
			this.ReceiveCard.XObjectTypeID = this._XObjectTypeEnum;
			this.ReceiveCard.XCardsOperationsTypeID = this.XCardsOperationsTypeID;;
			this._ReceiveCardService.UpdateReceiveCard(this.ReceiveCard)
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
				this._ReceiveCardService.DeleteReceiveCard(this.ReceiveCard.ID).subscribe(res => {
					if (!res.Success) {
						Messages.ShowMessag(res.Message, 'error');
					} else {
						this.ngOnInit();
					}
				});
			}
		});
	}

	XCardsOperationsType_AutoComplete(name?: string) {
		this._XCardsOperationsTypeService.XCardsOperationsType_Auto(name).subscribe(res => {
			this.XCardsOperationsTypeList = res.Data;
		});
	}

	onXCardsOperationsTypeChanged($event?: any) {
		if ($event) {
			const selected: any = $event.option.value;
			this.get('XCardsOperationsTypeID').setValue(selected.ID);
		} else {
			this.get('XCardsOperationsType').setValue(null);
			this.get('XCardsOperationsTypeID').setValue(null);
		}
	}

	Guarantor_AutoComplete(name?: string) {
		this._GuarantorService.Guarantor_Auto(name).subscribe(res => {
			this.GuarantorList = res.Data;
		});
	}

	onGuarantorChanged($event?: any) {
		if ($event) {
			const selected: any = $event.option.value;
			this.get('GuarantorID').setValue(selected.ID);
		} else {
			this.get('Guarantor').setValue(null);
			this.get('GuarantorID').setValue(null);
		}
	}

	BuyPrice_Changed(index: number) {
		let EstimatedValue = this.formControl('ReceiveCardDetail', 'EstimatedValue', index).value;
		let BuyPrice = this.formControl('ReceiveCardDetail', 'BuyPrice', index).value;
		let DueValue: any = EstimatedValue * BuyPrice;
		DueValue = parseFloat(DueValue).toFixed(2);
		this.formControl('ReceiveCardDetail', 'DueValue', index).setValue(DueValue);
	}

	CardType_AutoComplete(name?: string) {
		this._CardTypeService.CardType_Auto(name).subscribe(res => {
			this.CardTypeList = res.Data;
		});
	}

	onCardTypeChanged($event, index: number) {
		const selected: Currency = $event.option.value as Currency;
		this.formControl('ReceiveCardDetail', 'CardType', index).setValue(selected);
		this.formControl('ReceiveCardDetail', 'CardTypeID', index).setValue(selected.ID);
	}

	CardIssuer_AutoComplete(name?: string) {
		this._CardIssuerService.CardIssuer_Auto(name).subscribe(res => {
			this.CardIssuerList = res.Data;
		});
	}

	onCardIssuerChanged($event, index: number) {
		const selected: Currency = $event.option.value as Currency;
		this.formControl('ReceiveCardDetail', 'CardIssuer', index).setValue(selected);
		this.formControl('ReceiveCardDetail', 'CardIssuerID', index).setValue(selected.ID);
	}

	Bank_AutoComplete(name?: string) {
		this._BankService.Bank_Auto(name).subscribe(res => {
			this.BankList = res.Data;
		});
	}

	onBankChanged($event, index: number) {
		const selected: Currency = $event.option.value as Currency;
		this.formControl('ReceiveCardDetail', 'Bank', index).setValue(selected);
		this.formControl('ReceiveCardDetail', 'BankID', index).setValue(selected.ID);
	}

	CardCurrency_AutoComplete(name?: string) {
		this._CurrencyService.Currency_Auto(name).subscribe(res => {
			this.CardCurrencyList = res.Data;
		});
	}

	onCardCurrencyChanged($event, index: number) {
		const selected: Currency = $event.option.value as Currency;
		this.formControl('ReceiveCardDetail', 'CardCurrency', index).setValue(selected);
		this.formControl('ReceiveCardDetail', 'CardCurrencyID', index).setValue(selected.ID);
	}

	Card_TextChanged(CardNo, index) {
		debugger;
		this.formControl('ReceiveCardDetail', 'CardNo', index).setValue(CardNo);
	}

} // the end :)

