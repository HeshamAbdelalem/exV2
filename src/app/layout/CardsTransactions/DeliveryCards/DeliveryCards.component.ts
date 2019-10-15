import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Messages } from '../../../enums/Messages';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { FormService } from '../../../services/FormService';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { GuarantorService } from '../../../services/Masters/Guarantor.service';
import { Guarantor } from '../../../models/Masters/Guarantor';
import { DeliveryCardService } from '../../../services/CardsTransactions/DeliveryCard.service';
import { DeliveryCard } from '../../../models/CardsTransactions/DeliveryCard';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';


import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';

@Component({
	selector: 'app-deliverycards',
	templateUrl: './DeliveryCards.component.html',
	styleUrls: ['./DeliveryCards.component.scss'],

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

export class DeliveryCardsComponent implements OnInit {

	public displayedColumns = ['RowNo', 'DocumentNo' , 'DocumentDate' , 'DocumentCode' , 'GuarantorID' ,  'Links'];
	
		public dataSource = new MatTableDataSource();
		public resultsLength = 0;
		public isLoadingResults = true;
    public DeliveryCard: any;
	public myForm: FormGroup;
    public GuarantorList: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    
		constructor(
			private _FormService: FormService,
	private _GuarantorService: GuarantorService,
	private _DeliveryCardService: DeliveryCardService,
	public formBuilder: FormBuilder
) { }

    
		BuildForm() {
		this.formBuilder.group({
			ID: [''],
			DocumentCode: [''], 
			DocumentDate: [new Date(), Validators.required], 
			DocumentNo: [''], 
			Notes: [''], 
			GuarantorID: [''], 
			Guarantor: [''], 
		});

		this.get('Guarantor').valueChanges.subscribe(value => {
			this.Guarantor_AutoComplete(value);
		});
		
	}

		get(name: string): FormControl {
			return this.myForm.get(name) as FormControl;
		}

			ngOnInit() {
				this.DeliveryCard = null;
		
	this.BuildForm();

				this.Display();
			}
		
 
		Display() {
			this.dataSource.sort = this.sort;
			this.dataSource.paginator = this.paginator;

			this.isLoadingResults = true;
			const _DeliveryCard: any = this.myForm.value;
			_DeliveryCard.PageIndex = 1;
			_DeliveryCard.PageSize = 1000;
			return this._DeliveryCardService.GetDeliveryCardPage(_DeliveryCard).subscribe(res => {
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
					this._DeliveryCardService.DeleteDeliveryCard(id).subscribe(res => {
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
		
    Guarantor_AutoComplete(term?: string) {
			this._GuarantorService.Guarantor_Auto(term).subscribe(res => {
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
