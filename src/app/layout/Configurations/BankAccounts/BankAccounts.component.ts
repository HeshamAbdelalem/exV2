import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Messages } from '../../../enums/Messages';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { FormService } from '../../../services/FormService';

import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CurrencyService } from '../../../services/Masters/Currency.service';
import { Currency } from '../../../models/Masters/Currency';
import { BankService } from '../../../services/Masters/Bank.service';
import { Bank } from '../../../models/Masters/Bank';
import { BankAccountService } from '../../../services/Configurations/BankAccount.service';
import { BankAccount } from '../../../models/Configurations/BankAccount';

import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';

@Component({
	selector: 'app-bankaccountlist',
	templateUrl: './BankAccounts.component.html',
	styleUrls: ['./BankAccounts.component.scss']
})

export class BankAccountsComponent implements OnInit {

	public displayedColumns = ['RowNo', 'BankID', 'Name', 'CurrencyID', 'StartDate', 'StartBalance', 'Status', 'Links'];

	public dataSource = new MatTableDataSource();
	public resultsLength = 0;
	public isLoadingResults = true;
	public BankAccount: any;
	public myForm: FormGroup;
	public CurrencyList: any;
	public BankList: any;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;


	constructor(
		private _FormService: FormService,
		private _CurrencyService: CurrencyService,
		private _BankService: BankService,
		private _BankAccountService: BankAccountService,
		public formBuilder: FormBuilder
	) { }


	BuildForm() {
		this.myForm = this.formBuilder.group({
			ID: [''],
			Status: [''],
			Notes: [''],
			BankID: [''],
			CurrencyID: [''],
			StartBalance: [''],
			StartDate: [''],
			Name: [''],
			Bank: [''],
			Currency: [''],
		});

		this.get('Bank').valueChanges.subscribe(value => {
			this.Bank_AutoComplete(value);
		});


		this.get('Currency').valueChanges.subscribe(value => {
			this.Currency_AutoComplete(value);
		});

	}

	get(name: string): FormControl {
		return this.myForm.get(name) as FormControl;
	}

	ngOnInit() {
		this.BankAccount = null;

		this.BuildForm();

		this.Display();
	}


	Display() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;

		this.isLoadingResults = true;
		const _BankAccount: any = this.myForm.value;
		_BankAccount.PageIndex = 1;
		_BankAccount.PageSize = 1000;
		return this._BankAccountService.GetBankAccountPage(_BankAccount).subscribe(res => {
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
				this._BankAccountService.DeleteBankAccount(id).subscribe(res => {
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

	Bank_AutoComplete(name?: string) {
		this._BankService.Bank_Auto(name).subscribe(res => {
			this.BankList = res.Data;
		});
	}

	onBankChanged($event) {
		const selected: Bank = $event.option.value as Bank;
		this.get('BankID').setValue(selected.ID);
	}

	Currency_AutoComplete(name?: string) {
		this._CurrencyService.Currency_Auto(name).subscribe(res => {
			this.CurrencyList = res.Data;
		});
	}

	onCurrencyChanged($event) {
		const selected: Currency = $event.option.value as Currency;
		this.get('CurrencyID').setValue(selected.ID);
	}


	displayText(obj?: any): string | undefined {
		return obj ? obj.Name : undefined;
	}

}
