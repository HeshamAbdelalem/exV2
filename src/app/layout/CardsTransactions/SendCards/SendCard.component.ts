import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormService } from '../../../services/FormService';
import { Messages } from '../../../enums/Messages';
import Swal from 'sweetalert2';

import { RepresentativeService } from '../../../services/Masters/Representative.service';
import { Representative } from '../../../models/Masters/Representative';
import { ReceiveCardDetailService } from '../../../services/CardsTransactions/ReceiveCardDetail.service';
import { ReceiveCardDetail } from '../../../models/CardsTransactions/ReceiveCardDetail';
import { SendCardService } from '../../../services/CardsTransactions/SendCard.service';
import { SendCard } from '../../../models/CardsTransactions/SendCard';
import { SendCardDetailService } from '../../../services/CardsTransactions/SendCardDetail.service';
import { SendCardDetail } from '../../../models/CardsTransactions/SendCardDetail';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';

import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';
import { CardComponent } from '../Cards/Card.component';
import { CardService } from '../../../services/CardsTransactions/Card.service';
// import { CardSearchComponent } from '../card-search/card-search.component';
import { CardsComponent } from '../Cards/Cards.component';
// import { CardsSearchComponent } from '../CardsSearch/CardsSearch.component';
// import { CardsSearchComponent } from '../CardsTransactions/CardsSearch.component';

