import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Messages } from '../../../enums/Messages';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { FormService } from '../../../services/FormService';

import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { BankService } from '../../../services/Masters/Bank.service';
import { Bank } from '../../../models/Masters/Bank';
import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';

@Component({
	selector: 'app-banklist',
	templateUrl: './Banks.component.html',
	styleUrls: ['./Banks.component.scss']
})

export class BanksComponent implements OnInit {

	public displayedColumns = ['RowNo', 'Code', 'Name', 'EnglishName', 'DiscountPercent', 'Links'];

	public dataSource = new MatTableDataSource();
	public resultsLength = 0;
	public isLoadingResults = true;
	public Bank: any;
	public myForm: FormGroup;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;


	constructor(
		private _FormService: FormService,
		private _BankService: BankService,
		public formBuilder: FormBuilder
	) { }

	BuildForm() {
		this.myForm = this.formBuilder.group({
			NamedObjectID: [''],
			Name: [''],
			Code: [''],
			EnglishName: [''],
			DiscountPercent: [''],
		});
	}

	get(name: string): FormControl {
		return this.myForm.get(name) as FormControl;
	}

	ngOnInit() {
		this.Bank = null;

		this.BuildForm();

		this.Display();
	}

	Display() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;

		this.isLoadingResults = true;
		const _Bank: any = this.myForm.value;
		_Bank.PageIndex = 1;
		_Bank.PageSize = 1000;
		return this._BankService.GetBankPage(_Bank).subscribe(res => {
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
				this._BankService.DeleteBank(id).subscribe(res => {
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
		this.Bank = obj;
		this.FillForm(obj);
	}

	FillForm(_Bank: Bank) {

		this.myForm.reset();

		this.myForm.patchValue({
			NamedObjectID: _Bank.NamedObjectID,
			Name: _Bank.Name,
			Code: _Bank.Code,
			EnglishName: _Bank.EnglishName,
			DiscountPercent: _Bank.DiscountPercent,
		});

	}

	Save() {
		this.Bank = this.myForm.value;
		this.Bank.XObjectTypeID = XObjectTypeEnum.Bank;
		if (this.myForm.valid) {

			if (!this.Bank.NamedObjectID) {
				this._BankService.AddBank(this.Bank)
					.subscribe(res => {
						Messages.HandleResultViewModel(res);
						if (res.Success) {
							this.ngOnInit();
						}
					});
			} else {
				this._BankService.UpdateBank(this.Bank)
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



}
