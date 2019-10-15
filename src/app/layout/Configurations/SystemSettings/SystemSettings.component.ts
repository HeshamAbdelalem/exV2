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
import { SystemSettingService } from '../../../services/Configurations/SystemSetting.service';
import { SystemSetting } from '../../../models/Configurations/SystemSetting';

import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';

@Component({
	selector: 'app-systemsettings',
	templateUrl: './SystemSettings.component.html',
	styleUrls: ['./SystemSettings.component.scss']
})

export class SystemSettingsComponent implements OnInit {

	public displayedColumns = ['RowNo', 'NationalCurrencyID', 'DefaultForeignCurrencyID', 'Links'];

	public dataSource = new MatTableDataSource();
	public resultsLength = 0;
	public isLoadingResults = true;
	public SystemSetting: any;
	public myForm: FormGroup;
	public CurrencyList: any;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;


	constructor(
		private _FormService: FormService,
		private _CurrencyService: CurrencyService,
		private _SystemSettingService: SystemSettingService,
		public formBuilder: FormBuilder
	) { }


	BuildForm() {
		this.myForm = this.formBuilder.group({
			ID: [''],
			NationalCurrencyID: [''],
			DefaultForeignCurrencyID: [''],
			NationalCurrency: [''],
			DefaultForeignCurrency: [''],
		});

		// this.get('NationalCurrency').valueChanges.subscribe(value => {
		// 	this.NationalCurrency_AutoComplete(value);
		// });


		// this.get('DefaultForeignCurrency').valueChanges.subscribe(value => {
		// 	this.DefaultForeignCurrency_AutoComplete(value);
		// });

	}

	get(name: string): FormControl {
		return this.myForm.get(name) as FormControl;
	}

	ngOnInit() {
		this.SystemSetting = null;

		this.BuildForm();

		this.Display();
	}


	Display() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;

		this.isLoadingResults = true;
		const _SystemSetting: any = this.myForm.value;
		_SystemSetting.PageIndex = 1;
		_SystemSetting.PageSize = 1000;
		return this._SystemSettingService.GetSystemSettingPage(_SystemSetting).subscribe(res => {
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
				this._SystemSettingService.DeleteSystemSetting(id).subscribe(res => {
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

	// NationalCurrency_AutoComplete(name) {
	// 	this._CurrencyService.Currency_Auto(name).subscribe(res => {
	// 		this.NationalCurrencyList = res.Data;
	// 	});
	// }

	// onNationalCurrencyChanged($event) {
	// 	const selected: Currency = $event.option.value as Currency;
	// 	this.get('NationalCurrencyID').setValue(selected.ID);
	// }

	// DefaultForeignCurrency_AutoComplete(name) {
	// 	this._CurrencyService.Currency_Auto(name).subscribe(res => {
	// 		this.DefaultForeignCurrencyList = res.Data;
	// 	});
	// }

	// onDefaultForeignCurrencyChanged($event) {
	// 	const selected: Currency = $event.option.value as Currency;
	// 	this.get('DefaultForeignCurrencyID').setValue(selected.ID);
	// }


	displayText(obj?: any): string | undefined {
		return obj ? obj.Name : undefined;
	}

}
