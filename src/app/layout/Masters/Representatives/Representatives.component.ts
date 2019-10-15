import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Messages } from '../../../enums/Messages';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { FormService } from '../../../services/FormService';

import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { RepresentativeService } from '../../../services/Masters/Representative.service';
import { Representative } from '../../../models/Masters/Representative';

import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';

@Component({
	selector: 'app-representativelist',
	templateUrl: './Representatives.component.html',
	styleUrls: ['./Representatives.component.scss']
})

export class RepresentativesComponent implements OnInit {

	public displayedColumns = ['RowNo', 'Code', 'Name', 'Mobile', 'WhatsAppNo', 'ViberNo', 'Email', 'IDNo', 'Status', 'Address', 'Links'];

	public dataSource = new MatTableDataSource();
	public resultsLength = 0;
	public isLoadingResults = true;
	public Representative: any;
	public myForm: FormGroup;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;


	constructor(
		private _FormService: FormService,
		private _RepresentativeService: RepresentativeService,
		public formBuilder: FormBuilder
	) { }


	BuildForm() {
		this.myForm = this.formBuilder.group({
			ID: [''],
			Code: [''],
			Status: [''],
			Name: [''],
			ViberNo: [''],
			WhatsAppNo: [''],
			IDNo: [''],
			Email: [''],
			Mobile: [''],
			Address: [''],
		});
	}

	get(name: string): FormControl {
		return this.myForm.get(name) as FormControl;
	}

	ngOnInit() {
		this.Representative = null;

		this.BuildForm();

		this.Display();
	}


	Display() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;

		this.isLoadingResults = true;
		const _Representative: any = this.myForm.value;
		_Representative.PageIndex = 1;
		_Representative.PageSize = 1000;
		return this._RepresentativeService.GetRepresentativePage(_Representative).subscribe(res => {
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
				this._RepresentativeService.DeleteRepresentative(id).subscribe(res => {
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


}
