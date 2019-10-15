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

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
	selector: 'app-systemmenulist',
	templateUrl: './SystemMenus.component.html',
	styleUrls: ['./SystemMenus.component.scss']
})

export class SystemMenusComponent implements OnInit {

	public displayedColumns = ['RowNo', 'Code', 'Name', 'Icon', 'Serial', 'Links'];

	public dataSource = new MatTableDataSource();
	public resultsLength = 0;
	public isLoadingResults = true;
	public SystemMenu: any;
	public myForm: FormGroup;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	public Menus: any;

	constructor(
		private _FormService: FormService,
		private _SystemMenuService: SystemMenuService,
		public formBuilder: FormBuilder
	) { }


	BuildForm() {
		this.myForm = this.formBuilder.group({
			ID: [''],
			Code: [''],
			Name: [''],
			Serial: [''],
			Icon: [''],
		});
	}

	get(name: string): FormControl {
		return this.myForm.get(name) as FormControl;
	}

	ngOnInit() {
		this.SystemMenu = null;

		this.BuildForm();

		this.Display();
	}

	Display() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;

		this.isLoadingResults = true;
		const _SystemMenu: any = this.myForm.value;
		_SystemMenu.PageIndex = 1;
		_SystemMenu.PageSize = 1000;
		return this._SystemMenuService.GetSystemMenuPage(_SystemMenu).subscribe(res => {
			this.isLoadingResults = false;
			this.Menus = res.Data;

			this.Menus = this.Menus.sort(function (a, b) {
				return a.Serial - b.Serial;
			});

			// this.dataSource.data = res.Data;
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
				this._SystemMenuService.DeleteSystemMenu(id).subscribe(res => {
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
		this.SystemMenu = obj;
		this.FillForm(obj);
	}

	FillForm(_SystemMenu: SystemMenu) {

		this.myForm.reset();

		this.myForm.patchValue({
			ID: _SystemMenu.ID,
			Name: _SystemMenu.Name,
			Code: _SystemMenu.Code,
			Serial: _SystemMenu.Serial,
			Icon: _SystemMenu.Icon,
		});

	}

	Save() {
		this.SystemMenu = this.myForm.value;

		if (this.myForm.valid) {

			if (!this.SystemMenu.ID) {
				this._SystemMenuService.AddSystemMenu(this.SystemMenu)
					.subscribe(res => {
						Messages.HandleResultViewModel(res);
						if (res.Success) {
							this.ngOnInit();
						}
					});
			} else {
				this._SystemMenuService.UpdateSystemMenu(this.SystemMenu)
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

	drop(event: CdkDragDrop<string[]>) {

		console.log(event);

		moveItemInArray(this.Menus, event.previousIndex, event.currentIndex);

		let myMenu = this.Menus.filter(mnu => {
			return mnu.Serial = event.previousIndex;
		});

		if (myMenu) {
			myMenu = myMenu[0];
			myMenu.Serial = event.currentIndex;
			this.Edit(myMenu);
			this.Save();
		}
	}


}
