import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Messages } from '../../../enums/Messages';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { FormService } from '../../../services/FormService';

import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CardTypeService } from '../../../services/Masters/CardType.service';
import { CardType } from '../../../models/Masters/CardType';
import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';

@Component({
	selector: 'app-cardtypelist',
	templateUrl: './CardTypes.component.html',
	styleUrls: ['./CardTypes.component.scss']
})

export class CardTypesComponent implements OnInit {

	public displayedColumns = ['RowNo', 'Name', 'Links'];

	public dataSource = new MatTableDataSource();
	public resultsLength = 0;
	public isLoadingResults = true;
	public CardType: any;
	public myForm: FormGroup;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(
		private _FormService: FormService,
		private _CardTypeService: CardTypeService,
		public formBuilder: FormBuilder
	) { }


	BuildForm() {
		this.myForm = this.formBuilder.group({
			NamedObjectID: [''],
			Name: [''],
			Status: [''],
		});
	}

	get(name: string): FormControl {
		return this.myForm.get(name) as FormControl;
	}

	ngOnInit() {
		this.CardType = null;

		this.BuildForm();

		this.Display();
	}


	Display() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;

		this.isLoadingResults = true;
		const _CardType: any = this.myForm.value;
		_CardType.PageIndex = 1;
		_CardType.PageSize = 1000;
		return this._CardTypeService.GetCardTypePage(_CardType).subscribe(res => {
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
				this._CardTypeService.DeleteCardType(id).subscribe(res => {
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
		this.CardType = obj;
		this.FillForm(obj);
	}

	FillForm(_CardType: CardType) {

		this.myForm.reset();

		this.myForm.patchValue({
			NamedObjectID: _CardType.NamedObjectID,
			Name: _CardType.Name,
		});

	}

	Save() {
		this.CardType = this.myForm.value;
		this.CardType.XObjectTypeID = XObjectTypeEnum.CardType;

		if (this.myForm.valid) {

			if (!this.CardType.NamedObjectID) {
				this._CardTypeService.AddCardType(this.CardType)
					.subscribe(res => {
						Messages.HandleResultViewModel(res);
						if (res.Success) {
							this.ngOnInit();
						}
					});
			} else {
				this._CardTypeService.UpdateCardType(this.CardType)
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
