import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Messages } from '../../../enums/Messages';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { FormService } from '../../../services/FormService';

import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { SystemPageService } from '../../../services/Configurations/SystemPage.service';
import { SystemPage } from '../../../models/Configurations/SystemPage';

@Component({
	selector: 'app-systempagelist',
	templateUrl: './SystemPages.component.html',
	styleUrls: ['./SystemPages.component.scss']
})

export class SystemPagesComponent implements OnInit {

	public displayedColumns = ['RowNo', 'Code', 'Name', 'Icon', 'Hint', 'Links'];

	public dataSource = new MatTableDataSource();
	public resultsLength = 0;
	public isLoadingResults = true;
	public SystemPage: any;
	public myForm: FormGroup;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;


	constructor(
		private _FormService: FormService,
		private _SystemPageService: SystemPageService,
		public formBuilder: FormBuilder
	) { }


	BuildForm() {
		this.myForm = this.formBuilder.group({
			ID: [''],
			Code: [''],
			Name: [''],
			Icon: [''],
			Hint: [''],
		});
	}

	get(name: string): FormControl {
		return this.myForm.get(name) as FormControl;
	}

	ngOnInit() {
		this.SystemPage = null;

		this.BuildForm();

		this.Display();
	}


	Display() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;

		this.isLoadingResults = true;
		const _SystemPage: any = this.myForm.value;
		_SystemPage.PageIndex = 1;
		_SystemPage.PageSize = 1000;
		return this._SystemPageService.GetSystemPagePage(_SystemPage).subscribe(res => {
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
				this._SystemPageService.DeleteSystemPage(id).subscribe(res => {
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
		this.SystemPage = obj;
		this.FillForm(obj);
	}

	FillForm(_SystemPage: SystemPage) {

		this.myForm.reset();

		this.myForm.patchValue({
			ID: _SystemPage.ID,
			Code: _SystemPage.Code,
			Name: _SystemPage.Name,
			Icon: _SystemPage.Icon,
			Hint: _SystemPage.Hint,
		});

	}

	Save() {
		this.SystemPage = this.myForm.value;

		if (this.myForm.valid) {

			if (!this.SystemPage.ID) {
				this._SystemPageService.AddSystemPage(this.SystemPage)
					.subscribe(res => {
						Messages.HandleResultViewModel(res);
						if (res.Success) {
							this.ngOnInit();
						}
					});
			} else {
				this._SystemPageService.UpdateSystemPage(this.SystemPage)
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
