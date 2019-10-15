import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormService } from '../../../services/FormService';
import { Messages } from '../../../enums/Messages';
import Swal from 'sweetalert2';

import { XCardProblemService } from '../../../services/Lookups/XCardProblem.service';
import { XCardProblem } from '../../../models/Lookups/XCardProblem';
import { CurrencyService } from '../../../services/Masters/Currency.service';
import { Currency } from '../../../models/Masters/Currency';
import { RepresentativeService } from '../../../services/Masters/Representative.service';
import { Representative } from '../../../models/Masters/Representative';
import { ReceiveCardDetailService } from '../../../services/CardsTransactions/ReceiveCardDetail.service';
import { ReceiveCardDetail } from '../../../models/CardsTransactions/ReceiveCardDetail';
import { DrawCardService } from '../../../services/CardsTransactions/DrawCard.service';
import { DrawCard } from '../../../models/CardsTransactions/DrawCard';
import { DrawCurrencyConversionService } from '../../../services/CardsTransactions/DrawCurrencyConversion.service';
import { DrawCurrencyConversion } from '../../../models/CardsTransactions/DrawCurrencyConversion';
import { DrawCardDetailService } from '../../../services/CardsTransactions/DrawCardDetail.service';
import { DrawCardDetail } from '../../../models/CardsTransactions/DrawCardDetail';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';
import { CardService } from '../../../services/CardsTransactions/Card.service';

