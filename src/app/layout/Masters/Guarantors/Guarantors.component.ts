import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Messages } from '../../../enums/Messages';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { FormService } from '../../../services/FormService';

import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { GuarantorService } from '../../../services/Masters/Guarantor.service';
import { Guarantor } from '../../../models/Masters/Guarantor';

@Component({
	selector: 'app-guarantorlist',
	templateUrl: './Guarantors.component.html',
	styleUrls: ['./Guarantors.component.scss']
})

export class GuarantorsComponent implements OnInit {

	public displayedColumns = ['RowNo', 'Code' , 'Name' , 'Mobile' , 'WhatsAppNo' , 'ViberNo' , 'IDNo' , 'Email' , 'Status' ,  'Links'];
	
		public dataSource = new MatTableDataSource();
		public resultsLength = 0;
		public isLoadingResults = true;
    public Guarantor: any;
	public myForm: FormGroup;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    
		constructor(
			private _FormService: FormService,
	private _GuarantorService: GuarantorService,
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
				this.Guarantor = null;
		
	this.BuildForm();

				this.Display();
			}
		
 
		Display() {
			this.dataSource.sort = this.sort;
			this.dataSource.paginator = this.paginator;

			this.isLoadingResults = true;
			const _Guarantor: any = this.myForm.value;
			_Guarantor.PageIndex = 1;
			_Guarantor.PageSize = 1000;
			return this._GuarantorService.GetGuarantorPage(_Guarantor).subscribe(res => {
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
					this._GuarantorService.DeleteGuarantor(id).subscribe(res => {
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
