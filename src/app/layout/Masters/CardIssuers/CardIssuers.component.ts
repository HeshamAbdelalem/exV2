import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Messages } from '../../../enums/Messages';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { FormService } from '../../../services/FormService';

import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CardIssuerService } from '../../../services/Masters/CardIssuer.service';
import { CardIssuer } from '../../../models/Masters/CardIssuer';

import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';

@Component({
	selector: 'app-cardissuerlist',
	templateUrl: './CardIssuers.component.html',
	styleUrls: ['./CardIssuers.component.scss']
})

export class CardIssuersComponent implements OnInit {

	public displayedColumns = ['RowNo', 'Name', 'Links'];

	public dataSource = new MatTableDataSource();
	public resultsLength = 0;
	public isLoadingResults = true;
	public CardIssuer: any;
	public myForm: FormGroup;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(
		private _FormService: FormService,
		private _CardIssuerService: CardIssuerService,
		public formBuilder: FormBuilder
	) { }


	BuildForm() {
		this.myForm = this.formBuilder.group({
			NamedObjectID: [''],
			ID: [''],
			Code: [''],
			Name: [''],
			Status: [''],
		});
	}

	get(name: string): FormControl {
		return this.myForm.get(name) as FormControl;
	}

	ngOnInit() {
		this.CardIssuer = null;

		this.BuildForm();

		this.Display();
	}


	Display() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;

		this.isLoadingResults = true;
		const _CardIssuer: any = this.myForm.value;
		_CardIssuer.PageIndex = 1;
		_CardIssuer.PageSize = 1000;
		return this._CardIssuerService.GetCardIssuerPage(_CardIssuer).subscribe(res => {
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
				this._CardIssuerService.DeleteCardIssuer(id).subscribe(res => {
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
		this.CardIssuer = obj;
		this.FillForm(obj);
	}

	FillForm(_CardIssuer: CardIssuer) {

		this.myForm.reset();

		this.myForm.patchValue({
			ID: _CardIssuer.ID,
			NamedObjectID: _CardIssuer.NamedObjectID,
			Name: _CardIssuer.Name,
		});

	}

	Save() {
		this.CardIssuer = this.myForm.value;
		this.CardIssuer.XObjectTypeID = XObjectTypeEnum.CardIssuer;

		if (this.myForm.valid) {

			if (!this.CardIssuer.ID) {
				this._CardIssuerService.AddCardIssuer(this.CardIssuer)
					.subscribe(res => {
						Messages.HandleResultViewModel(res);
						if (res.Success) {
							this.ngOnInit();
						}
					});
			} else {
				this._CardIssuerService.UpdateCardIssuer(this.CardIssuer)
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
