import { Component, OnInit, ViewChild } from '@angular/core';
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
import { RepresentativeService } from '../../../services/Masters/Representative.service';
import { Representative } from '../../../models/Masters/Representative';
import { DrawCardService } from '../../../services/CardsTransactions/DrawCard.service';
import { DrawCard } from '../../../models/CardsTransactions/DrawCard';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';


import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';

@Component({
	selector: 'app-drawcards',
	templateUrl: './DrawCards.component.html',
	styleUrls: ['./DrawCards.component.scss'],

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

export class DrawCardsComponent implements OnInit {

	public displayedColumns = ['RowNo', 'DocumentNo', 'DocumentDate', 'DocumentCode', 'RepresentativeID', 'DrawCurrencyID', 'Links'];

	public dataSource = new MatTableDataSource();
	public resultsLength = 0;
	public isLoadingResults = true;
	public DrawCard: any;
	public myForm: FormGroup;
	public CurrencyList: any;
	public RepresentativeList: any;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	DrawCurrencyList: any;


	constructor(
		private _FormService: FormService,
		private _CurrencyService: CurrencyService,
		private _RepresentativeService: RepresentativeService,
		private _DrawCardService: DrawCardService,
		public formBuilder: FormBuilder
	) { }


	BuildForm() {
		this.myForm = this.formBuilder.group({
			ID: [''],
			DocumentCode: [''],
			DocumentDate: [new Date(), Validators.required],
			Notes: [''],
			DocumentNo: [''],
			DrawCurrencyID: [''],
			RepresentativeID: [''],
			DrawCurrency: [''],
			Representative: [''],
		});

		this.get('DrawCurrency').valueChanges.subscribe(value => {
			this.DrawCurrency_AutoComplete(value);
		});


		this.get('Representative').valueChanges.subscribe(value => {
			this.Representative_AutoComplete(value);
		});

	}

	get(name: string): FormControl {
		return this.myForm.get(name) as FormControl;
	}

	ngOnInit() {
		this.DrawCard = null;

		this.BuildForm();

		this.Display();
	}


	Display() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;

		this.isLoadingResults = true;
		const _DrawCard: any = this.myForm.value;
		_DrawCard.PageIndex = 1;
		_DrawCard.PageSize = 1000;
		return this._DrawCardService.GetDrawCardPage(_DrawCard).subscribe(res => {
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
				this._DrawCardService.DeleteDrawCard(id).subscribe(res => {
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

	DrawCurrency_AutoComplete(term?: string) {
		this._CurrencyService.Currency_Auto(term).subscribe(res => {
			this.DrawCurrencyList = res.Data;
		});
	}

	onDrawCurrencyChanged($event) {
		const selected: Currency = $event.option.value as Currency;
		this.get('DrawCurrencyID').setValue(selected.ID);
	}

	Representative_AutoComplete(term?: string) {
		this._RepresentativeService.Representative_Auto(term).subscribe(res => {
			this.RepresentativeList = res.Data;
		});
	}

	onRepresentativeChanged($event) {
		const selected: Representative = $event.option.value as Representative;
		this.get('RepresentativeID').setValue(selected.ID);
	}


	displayText(obj?: any): string | undefined {
		return obj ? obj.Name : undefined;
	}

}
