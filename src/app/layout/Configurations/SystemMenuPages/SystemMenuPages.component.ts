import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Messages } from '../../../enums/Messages';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { FormService } from '../../../services/FormService';

import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { SystemMenuService } from '../../../services/Configurations/SystemMenu.service';
import { SystemMenu } from '../../../models/Configurations/SystemMenu';
import { SystemPageService } from '../../../services/Configurations/SystemPage.service';
import { SystemPage } from '../../../models/Configurations/SystemPage';
import { SystemMenuPageService } from '../../../services/Configurations/SystemMenuPage.service';
import { SystemMenuPage } from '../../../models/Configurations/SystemMenuPage';

@Component({
	selector: 'app-systemmenupagelist',
	templateUrl: './SystemMenuPages.component.html',
	styleUrls: ['./SystemMenuPages.component.scss']
})

export class SystemMenuPagesComponent implements OnInit {

	public displayedColumns = ['RowNo', 'SystemMenuID', 'SystemPageID', 'Serial', 'Links'];

	public dataSource = new MatTableDataSource();
	public resultsLength = 0;
	public isLoadingResults = true;
	public SystemMenuPage: any;
	public myForm: FormGroup;
	public SystemMenuList: any;
	public SystemPageList: any;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;


	constructor(
		private _FormService: FormService,
		private _SystemMenuService: SystemMenuService,
		private _SystemPageService: SystemPageService,
		private _SystemMenuPageService: SystemMenuPageService,
		public formBuilder: FormBuilder
	) { }


	BuildForm() {
		this.myForm = this.formBuilder.group({
			ID: [''],
			SystemMenuID: [''],
			SystemPageID: [''],
			Serial: [''],
			SystemMenu: [''],
			SystemPage: [''],
		});

		this.get('SystemMenu').valueChanges.subscribe(value => {
			this.SystemMenu_AutoComplete(value);
		});


		this.get('SystemPage').valueChanges.subscribe(value => {
			this.SystemPage_AutoComplete(value);
		});

	}

	get(name: string): FormControl {
		return this.myForm.get(name) as FormControl;
	}

	ngOnInit() {
		this.SystemMenuPage = null;

		this.BuildForm();

		this.Display();
	}


	Display() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;

		this.isLoadingResults = true;
		const _SystemMenuPage: any = this.myForm.value;
		_SystemMenuPage.PageIndex = 1;
		_SystemMenuPage.PageSize = 1000;
		return this._SystemMenuPageService.GetSystemMenuPagePage(_SystemMenuPage).subscribe(res => {
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
				this._SystemMenuPageService.DeleteSystemMenuPage(id).subscribe(res => {
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
		this.SystemMenuPage = obj;
		this.FillForm(obj);
	}

	FillForm(_SystemMenuPage: SystemMenuPage) {

		this.myForm.reset();

		this.myForm.patchValue({
			ID: _SystemMenuPage.ID,
			
			SystemMenu: _SystemMenuPage.SystemMenu,
			SystemMenuID: _SystemMenuPage.SystemMenuID,
			
			SystemPage: _SystemMenuPage.SystemPage,
			SystemPageID: _SystemMenuPage.SystemPageID,

			Serial: _SystemMenuPage.Serial,
		});

	}

	Save() {
		this.SystemMenuPage = this.myForm.value;

		if (this.myForm.valid) {

			if (!this.SystemMenuPage.ID) {
				this._SystemMenuPageService.AddSystemMenuPage(this.SystemMenuPage)
					.subscribe(res => {
						Messages.HandleResultViewModel(res);
						if (res.Success) {
							this.ngOnInit();
						}
					});
			} else {
				this._SystemMenuPageService.UpdateSystemMenuPage(this.SystemMenuPage)
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


	SystemMenu_AutoComplete(name?: string) {
		this._SystemMenuService.SystemMenu_Auto(name).subscribe(res => {
			this.SystemMenuList = res.Data;
		});
	}

	onSystemMenuChanged($event) {
		const selected: SystemMenu = $event.option.value as SystemMenu;
		this.get('SystemMenuID').setValue(selected.ID);
	}

	SystemPage_AutoComplete(name?: string) {
		this._SystemPageService.SystemPage_Auto(name).subscribe(res => {
			this.SystemPageList = res.Data;
		});
	}

	onSystemPageChanged($event) {
		const selected: SystemPage = $event.option.value as SystemPage;
		this.get('SystemPageID').setValue(selected.ID);
	}


	displayText(obj?: any): string | undefined {
		return obj ? obj.Name : undefined;
	}

}