@Component({
	selector: 'app-sendcard',
	templateUrl: './SendCard.component.html',
	styleUrls: ['./SendCard.component.scss'],

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
export class SendCardComponent implements OnInit {
	public myForm: FormGroup;
	public SendCard: any;
	public RepresentativeList: any;
	// SendCardDetail
	public ReceiveCardDetailList: any;
	CardList: any;

	constructor(
		private _RepresentativeService: RepresentativeService,
		private _ReceiveCardDetailService: ReceiveCardDetailService,
		private _SendCardService: SendCardService,
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
			RepresentativeID: [''],
			Representative: ['', Validators.required],
			SendCardDetail: this.formBuilder.array([]),
		});

		this.get('Representative').valueChanges.subscribe(value => {
			this.Representative_AutoComplete(value);
		});
	}
	fillForm(_SendCard: SendCard) {

		this.myForm.reset();

		this.myForm.patchValue({
			DocumentID: _SendCard.DocumentID,
			DocumentCode: _SendCard.DocumentCode,
			DocumentDate: _SendCard.DocumentDate,
			DocumentNo: _SendCard.DocumentNo,
			Notes: _SendCard.Notes,
			RepresentativeID: _SendCard.RepresentativeID,
			Representative: this.initObject(_SendCard.Representative),
		});

		this.formArray('SendCardDetail').reset();

		if (_SendCard.SendCardDetail != null) {
			_SendCard.SendCardDetail.forEach(_SendCardDetail => {
				const fg: FormGroup = this.initSendCardDetail(_SendCardDetail);
				this.formArray('SendCardDetail').push(fg);
			});
		}


	}

	formArray(formArrayName: string): FormArray {
		return <FormArray>this.myForm.get(formArrayName);
	}

	formControl(formArrayName: string, formControlName: string, i: number): FormControl {
		return <FormControl>this.formArray(formArrayName).controls[i].get(formControlName);
	}

	initSendCardDetail = (_SendCardDetail?: SendCardDetail): FormGroup => {

		let fg: FormGroup;

		if (!_SendCardDetail) {
			fg = this.formBuilder.group({
				ID: [''],
				ReceiveCardDetailID: [''],
				ReceiveCardDetail: ['', Validators.required],
				Card: [''],
				Status: 1
			});
		} else {
			fg = this.formBuilder.group({
				ID: this.formBuilder.control(_SendCardDetail.ID),
				ReceiveCardDetailID: this.formBuilder.control(_SendCardDetail.ReceiveCardDetailID),
				ReceiveCardDetail: this.initObject(_SendCardDetail.ReceiveCardDetail),		
				CardID: this.formBuilder.control(_SendCardDetail.CardID),
				Card: this.initObject(_SendCardDetail.Card),
				Status: this.formBuilder.control(_SendCardDetail.Status)
			});
		}
		fg.get('ReceiveCardDetail').valueChanges.subscribe(value => {
			this.ReceiveCardDetail_AutoComplete(value);
		});
		return fg;
	}

	add_SendCardDetail() {
		this.formArray('SendCardDetail').push(this.initSendCardDetail());
	}

	remove_SendCardDetail(index) {
		const control = this.formArray('SendCardDetail').controls[index];
		const item: SendCardDetail = control.value as SendCardDetail;
		if (item.ID && item.Status !== 3) {
			item.Status = 3;
		} else if (item.ID && item.Status === 3) {
			item.Status = null;
		} else {
			this.formArray('SendCardDetail').controls.splice(index, 1);
		}
	}

	ReceiveCardDetail_AutoComplete(name?: string) {
		this._ReceiveCardDetailService.ReceiveCardDetail_Auto(name).subscribe(res => {
			this.ReceiveCardDetailList = res.Data;
		});
	}

	onReceiveCardDetailChanged($event, index: number) {
		
		const selected: any = $event.option.value;

		this.formControl('SendCardDetail', 'ReceiveCardDetailID', index).setValue(selected.ID);

		let Card: any = {};
		// Bank
		Card.Bank = { Name: selected.Card_Bank_Name };
		// CardCurrency
		Card.CardCurrency = { Name: selected.Card_CardCurrency_Name };
		// CardIssuer
		Card.CardIssuer = { Name: selected.Card_CardIssuer_Name };
		// CardType
		Card.CardType = { Name: selected.Card_CardType_Name };
		// CardID 
		Card.ID = selected.CardID;
		// CardNo
		Card.CardNo = selected.Card_CardNo;
		// CardCode
		Card.CardCode = selected.Card_CardCode; 
		// NameOnCard
		Card.NameOnCard = selected.Card_NameOnCard; 
		// CardOwnerName
		Card.CardOwnerName = selected.Card_CardOwnerName; 
		// CardPin
		Card.CardPin = selected.Card_CardPin;
		
		this.formControl('SendCardDetail', 'Card', index).setValue(Card);

		selected.Card = Card;
		this.formControl('SendCardDetail', 'ReceiveCardDetail', index).setValue(selected);
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
			this.SendCard = new SendCard();
			const Id: number = params.id as number;
			this.getById(Id);
		});


	}

	getById(Id: number) {

		this._SendCardService.GetSendCard(Id).subscribe(res => {
			if (res === null) {
				this.SendCard = null;
			} else {
				this.SendCard = null;
				this.SendCard = res;
				this.fillForm(this.SendCard);
			}
		});

	}

	New() {
		this.SendCard = new SendCard();
		this.myForm.reset();
	}

	Save() {
		if (this.myForm.valid) {
			this.SendCard = this.myForm.value;
			this.SendCard.XObjectTypeID = XObjectTypeEnum.SendCard;
			this._SendCardService.AddSendCard(this.SendCard)
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
			this.SendCard = this.myForm.value;
			this.SendCard.XObjectTypeID = XObjectTypeEnum.SendCard;
			this._SendCardService.UpdateSendCard(this.SendCard)
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
				this._SendCardService.DeleteSendCard(this.SendCard.ID).subscribe(res => {
					if (!res.Success) {
						Messages.ShowMessag(res.Message, 'error');
					} else {
						this.ngOnInit();
					}
				});
			}
		});
	}

	Representative_AutoComplete(term?: string) {
		this._RepresentativeService.Representative_Auto(term).subscribe(res => {
			this.RepresentativeList = res.Data;
		});
	}

	onRepresentativeChanged($event?: any) {
		if ($event) {
			const selected: any = $event.option.value;
			this.get('RepresentativeID').setValue(selected.ID);
		} else {
			this.get('Representative').setValue(null);
			this.get('RepresentativeID').setValue(null);
		}
	}

	OpenCardsSearch() {
		const dialogRef = this.dialog.open(CardsComponent, {
			width: '70%',
			data: { popup: true }
		});

		dialogRef.afterClosed().subscribe((res) => {
			console.log('res', res);
			// this.display();
			// console.log('The dialog was closed', result);
			// if (result) {
			// }
		});
	}


	Card_AutoComplete(name) {
		this._CardService.Card_Auto(name).subscribe(res => {
			this.CardList = res.Data;
		});
	}

	onCardChanged($event, index: number) {
		const selected: any = $event.option.value;

		// Bank
		selected.Bank = { Name: selected.Bank_Name };
		// CardCurrency
		selected.CardCurrency = { Name: selected.CardCurrency_Name };
		// CardIssuer
		selected.CardIssuer = { Name: selected.CardIssuer_Name };
		// CardType
		selected.CardType = { Name: selected.CardType_Name };

		this.formControl('SendCardDetail', 'Card', index).setValue(selected);
		this.formControl('SendCardDetail', 'CardID', index).setValue(selected.ID);
	}

	displayCardNo(obj?: any): string | undefined {
		return obj ? obj.CardNo : undefined;
	}


} // the end :)