import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Messages } from '../../../enums/Messages';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { FormService } from '../../../services/FormService';

import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CustomerService } from '../../../services/Masters/Customer.service';
import { Customer } from '../../../models/Masters/Customer';

import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';

@Component({
	selector: 'app-customers',
	templateUrl: './Customers.component.html',
	styleUrls: ['./Customers.component.scss']
})

export class CustomersComponent implements OnInit {

	public displayedColumns = ['RowNo', 'Code' , 'Name' , 'Mobile' , 'WhatsAppNo' , 'ViberNo' , 'Email' ,  'Links'];
	
		public dataSource = new MatTableDataSource();
		public resultsLength = 0;
		public isLoadingResults = true;
    public Customer: any;
	public myForm: FormGroup;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    
		constructor(
			private _FormService: FormService,
	private _CustomerService: CustomerService,
	public formBuilder: FormBuilder
) { }

    
	BuildForm() {
		this.myForm = this.formBuilder.group({
			ID: [''],
			Name: [''], 
			Code: [''], 
			Email: [''], 
			Address: [''], 
			Mobile: [''], 
			IDNo: [''], 
			WhatsAppNo: [''], 
			ViberNo: [''], 
		});
	}

		get(name: string): FormControl {
			return this.myForm.get(name) as FormControl;
		}

			ngOnInit() {
				this.Customer = null;
		
	this.BuildForm();

				this.Display();
			}
		
 
		Display() {
			this.dataSource.sort = this.sort;
			this.dataSource.paginator = this.paginator;

			this.isLoadingResults = true;
			const _Customer: any = this.myForm.value;
			_Customer.PageIndex = 1;
			_Customer.PageSize = 1000;
			return this._CustomerService.GetCustomerPage(_Customer).subscribe(res => {
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
					this._CustomerService.DeleteCustomer(id).subscribe(res => {
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
