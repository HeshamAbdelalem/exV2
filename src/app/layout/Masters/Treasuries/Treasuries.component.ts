import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Messages } from '../../../enums/Messages';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { FormService } from '../../../services/FormService';

import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { TreasuryService } from '../../../services/Masters/Treasury.service';
import { Treasury } from '../../../models/Masters/Treasury';

import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';

@Component({
	selector: 'app-treasurylist',
	templateUrl: './Treasuries.component.html',
	styleUrls: ['./Treasuries.component.scss']
})

export class TreasuriesComponent implements OnInit {

	public displayedColumns = ['RowNo', 'Name'/*, 'Status'*/, 'Links'];

	public dataSource = new MatTableDataSource();
	public resultsLength = 0;
	public isLoadingResults = true;
	public Treasury: any;
	public myForm: FormGroup;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;


	constructor(
		private _FormService: FormService,
		private _TreasuryService: TreasuryService,
		public formBuilder: FormBuilder
	) { }


	BuildForm() {
		this.myForm = this.formBuilder.group({
			NamedObjectID: [''],
			ID: [''],
			Status: [''],
			Name: [''],
		});
	}

	get(name: string): FormControl {
		return this.myForm.get(name) as FormControl;
	}

	ngOnInit() {
		this.Treasury = null;

		this.BuildForm();

		this.Display();
	}


	Display() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;

		this.isLoadingResults = true;
		const _Treasury: any = this.myForm.value;
		_Treasury.PageIndex = 1;
		_Treasury.PageSize = 1000;
		return this._TreasuryService.GetTreasuryPage(_Treasury).subscribe(res => {
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
				this._TreasuryService.DeleteTreasury(id).subscribe(res => {
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
		this.Treasury = obj;
		this.FillForm(obj);
	}

	FillForm(_Treasury: Treasury) {

		this.myForm.reset();

		this.myForm.patchValue({
			ID: _Treasury.ID,
			NamedObjectID: _Treasury.NamedObjectID,
			Name: _Treasury.Name,
		});

	}

	Save() {
		this.Treasury = this.myForm.value;
		this.Treasury.XObjectTypeID = XObjectTypeEnum.Treasury;

		if (this.myForm.valid) {

			if (!this.Treasury.ID) {
				this._TreasuryService.AddTreasury(this.Treasury)
					.subscribe(res => {
						Messages.HandleResultViewModel(res);
						if (res.Success) {
							this.ngOnInit();
						}
					});
			} else {
				this._TreasuryService.UpdateTreasury(this.Treasury)
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
