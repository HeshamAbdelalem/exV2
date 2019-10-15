import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormService } from '../../../services/FormService';
import { Messages } from '../../../enums/Messages';
import Swal from 'sweetalert2';

import { GuarantorService } from '../../../services/Masters/Guarantor.service';
import { Guarantor } from '../../../models/Masters/Guarantor';
import { ReceiveCardDetailService } from '../../../services/CardsTransactions/ReceiveCardDetail.service';
import { ReceiveCardDetail } from '../../../models/CardsTransactions/ReceiveCardDetail';
import { DeliveryCardService } from '../../../services/CardsTransactions/DeliveryCard.service';
import { DeliveryCard } from '../../../models/CardsTransactions/DeliveryCard';
import { DeliveryCardDetailService } from '../../../services/CardsTransactions/DeliveryCardDetail.service';
import { DeliveryCardDetail } from '../../../models/CardsTransactions/DeliveryCardDetail';
import { CardService } from '../../../services/CardsTransactions/Card.service';
import { Card } from '../../../models/CardsTransactions/Card';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';


import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';

@Component({
	selector: 'app-deliverycard',
	templateUrl: './DeliveryCard.component.html',
	styleUrls: ['./DeliveryCard.component.scss'],

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
export class DeliveryCardComponent implements OnInit {
	public myForm: FormGroup;
	public DeliveryCard: any;
	public GuarantorList: any;
	// DeliveryCardDetail
	public ReceiveCardDetailList: any;
	// DeliveryCardDetail
	public CardList: any;

	constructor(

		private _GuarantorService: GuarantorService,
		private _ReceiveCardDetailService: ReceiveCardDetailService,
		private _DeliveryCardService: DeliveryCardService,
		private _DeliveryCardDetailService: DeliveryCardDetailService,
		private _CardService: CardService,
		public formBuilder: FormBuilder,
		private _FormService: FormService,
		private router: Router,
		private route: ActivatedRoute,
	) {

	}

	buildForm() {

		this.myForm = this.formBuilder.group({
			DocumentID: [''],
			DocumentCode: [''],
			DocumentDate: [new Date(), Validators.required],
			DocumentNo: [''],
			Notes: [''],
			GuarantorID: [''],
			Guarantor: ['', Validators.required],
			DeliveryCardDetail: this.formBuilder.array([]),
		});

		this.get('Guarantor').valueChanges.subscribe(value => {
			this.Guarantor_AutoComplete(value);
		});
	}

	fillForm(_DeliveryCard: DeliveryCard) {

		this.myForm.reset();

		this.myForm.patchValue({
			DocumentID: _DeliveryCard.DocumentID,
			DocumentCode: _DeliveryCard.DocumentCode,
			DocumentDate: _DeliveryCard.DocumentDate,
			DocumentNo: _DeliveryCard.DocumentNo,
			Notes: _DeliveryCard.Notes,
			GuarantorID: _DeliveryCard.GuarantorID,
			Guarantor: this.initObject(_DeliveryCard.Guarantor),
		});

		this.formArray('DeliveryCardDetail').reset();

		if (_DeliveryCard.DeliveryCardDetail != null) {
			_DeliveryCard.DeliveryCardDetail.forEach(_DeliveryCardDetail => {
				const fg: FormGroup = this.initDeliveryCardDetail(_DeliveryCardDetail);
				this.formArray('DeliveryCardDetail').push(fg);
			});
		}


	}

	formArray(formArrayName: string): FormArray {
		return <FormArray>this.myForm.get(formArrayName);
	}

	formControl(formArrayName: string, formControlName: string, i: number): FormControl {
		return <FormControl>this.formArray(formArrayName).controls[i].get(formControlName);
	}

	initDeliveryCardDetail = (_DeliveryCardDetail?: DeliveryCardDetail): FormGroup => {

		let fg: FormGroup;

		if (!_DeliveryCardDetail) {
			fg = this.formBuilder.group({
				ID: [''],
				ReceiveCardDetailID: [''], 
				ReceiveCardDetail: [''],
				CardID: [''], Card: ['', Validators.required],
				Status: 1
			});
		} else {
			fg = this.formBuilder.group({
				ID: this.formBuilder.control(_DeliveryCardDetail.ID),
				ReceiveCardDetailID: this.formBuilder.control(_DeliveryCardDetail.ReceiveCardDetailID),
				ReceiveCardDetail: this.initObject(_DeliveryCardDetail.ReceiveCardDetail),
				CardID: this.formBuilder.control(_DeliveryCardDetail.CardID),
				Card: this.initObject(_DeliveryCardDetail.Card),
				Status: this.formBuilder.control(_DeliveryCardDetail.Status)
			});
		}
		fg.get('ReceiveCardDetail').valueChanges.subscribe(value => {
			this.ReceiveCardDetail_AutoComplete(value);
		});
		fg.get('Card').valueChanges.subscribe(value => {
			this.Card_AutoComplete(value);
		});
		return fg;
	}

	add_DeliveryCardDetail() {
		this.formArray('DeliveryCardDetail').push(this.initDeliveryCardDetail());
	}

	remove_DeliveryCardDetail(index) {
		const control = this.formArray('DeliveryCardDetail').controls[index];
		const item: DeliveryCardDetail = control.value as DeliveryCardDetail;
		if (item.ID && item.Status !== 3) {
			item.Status = 3;
		} else if (item.ID && item.Status === 3) {
			item.Status = null;
		} else {
			this.formArray('DeliveryCardDetail').controls.splice(index, 1);
		}
	}

	ReceiveCardDetail_AutoComplete(name) {
		this._ReceiveCardDetailService.ReceiveCardDetail_Auto(name).subscribe(res => {
			this.ReceiveCardDetailList = res.Data;
		});
	}

	onReceiveCardDetailChanged($event, index: number) {
		const selected: ReceiveCardDetail = $event.option.value as ReceiveCardDetail;
		this.formControl('DeliveryCardDetail', 'ReceiveCardDetailID', index).setValue(selected.ID);
	}

	Card_AutoComplete(name) {
		this._CardService.Card_Auto(name).subscribe(res => {
			this.CardList = res.Data;
		});
	}

	onCardChanged($event, index: number) {
		// const selected: Card = $event.option.value as Card;
		// this.formControl('DeliveryCardDetail', 'CardID', index).setValue(selected.ID);

		const selected: any = $event.option.value;

		// Bank
		selected.Bank = { Name: selected.Bank_Name };
		// CardCurrency
		selected.CardCurrency = { Name: selected.CardCurrency_Name };
		// CardIssuer
		selected.CardIssuer = { Name: selected.CardIssuer_Name };
		// CardType
		selected.CardType = { Name: selected.CardType_Name };

		this.formControl('DeliveryCardDetail', 'Card', index).setValue(selected);

		this.formControl('DeliveryCardDetail', 'CardID', index).setValue(selected.ID);
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
			this.DeliveryCard = new DeliveryCard();
			const Id: number = params.id as number;
			this.getById(Id);
		});


	}

	getById(Id: number) {

		this._DeliveryCardService.GetDeliveryCard(Id).subscribe(res => {
			if (res === null) {
				this.DeliveryCard = null;
			} else {
				this.DeliveryCard = null;
				this.DeliveryCard = res;
				this.fillForm(this.DeliveryCard);
			}
		});

	}

	New() {
		this.DeliveryCard = new DeliveryCard();
		this.myForm.reset();
	}

	Save() {
		if (this.myForm.valid) {
			this.DeliveryCard = this.myForm.value;
			this.DeliveryCard.XObjectTypeID = XObjectTypeEnum.DeliveryCard;
			this._DeliveryCardService.AddDeliveryCard(this.DeliveryCard)
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
			this.DeliveryCard = this.myForm.value;
			this.DeliveryCard.XObjectTypeID = XObjectTypeEnum.DeliveryCard;
			this._DeliveryCardService.UpdateDeliveryCard(this.DeliveryCard)
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
				this._DeliveryCardService.DeleteDeliveryCard(this.DeliveryCard.ID).subscribe(res => {
					if (!res.Success) {
						Messages.ShowMessag(res.Message, 'error');
					} else {
						this.ngOnInit();
					}
				});
			}
		});
	}

	Guarantor_AutoComplete(term?: string) {
		this._GuarantorService.Guarantor_Auto(term).subscribe(res => {
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


} // the end :)

