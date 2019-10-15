import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormService } from '../../../services/FormService';
import { Messages } from '../../../enums/Messages';
import Swal from 'sweetalert2';

import { ReceiveCardService } from '../../../services/CardsTransactions/ReceiveCard.service';
import { ReceiveCard } from '../../../models/CardsTransactions/ReceiveCard';
import { ReceiveCardDetailService } from '../../../services/CardsTransactions/ReceiveCardDetail.service';
import { ReceiveCardDetail } from '../../../models/CardsTransactions/ReceiveCardDetail';
import { CardPaymentService } from '../../../services/CardsTransactions/CardPayment.service';
import { CardPayment } from '../../../models/CardsTransactions/CardPayment';
import { CardPaymentDetailService } from '../../../services/CardsTransactions/CardPaymentDetail.service';
import { CardPaymentDetail } from '../../../models/CardsTransactions/CardPaymentDetail';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';


import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';

@Component({
	selector: 'app-cardpayment',
	templateUrl: './CardPayment.component.html',
	styleUrls: ['./CardPayment.component.scss'],

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
export class CardPaymentComponent implements OnInit {
	public myForm: FormGroup;
	public CardPayment: any;
	public ReceiveCardList: any;
	// CardPaymentDetail
	public ReceiveCardDetailList: any;

	constructor(

		private _ReceiveCardService: ReceiveCardService,
		private _ReceiveCardDetailService: ReceiveCardDetailService,
		private _CardPaymentService: CardPaymentService,
		private _CardPaymentDetailService: CardPaymentDetailService,
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
			ReceiveCardID: [''],
			TotalPaid: [''],
			ReceiveCard: ['', Validators.required],
			CardPaymentDetail: this.formBuilder.array([]),
		});

		this.get('ReceiveCard').valueChanges.subscribe(value => {
			this.ReceiveCard_AutoComplete(value);
		});
	}
	fillForm(_CardPayment: CardPayment) {

		this.myForm.reset();

		this.myForm.patchValue({
			DocumentID: _CardPayment.DocumentID,
			DocumentCode: _CardPayment.DocumentCode,
			DocumentDate: _CardPayment.DocumentDate,
			DocumentNo: _CardPayment.DocumentNo,
			Notes: _CardPayment.Notes,
			ReceiveCardID: _CardPayment.ReceiveCardID,
			ReceiveCard: this.initObject(_CardPayment.ReceiveCard),
			TotalPaid: _CardPayment.TotalPaid,
		});

		this.formArray('CardPaymentDetail').reset();

		if (_CardPayment.CardPaymentDetail != null) {
			_CardPayment.CardPaymentDetail.forEach(_CardPaymentDetail => {
				const fg: FormGroup = this.initCardPaymentDetail(_CardPaymentDetail);
				this.formArray('CardPaymentDetail').push(fg);
			});
		}


	}

	formArray(formArrayName: string): FormArray {
		return <FormArray>this.myForm.get(formArrayName);
	}

	formControl(formArrayName: string, formControlName: string, i: number): FormControl {
		return <FormControl>this.formArray(formArrayName).controls[i].get(formControlName);
	}
	initCardPaymentDetail = (_CardPaymentDetail?: CardPaymentDetail): FormGroup => {

		let fg: FormGroup;

		if (!_CardPaymentDetail) {
			fg = this.formBuilder.group({
				ID: [''],
				ReceiveCardDetailID: [''], ReceiveCardDetail: ['', Validators.required],
				Value: ['', Validators.required],
				Status: 1
			});
		} else {
			fg = this.formBuilder.group({
				ID: this.formBuilder.control(_CardPaymentDetail.ID),
				ReceiveCardDetailID: this.formBuilder.control(_CardPaymentDetail.ReceiveCardDetailID),
				ReceiveCardDetail: this.initObject(_CardPaymentDetail.ReceiveCardDetail),
				Value: this.formBuilder.control(_CardPaymentDetail.Value),
				Status: this.formBuilder.control(_CardPaymentDetail.Status)
			});
		}
		fg.get('ReceiveCardDetail').valueChanges.subscribe(value => {
			this.ReceiveCardDetail_AutoComplete(value);
		});
		return fg;
	}

	add_CardPaymentDetail() {
		this.formArray('CardPaymentDetail').push(this.initCardPaymentDetail());
	}

	remove_CardPaymentDetail(index) {
		const control = this.formArray('CardPaymentDetail').controls[index];
		const item: CardPaymentDetail = control.value as CardPaymentDetail;
		if (item.ID && item.Status !== 3) {
			item.Status = 3;
		} else if (item.ID && item.Status === 3) {
			item.Status = null;
		} else {
			this.formArray('CardPaymentDetail').controls.splice(index, 1);
		}
	}
	ReceiveCardDetail_AutoComplete(name) {
		this._ReceiveCardDetailService.ReceiveCardDetail_Auto(name).subscribe(res => {
			this.ReceiveCardDetailList = res.Data;
		});
	}

	onReceiveCardDetailChanged($event, index: number) {
		const selected: ReceiveCardDetail = $event.option.value as ReceiveCardDetail;
		this.formControl('CardPaymentDetail', 'ReceiveCardDetailID', index).setValue(selected.ID);
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
			this.CardPayment = new CardPayment();
			const Id: number = params.id as number;
			this.getById(Id);
		});


	}

	getById(Id: number) {

		this._CardPaymentService.GetCardPayment(Id).subscribe(res => {
			if (res === null) {
				this.CardPayment = null;
			} else {
				this.CardPayment = null;
				this.CardPayment = res;
				this.fillForm(this.CardPayment);
			}
		});

	}

	New() {
		this.CardPayment = new CardPayment();
		this.myForm.reset();
	}

	Save() {
		if (this.myForm.valid) {
			this.CardPayment = this.myForm.value;
			this.CardPayment.XObjectTypeID = XObjectTypeEnum.CardPayment;
			this._CardPaymentService.AddCardPayment(this.CardPayment)
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
			this.CardPayment = this.myForm.value;
			this.CardPayment.XObjectTypeID = XObjectTypeEnum.CardPayment;
			this._CardPaymentService.UpdateCardPayment(this.CardPayment)
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
				this._CardPaymentService.DeleteCardPayment(this.CardPayment.ID).subscribe(res => {
					if (!res.Success) {
						Messages.ShowMessag(res.Message, 'error');
					} else {
						this.ngOnInit();
					}
				});
			}
		});
	}
	
	ReceiveCard_AutoComplete(name?: string) {
		this._ReceiveCardService.ReceiveCard_Auto(name).subscribe(res => {
			this.ReceiveCardList = res.Data;
		});
	}

	onReceiveCardChanged($event?: any) {
		if ($event) {
			const selected: any = $event.option.value;
			this.get('ReceiveCardID').setValue(selected.ID);
		} else {
			this.get('ReceiveCard').setValue(null);
			this.get('ReceiveCardID').setValue(null);
		}
	}

	displayReceiveCardText(obj?: any): string | undefined {
		return obj ? obj.DocumentCode : undefined;
	}

	

} // the end :)

