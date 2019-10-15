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
import { BackCardService } from '../../../services/CardsTransactions/BackCard.service';
import { BackCard } from '../../../models/CardsTransactions/BackCard';
import { BackCardDetailService } from '../../../services/CardsTransactions/BackCardDetail.service';
import { BackCardDetail } from '../../../models/CardsTransactions/BackCardDetail';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';
import { CardService } from '../../../services/CardsTransactions/Card.service';

@Component({
	selector: 'app-backcard',
	templateUrl: './BackCard.component.html',
	styleUrls: ['./BackCard.component.scss'],

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
export class BackCardComponent implements OnInit {
	public myForm: FormGroup;
	public BackCard: any;
	public RepresentativeList: any;
	// BackCardDetail
	public ReceiveCardDetailList: any;
	CardList: any;

	constructor(
		private _RepresentativeService: RepresentativeService,
		private _ReceiveCardDetailService: ReceiveCardDetailService,
		private _BackCardService: BackCardService,
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
			RepresentativeID: [''],
			Representative: ['', Validators.required],
			BackCardDetail: this.formBuilder.array([]),
		});

		this.get('Representative').valueChanges.subscribe(value => {
			this.Representative_AutoComplete(value);
		});
	}

	fillForm(_BackCard: BackCard) {

		this.myForm.reset();

		this.myForm.patchValue({
			DocumentID: _BackCard.DocumentID,
			DocumentCode: _BackCard.DocumentCode,
			DocumentDate: _BackCard.DocumentDate,
			DocumentNo: _BackCard.DocumentNo,
			Notes: _BackCard.Notes,
			RepresentativeID: _BackCard.RepresentativeID,
			Representative: this.initObject(_BackCard.Representative),
		});

		this.formArray('BackCardDetail').reset();

		if (_BackCard.BackCardDetail != null) {
			_BackCard.BackCardDetail.forEach(_BackCardDetail => {
				const fg: FormGroup = this.initBackCardDetail(_BackCardDetail);
				this.formArray('BackCardDetail').push(fg);
			});
		}


	}

	formArray(formArrayName: string): FormArray {
		return <FormArray>this.myForm.get(formArrayName);
	}

	formControl(formArrayName: string, formControlName: string, i: number): FormControl {
		return <FormControl>this.formArray(formArrayName).controls[i].get(formControlName);
	}

	initBackCardDetail = (_BackCardDetail?: BackCardDetail): FormGroup => {

		let fg: FormGroup;

		if (!_BackCardDetail) {
			fg = this.formBuilder.group({
				ID: [''],
				ReceiveCardDetailID: [''], 
				ReceiveCardDetail: ['', Validators.required],
				CardID: [''], Card: ['', Validators.required],
				Status: 1
			});
		} else {
			fg = this.formBuilder.group({
				ID: this.formBuilder.control(_BackCardDetail.ID),
				ReceiveCardDetailID: this.formBuilder.control(_BackCardDetail.ReceiveCardDetailID),
				ReceiveCardDetail: this.initObject(_BackCardDetail.ReceiveCardDetail),
				CardID: this.formBuilder.control(_BackCardDetail.CardID),
				Card: this.initObject(_BackCardDetail.Card),
				Status: this.formBuilder.control(_BackCardDetail.Status)
			});
		}
		fg.get('ReceiveCardDetail').valueChanges.subscribe(value => {
			this.ReceiveCardDetail_AutoComplete(value);
		});
		return fg;
	}

	add_BackCardDetail() {
		this.formArray('BackCardDetail').push(this.initBackCardDetail());
	}

	remove_BackCardDetail(index) {
		const control = this.formArray('BackCardDetail').controls[index];
		const item: BackCardDetail = control.value as BackCardDetail;
		if (item.ID && item.Status !== 3) {
			item.Status = 3;
		} else if (item.ID && item.Status === 3) {
			item.Status = null;
		} else {
			this.formArray('BackCardDetail').controls.splice(index, 1);
		}
	}

	ReceiveCardDetail_AutoComplete(name) {
		this._ReceiveCardDetailService.ReceiveCardDetail_Auto(name).subscribe(res => {
			this.ReceiveCardDetailList = res.Data;
		});
	}

	onReceiveCardDetailChanged($event, index: number) {
		const selected: ReceiveCardDetail = $event.option.value as ReceiveCardDetail;
		this.formControl('BackCardDetail', 'ReceiveCardDetailID', index).setValue(selected.ID);
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

		this.formControl('BackCardDetail', 'Card', index).setValue(selected);

		this.formControl('BackCardDetail', 'CardID', index).setValue(selected.ID);
	}
	
	displayCardNo(obj?: any): string | undefined {
		return obj ? obj.CardNo : undefined;
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
			this.BackCard = new BackCard();
			const Id: number = params.id as number;
			this.getById(Id);
		});


	}

	getById(Id: number) {

		this._BackCardService.GetBackCard(Id).subscribe(res => {
			if (res === null) {
				this.BackCard = null;
			} else {
				this.BackCard = null;
				this.BackCard = res;
				this.fillForm(this.BackCard);
			}
		});

	}

	New() {
		this.BackCard = new BackCard();
		this.myForm.reset();
	}

	Save() {
		if (this.myForm.valid) {
			this.BackCard = this.myForm.value;
			this.BackCard.XObjectTypeID = XObjectTypeEnum.BackCard;
			this._BackCardService.AddBackCard(this.BackCard)
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
			this.BackCard = this.myForm.value;
			this.BackCard.XObjectTypeID = XObjectTypeEnum.BackCard;
			this._BackCardService.UpdateBackCard(this.BackCard)
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
				this._BackCardService.DeleteBackCard(this.BackCard.ID).subscribe(res => {
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


} // the end :)

