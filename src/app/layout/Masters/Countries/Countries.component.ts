import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Messages } from '../../../enums/Messages';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { FormService } from '../../../services/FormService';

import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CountryService } from '../../../services/Masters/Country.service';
import { Country } from '../../../models/Masters/Country';
import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';

@Component({
	selector: 'app-countrylist',
	templateUrl: './Countries.component.html',
	styleUrls: ['./Countries.component.scss']
})

export class CountriesComponent implements OnInit {

	public displayedColumns = ['RowNo', 'Code', 'Name', 'Links'];

	public dataSource = new MatTableDataSource();
	public resultsLength = 0;
	public isLoadingResults = true;
	public Country: any;
	public myForm: FormGroup;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;


	constructor(
		private _FormService: FormService,
		private _CountryService: CountryService,
		public formBuilder: FormBuilder
	) { }


	BuildForm() {
		this.myForm = this.formBuilder.group({
			NamedObjectID: [''],
			Code: [''],
			Name: [''],
		});
	}

	get(name: string): FormControl {
		return this.myForm.get(name) as FormControl;
	}

	ngOnInit() {
		this.Country = null;

		this.BuildForm();

		this.Display();
	}


	Display() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;

		this.isLoadingResults = true;
		const _Country: any = this.myForm.value;
		_Country.PageIndex = 1;
		_Country.PageSize = 1000;
		return this._CountryService.GetCountryPage(_Country).subscribe(res => {
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
				this._CountryService.DeleteCountry(id).subscribe(res => {
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
		this.Country = obj;
		this.FillForm(obj);
	}

	FillForm(_Country: Country) {

		this.myForm.reset();

		this.myForm.patchValue({
			NamedObjectID: _Country.NamedObjectID,
			Code: _Country.Code,
			Name: _Country.Name,
		});

	}

	Save() {
		this.Country = this.myForm.value;
		this.Country.XObjectTypeID = XObjectTypeEnum.Country;

		if (this.myForm.valid) {

			if (!this.Country.NamedObjectID) {
				this._CountryService.AddCountry(this.Country)
					.subscribe(res => {
						Messages.HandleResultViewModel(res);
						if (res.Success) {
							this.ngOnInit();
						}
					});
			} else {
				this._CountryService.UpdateCountry(this.Country)
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
