import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Messages } from '../../../enums/Messages';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { FormService } from '../../../services/FormService';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { XCardsOperationsTypeService } from '../../../services/Lookups/XCardsOperationsType.service';
import { XCardsOperationsType } from '../../../models/Lookups/XCardsOperationsType';
import { GuarantorService } from '../../../services/Masters/Guarantor.service';
import { Guarantor } from '../../../models/Masters/Guarantor';
import { ReceiveCardService } from '../../../services/CardsTransactions/ReceiveCard.service';
import { ReceiveCard } from '../../../models/CardsTransactions/ReceiveCard';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';


import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-buycards',
	templateUrl: './BuyCards.component.html',
	styleUrls: ['./BuyCards.component.scss'],
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

export class BuyCardsComponent implements OnInit {

	public displayedColumns = ['RowNo', 'DocumentNo', 'DocumentDate', 'DocumentCode', 'GuarantorID', 'Links'];

	public dataSource = new MatTableDataSource();
	public resultsLength = 0;
	public isLoadingResults = true;
	public ReceiveCard: any;
	public myForm: FormGroup;
	public XCardsOperationsTypeList: any;
	public GuarantorList: any;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	XCardsOperationsTypeID: any;
	PageTitle: string;
	PageUrl: string;
	private _XObjectTypeEnum = XObjectTypeEnum.BuyCard;

	constructor(
		private _FormService: FormService,
		private _XCardsOperationsTypeService: XCardsOperationsTypeService,
		private _GuarantorService: GuarantorService,
		private _ReceiveCardService: ReceiveCardService,
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
	) { }

	BuildForm() {

		this.myForm = this.formBuilder.group({
			ID: [''],
			DocumentCode: [''],
			DocumentDate: [new Date(), Validators.required],			
			DocumentNo: [''],
			Notes: [''],
			XCardsOperationsTypeID: [''],
			GuarantorID: [''],
			XCardsOperationsType: [''],
			Guarantor: [''],
		});

		this.get('XCardsOperationsType').valueChanges.subscribe(value => {
			this.XCardsOperationsType_AutoComplete(value);
		});


		this.get('Guarantor').valueChanges.subscribe(value => {
			this.Guarantor_AutoComplete(value);
		});

	}

	get(name: string): FormControl {
		return this.myForm.get(name) as FormControl;
	}

	ngOnInit() {

		this.route.data.subscribe(data => {

			this.XCardsOperationsTypeID = data.XCardsOperationsTypeID;

			if (this.XCardsOperationsTypeID === 1) {
				this.PageTitle = 'شراء البطاقات';
				this._XObjectTypeEnum = XObjectTypeEnum.BuyCard;
				this.PageUrl = 'BuyCards';
			} else if (this.XCardsOperationsTypeID === 2) {
				this._XObjectTypeEnum = XObjectTypeEnum.CollectCardForPercent;
				this.PageTitle = 'سحب البطاقات بنسبة';
				this.PageUrl = 'CollectCardForPercent';
			} else if (this.XCardsOperationsTypeID === 3) {
				this._XObjectTypeEnum = XObjectTypeEnum.CollectCardForValue;
				this.PageTitle = 'سحب بطاقات بقيمة ثابتة';
				this.PageUrl = 'CollectCardForValue';
			}

		});

		this.ReceiveCard = null;

		this.BuildForm();

		this.Display();
	}

	Display() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;

		this.isLoadingResults = true;
		const _ReceiveCard: any = this.myForm.value;
		_ReceiveCard.PageIndex = 1;
		_ReceiveCard.PageSize = 1000;
		_ReceiveCard.XObjectTypeID = this._XObjectTypeEnum;
		_ReceiveCard.XCardsOperationsTypeID = this.XCardsOperationsTypeID;
		
		return this._ReceiveCardService.GetReceiveCardPage(_ReceiveCard).subscribe(res => {
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
				this._ReceiveCardService.DeleteReceiveCard(id).subscribe(res => {
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

	XCardsOperationsType_AutoComplete(name?: string) {
		this._XCardsOperationsTypeService.XCardsOperationsType_Auto(name).subscribe(res => {
			this.XCardsOperationsTypeList = res.Data;
		});
	}

	onXCardsOperationsTypeChanged($event) {
		const selected: XCardsOperationsType = $event.option.value as XCardsOperationsType;
		this.get('XCardsOperationsTypeID').setValue(selected.ID);
	}

	Guarantor_AutoComplete(name?: string) {
		this._GuarantorService.Guarantor_Auto(name).subscribe(res => {
			this.GuarantorList = res.Data;
		});
	}

	onGuarantorChanged($event) {
		const selected: Guarantor = $event.option.value as Guarantor;
		this.get('GuarantorID').setValue(selected.ID);
	}

	displayText(obj?: any): string | undefined {
		return obj ? obj.Name : undefined;
	}

}
