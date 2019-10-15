import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Messages } from '../../../enums/Messages';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { FormService } from '../../../services/FormService';

import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { AccountService } from '../../../services/GeneralLedger/Account.service';
import { Account } from '../../../models/GeneralLedger/Account';
import { CityService } from '../../../services/Masters/City.service';
import { City } from '../../../models/Masters/City';
import { LocalTransferPriceService } from '../../../services/MoneyTransfer/LocalTransferPrice.service';
import { LocalTransferPrice } from '../../../models/MoneyTransfer/LocalTransferPrice';

import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';

@Component({
	selector: 'app-localtransferprices',
	templateUrl: './LocalTransferPrices.component.html',
	styleUrls: ['./LocalTransferPrices.component.scss']
})

export class LocalTransferPricesComponent implements OnInit {

	public displayedColumns = ['RowNo', 'AccountID', 'CityID', 'ThousandsCommission', 'AccountCommission', 'Links'];

	public dataSource = new MatTableDataSource();
	public resultsLength = 0;
	public isLoadingResults = true;
	public LocalTransferPrice: any;
	public myForm: FormGroup;
	public AccountList: any;
	public CityList: any;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;


	constructor(
		private _FormService: FormService,
		private _AccountService: AccountService,
		private _CityService: CityService,
		private _LocalTransferPriceService: LocalTransferPriceService,
		public formBuilder: FormBuilder
	) { }


	BuildForm() {
		this.myForm = this.formBuilder.group({
			ID: [''],
			AccountID: [''],
			CityID: [''],
			ThousandsCommission: [''],
			AccountCommission: [''],
			Account: [''],
			City: [''],
		});

		this.get('Account').valueChanges.subscribe(value => {
			this.Account_AutoComplete(value);
		});


		this.get('City').valueChanges.subscribe(value => {
			this.City_AutoComplete(value);
		});

	}

	get(name: string): FormControl {
		return this.myForm.get(name) as FormControl;
	}

	ngOnInit() {
		this.LocalTransferPrice = null;

		this.BuildForm();

		this.Display();
	}


	Display() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;

		this.isLoadingResults = true;
		const _LocalTransferPrice: any = this.myForm.value;
		_LocalTransferPrice.PageIndex = 1;
		_LocalTransferPrice.PageSize = 1000;
		return this._LocalTransferPriceService.GetLocalTransferPricePage(_LocalTransferPrice).subscribe(res => {
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
				this._LocalTransferPriceService.DeleteLocalTransferPrice(id).subscribe(res => {
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


	Edit(obj) {
		window.scroll(0, 0);
		this.LocalTransferPrice = obj;
		this.FillForm(obj);
	}

	FillForm(_LocalTransferPrice: LocalTransferPrice) {

		this.myForm.reset();

		this.myForm.patchValue({
			ID: _LocalTransferPrice.ID,
			AccountID: _LocalTransferPrice.AccountID,
			CityID: _LocalTransferPrice.CityID,
			ThousandsCommission: _LocalTransferPrice.ThousandsCommission,
			AccountCommission: _LocalTransferPrice.AccountCommission,
			Account: _LocalTransferPrice.Account,
			City: _LocalTransferPrice.City,
		});

	}

	Save() {
		this.LocalTransferPrice = this.myForm.value;
		// this.LocalTransferPrice.XObjectTypeID = XObjectTypeEnum.LocalTransferPrice;

		if (this.myForm.valid) {

			if (!this.LocalTransferPrice.ID) {
				this._LocalTransferPriceService.AddLocalTransferPrice(this.LocalTransferPrice)
					.subscribe(res => {
						Messages.HandleResultViewModel(res);
						if (res.Success) {
							this.ngOnInit();
						}
					});
			} else {
				this._LocalTransferPriceService.UpdateLocalTransferPrice(this.LocalTransferPrice)
					.subscribe(res => {
						Messages.HandleResultViewModel(res);
						if (res.Success) {
							this.ngOnInit();
						}
					});
			}

		} else {
			const errors = [];
			this._FormService.markFormGroupTouched(this.myForm, errors);
		}

	}

	Account_AutoComplete(name) {
		this._AccountService.Account_Auto(name).subscribe(res => {
			this.AccountList = res.Data;
		});
	}

	onAccountChanged($event) {
		const selected: Account = $event.option.value as Account;
		this.get('AccountID').setValue(selected.ID);
	}

	City_AutoComplete(name?: string) {
		this._CityService.City_Auto(name).subscribe(res => {
			this.CityList = res.Data;
		});
	}

	onCityChanged($event) {
		const selected: City = $event.option.value as City;
		this.get('CityID').setValue(selected.ID);
	}


	displayText(obj?: any): string | undefined {
		return obj ? obj.Name : undefined;
	}

}