@Component({
	selector: 'app-drawcard',
	templateUrl: './DrawCard.component.html',
	styleUrls: ['./DrawCard.component.scss'],
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

export class DrawCardComponent implements OnInit {
	public myForm: FormGroup;
	public DrawCard: any;
	public DrawCurrencyList: any;
	public RepresentativeList: any;
	// DrawCurrencyConversion
	public CurrencyList: any;
	// DrawCardDetail
	public ReceiveCardDetailList: any;
	// DrawCardDetail
	public XCardProblemList: any;
	CardList: any;

	constructor(

		private _XCardProblemService: XCardProblemService,
		private _CurrencyService: CurrencyService,
		private _RepresentativeService: RepresentativeService,
		private _ReceiveCardDetailService: ReceiveCardDetailService,
		private _DrawCardService: DrawCardService,
		private _DrawCurrencyConversionService: DrawCurrencyConversionService,
		private _DrawCardDetailService: DrawCardDetailService,
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
			Notes: [''],
			DocumentNo: [''],
			DrawCurrencyID: [''],
			RepresentativeID: [''],
			DrawCurrency: ['', Validators.required],
			Representative: ['', Validators.required],
			DrawCurrencyConversion: this.formBuilder.array([]),
			DrawCardDetail: this.formBuilder.array([]),
		});

		this.get('DrawCurrency').valueChanges.subscribe(value => {
			this.DrawCurrency_AutoComplete(value);
		});

		this.get('Representative').valueChanges.subscribe(value => {
			this.Representative_AutoComplete(value);
		});
	}

	fillForm(_DrawCard: DrawCard) {

		this.myForm.reset();

		this.myForm.patchValue({
			DocumentID: _DrawCard.DocumentID,
			DocumentCode: _DrawCard.DocumentCode,
			DocumentDate: _DrawCard.DocumentDate,
			Notes: _DrawCard.Notes,
			DocumentNo: _DrawCard.DocumentNo,
			DrawCurrencyID: _DrawCard.DrawCurrencyID,
			DrawCurrency: this.initObject(_DrawCard.DrawCurrency),
			RepresentativeID: _DrawCard.RepresentativeID,
			Representative: this.initObject(_DrawCard.Representative),
		});

		this.formArray('DrawCurrencyConversion').reset();

		if (_DrawCard.DrawCurrencyConversion != null) {
			_DrawCard.DrawCurrencyConversion.forEach(_DrawCurrencyConversion => {
				const fg: FormGroup = this.initDrawCurrencyConversion(_DrawCurrencyConversion);
				this.formArray('DrawCurrencyConversion').push(fg);
			});
		}


		this.formArray('DrawCardDetail').reset();

		if (_DrawCard.DrawCardDetail != null) {
			_DrawCard.DrawCardDetail.forEach(_DrawCardDetail => {
				const fg: FormGroup = this.initDrawCardDetail(_DrawCardDetail);
				this.formArray('DrawCardDetail').push(fg);
			});
		}


	}

	formArray(formArrayName: string): FormArray {
		return <FormArray>this.myForm.get(formArrayName);
	}

	formControl(formArrayName: string, formControlName: string, i: number): FormControl {
		return <FormControl>this.formArray(formArrayName).controls[i].get(formControlName);
	}

	initDrawCurrencyConversion = (_DrawCurrencyConversion?: DrawCurrencyConversion): FormGroup => {

		let fg: FormGroup;

		if (!_DrawCurrencyConversion) {
			fg = this.formBuilder.group({
				ID: [''],
				CurrencyID: [''], Currency: ['', Validators.required],
				ConversionRate: ['', Validators.required],
				Status: 1
			});
		} else {
			fg = this.formBuilder.group({
				ID: this.formBuilder.control(_DrawCurrencyConversion.ID),
				CurrencyID: this.formBuilder.control(_DrawCurrencyConversion.CurrencyID),
				Currency: this.initObject(_DrawCurrencyConversion.Currency),
				ConversionRate: this.formBuilder.control(_DrawCurrencyConversion.ConversionRate),
				Status: this.formBuilder.control(_DrawCurrencyConversion.Status)
			});
		}
		fg.get('Currency').valueChanges.subscribe(value => {
			this.Currency_AutoComplete(value);
		});
		return fg;
	}

	add_DrawCurrencyConversion() {
		this.formArray('DrawCurrencyConversion').push(this.initDrawCurrencyConversion());
	}

	remove_DrawCurrencyConversion(index) {
		const control = this.formArray('DrawCurrencyConversion').controls[index];
		const item: DrawCurrencyConversion = control.value as DrawCurrencyConversion;
		if (item.ID && item.Status !== 3) {
			item.Status = 3;
		} else if (item.ID && item.Status === 3) {
			item.Status = null;
		} else {
			this.formArray('DrawCurrencyConversion').controls.splice(index, 1);
		}
	}
	Currency_AutoComplete(name) {
		this._CurrencyService.Currency_Auto(name).subscribe(res => {
			this.CurrencyList = res.Data;
		});
	}

	onCurrencyChanged($event, index: number) {
		const selected: Currency = $event.option.value as Currency;
		this.formControl('DrawCurrencyConversion', 'CurrencyID', index).setValue(selected.ID);
	}

	initDrawCardDetail = (_DrawCardDetail?: DrawCardDetail): FormGroup => {

		let fg: FormGroup;

		if (!_DrawCardDetail) {
			fg = this.formBuilder.group({
				ID: [''],
				ReceiveCardDetailID: [''], 
				ReceiveCardDetail: ['', Validators.required],
				CardID: [''], 
				Card: ['', Validators.required],
				XCardProblemID: [''], XCardProblem: [''],
				DrawValue: ['', Validators.required],
				DrawValueInCadCurrency: [''],
				DrawValueTotal: [''],
				ActualBalance: [''],
				DrawingIsDone: [''],
				Status: 1
			});
		} else {
			fg = this.formBuilder.group({
				ID: this.formBuilder.control(_DrawCardDetail.ID),
				ReceiveCardDetailID: this.formBuilder.control(_DrawCardDetail.ReceiveCardDetailID),
				ReceiveCardDetail: this.initObject(_DrawCardDetail.ReceiveCardDetail),
				CardID: this.formBuilder.control(_DrawCardDetail.CardID),
				Card: this.initObject(_DrawCardDetail.Card),
				XCardProblemID: this.formBuilder.control(_DrawCardDetail.XCardProblemID),
				XCardProblem: this.initObject(_DrawCardDetail.XCardProblem),
				DrawValue: this.formBuilder.control(_DrawCardDetail.DrawValue),
				DrawValueInCadCurrency: this.formBuilder.control(_DrawCardDetail.DrawValueInCadCurrency),
				DrawValueTotal: this.formBuilder.control(_DrawCardDetail.DrawValueTotal),
				ActualBalance: this.formBuilder.control(_DrawCardDetail.ActualBalance),
				DrawingIsDone: this.formBuilder.control(_DrawCardDetail.DrawingIsDone),
				Status: this.formBuilder.control(_DrawCardDetail.Status)
			});
		}
		fg.get('ReceiveCardDetail').valueChanges.subscribe(value => {
			this.ReceiveCardDetail_AutoComplete(value);
		});
		fg.get('XCardProblem').valueChanges.subscribe(value => {
			this.XCardProblem_AutoComplete(value);
		});
		return fg;
	}

	add_DrawCardDetail() {
		this.formArray('DrawCardDetail').push(this.initDrawCardDetail());
	}

	remove_DrawCardDetail(index) {
		const control = this.formArray('DrawCardDetail').controls[index];
		const item: DrawCardDetail = control.value as DrawCardDetail;
		if (item.ID && item.Status !== 3) {
			item.Status = 3;
		} else if (item.ID && item.Status === 3) {
			item.Status = null;
		} else {
			this.formArray('DrawCardDetail').controls.splice(index, 1);
		}
	}
	ReceiveCardDetail_AutoComplete(name) {
		this._ReceiveCardDetailService.ReceiveCardDetail_Auto(name).subscribe(res => {
			this.ReceiveCardDetailList = res.Data;
		});
	}

	onReceiveCardDetailChanged($event, index: number) {
		const selected: ReceiveCardDetail = $event.option.value as ReceiveCardDetail;
		this.formControl('DrawCardDetail', 'ReceiveCardDetailID', index).setValue(selected.ID);
	}
	XCardProblem_AutoComplete(name) {
		this._XCardProblemService.XCardProblem_Auto(name).subscribe(res => {
			this.XCardProblemList = res.Data;
		});
	}

	onXCardProblemChanged($event, index: number) {
		const selected: XCardProblem = $event.option.value as XCardProblem;
		this.formControl('DrawCardDetail', 'XCardProblemID', index).setValue(selected.ID);
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
			this.DrawCard = new DrawCard();
			const Id: number = params.id as number;
			this.getById(Id);
		});


	}

	getById(Id: number) {

		this._DrawCardService.GetDrawCard(Id).subscribe(res => {
			if (res === null) {
				this.DrawCard = null;
			} else {
				this.DrawCard = null;
				this.DrawCard = res;
				this.fillForm(this.DrawCard);
			}
		});

	}

	New() {
		this.DrawCard = new DrawCard();
		this.myForm.reset();
	}

	Save() {
		if (this.myForm.valid) {
			this.DrawCard = this.myForm.value;
			this.DrawCard.XObjectTypeID = XObjectTypeEnum.DrawCard;
			this._DrawCardService.AddDrawCard(this.DrawCard)
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
			this.DrawCard = this.myForm.value;
			this.DrawCard.XObjectTypeID = XObjectTypeEnum.DrawCard;
			this._DrawCardService.UpdateDrawCard(this.DrawCard)
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
				this._DrawCardService.DeleteDrawCard(this.DrawCard.ID).subscribe(res => {
					if (!res.Success) {
						Messages.ShowMessag(res.Message, 'error');
					} else {
						this.ngOnInit();
					}
				});
			}
		});
	}
	DrawCurrency_AutoComplete(term?: string) {
		this._CurrencyService.Currency_Auto(term).subscribe(res => {
			this.DrawCurrencyList = res.Data;
		});
	}

	onDrawCurrencyChanged($event?: any) {
		if ($event) {
			const selected: any = $event.option.value;
			this.get('DrawCurrencyID').setValue(selected.ID);
		} else {
			this.get('DrawCurrency').setValue(null);
			this.get('DrawCurrencyID').setValue(null);
		}
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

	// displayCardNo(obj?: any): string | undefined {
	// 	return obj ? obj.Card_CardNo : undefined;
	// }


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

		this.formControl('DrawCardDetail', 'Card', index).setValue(selected);
		this.formControl('DrawCardDetail', 'CardID', index).setValue(selected.ID);
	}

	displayCardNo(obj?: any): string | undefined {
		return obj ? obj.CardNo : undefined;
	}

} // the end :)

