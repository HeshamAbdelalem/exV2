import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Messages } from '../../../enums/Messages';
import Swal from 'sweetalert2';
import { FormService } from '../../../services/FormService';

import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CountryService } from '../../../services/Masters/Country.service';
import { Country } from '../../../models/Masters/Country';
import { CityService } from '../../../services/Masters/City.service';
import { City } from '../../../models/Masters/City';
import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';

import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-citylist',
	templateUrl: './Cities.component.html',
	styleUrls: ['./Cities.component.scss']
})

export class CitiesComponent implements OnInit {

	public displayedColumns = ['RowNo', 'Name', 'CountryID', 'Links'];

	public dataSource = new MatTableDataSource();
	public resultsLength = 0;
	public isLoadingResults = true;
	public City: any;
	public myForm: FormGroup;
	public CountryList: any;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(
		private _FormService: FormService,
		private _CountryService: CountryService,
		private _CityService: CityService,
		public formBuilder: FormBuilder
	) { }


	BuildForm() {
		this.myForm = this.formBuilder.group({
			ID: [''],
			Code: [''],
			Name: [''],
			Status: [''],
			CountryID: [''],
			Country: [''],
		});

		this.get('Country').valueChanges.subscribe(value => {
			this.Country_AutoComplete(value);
		});

	}

	get(name: string): FormControl {
		return this.myForm.get(name) as FormControl;
	}

	ngOnInit() {

		this.City = null;
		this.BuildForm();
		this.Display();

	}


	Display() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;

		this.isLoadingResults = true;
		const _City: any = this.myForm.value;
		_City.PageIndex = 1;
		_City.PageSize = 1000;
		return this._CityService.GetCityPage(_City).subscribe(res => {
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
				this._CityService.DeleteCity(id).subscribe(res => {
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
		this.City = obj;
		this.FillForm(obj);
	}

	FillForm(_City: City) {

		this.myForm.reset();

		this.myForm.patchValue({
			ID: _City.ID,
			NamedObjectID: _City.NamedObjectID,
			Code: _City.Code,
			Name: _City.Name,
			CountryID: _City.CountryID,
			Country: _City.Country,
		});

	}

	Save() {
		this.City = this.myForm.value;
		this.City.XObjectTypeID = XObjectTypeEnum.City;

		if (this.myForm.valid) {

			if (!this.City.ID) {
				this._CityService.AddCity(this.City)
					.subscribe(res => {
						Messages.HandleResultViewModel(res);
						if (res.Success) {
							this.ngOnInit();
						}
					});
			} else {
				this._CityService.UpdateCity(this.City)
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


	Country_AutoComplete(name?: string) {
		this._CountryService.Country_Auto(name).subscribe(res => {
			this.CountryList = res.Data;
		});
	}

	onCountryChanged($event) {
		const selected: Country = $event.option.value as Country;
		this.get('CountryID').setValue(selected.ID);
	}


	displayText(obj?: any): string | undefined {
		return obj ? obj.Name : undefined;
	}

}
