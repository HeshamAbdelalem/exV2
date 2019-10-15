import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormService } from '../../../services/FormService';
import { Messages } from '../../../enums/Messages';
import Swal from 'sweetalert2';

import { AccountService } from '../../../services/GeneralLedger/Account.service';
import { Account } from '../../../models/GeneralLedger/Account';
import { CurrencyService } from '../../../services/Masters/Currency.service';
import { Currency } from '../../../models/Masters/Currency';
import { SystemSettingService } from '../../../services/Configurations/SystemSetting.service';
import { SystemSetting } from '../../../models/Configurations/SystemSetting';
import { XStaticAccountService } from '../../../services/Lookups/XStaticAccount.service';
import { XStaticAccount } from '../../../models/Lookups/XStaticAccount';
import { StaticAccountService } from '../../../services/Configurations/StaticAccount.service';
import { StaticAccount } from '../../../models/Configurations/StaticAccount';
import { CommissionAccountService } from '../../../services/Configurations/CommissionAccount.service';
import { CommissionAccount } from '../../../models/Configurations/CommissionAccount';

import { XObjectTypeEnum } from '../../../enums/XObjectTypeEnum';

@Component({
	selector: 'app-systemsetting',
	templateUrl: './SystemSetting.component.html',
	styleUrls: ['./SystemSetting.component.scss']
})
export class SystemSettingComponent implements OnInit {
	public myForm: FormGroup;
	public SystemSetting: any;
	public NationalCurrencyList: any;
	public DefaultForeignCurrencyList: any;
	// StaticAccount
	public StaticAccounton_XStaticAccountList: any;
	// StaticAccount
	public StaticAccount_AccountList: any;
	// StaticAccount
	// public CurrencyList: any;
	// CommissionAccount
	// public CurrencyList: any;
	// CommissionAccount
	public CommissionAccount_DebitAccountList: any;
	// CommissionAccount
	public CommissionAccount_CreditAccountList: any;
	CommissionAccount_CurrencyList: any;
	StaticAccount_CurrencyList: any;

	constructor(

		private _AccountService: AccountService,
		private _CurrencyService: CurrencyService,
		private _SystemSettingService: SystemSettingService,
		private _XStaticAccountService: XStaticAccountService,
		private _StaticAccountService: StaticAccountService,
		private _CommissionAccountService: CommissionAccountService,
		public formBuilder: FormBuilder,
		private _FormService: FormService,
		private router: Router,
		private route: ActivatedRoute,
	) {

	}

	buildForm() {

		this.myForm = this.formBuilder.group({
			ID: [''],
			NationalCurrencyID: [''],
			DefaultForeignCurrencyID: [''],
			NationalCurrency: [''],
			DefaultForeignCurrency: [''],
			StaticAccount: this.formBuilder.array([]),
			CommissionAccount: this.formBuilder.array([]),
		});

		this.get('NationalCurrency').valueChanges.subscribe(value => {
			this.NationalCurrency_AutoComplete(value);
		});

		this.get('DefaultForeignCurrency').valueChanges.subscribe(value => {
			this.DefaultForeignCurrency_AutoComplete(value);
		});
	}
	fillForm(_SystemSetting: SystemSetting) {

		this.myForm.reset();

		this.myForm.patchValue({
			ID: _SystemSetting.ID,
			NationalCurrencyID: _SystemSetting.NationalCurrencyID,
			NationalCurrency: this.initObject(_SystemSetting.NationalCurrency),
			DefaultForeignCurrencyID: _SystemSetting.DefaultForeignCurrencyID,
			DefaultForeignCurrency: this.initObject(_SystemSetting.DefaultForeignCurrency),
		});

		this.formArray('StaticAccount').reset();

		if (_SystemSetting.StaticAccount != null) {
			_SystemSetting.StaticAccount.forEach(_StaticAccount => {
				const fg: FormGroup = this.initStaticAccount(_StaticAccount);
				this.formArray('StaticAccount').push(fg);
			});
		}


		this.formArray('CommissionAccount').reset();

		if (_SystemSetting.CommissionAccount != null) {
			_SystemSetting.CommissionAccount.forEach(_CommissionAccount => {
				const fg: FormGroup = this.initCommissionAccount(_CommissionAccount);
				this.formArray('CommissionAccount').push(fg);
			});
		}


	}

	formArray(formArrayName: string): FormArray {
		return <FormArray>this.myForm.get(formArrayName);
	}

	formControl(formArrayName: string, formControlName: string, i: number): FormControl {
		return <FormControl>this.formArray(formArrayName).controls[i].get(formControlName);
	}
	initStaticAccount = (_StaticAccount?: StaticAccount): FormGroup => {

		let fg: FormGroup;

		if (!_StaticAccount) {
			fg = this.formBuilder.group({
				ID: [''],
				XStaticAccountID: [''], XStaticAccount: ['', Validators.required],
				AccountID: [''], Account: ['', Validators.required],
				CurrencyID: [''], Currency: ['', Validators.required],
				Status: 1
			});
		} else {
			fg = this.formBuilder.group({
				ID: this.formBuilder.control(_StaticAccount.ID),
				XStaticAccountID: this.formBuilder.control(_StaticAccount.XStaticAccountID),
				XStaticAccount: this.initObject(_StaticAccount.XStaticAccount),
				AccountID: this.formBuilder.control(_StaticAccount.AccountID),
				Account: this.initObject(_StaticAccount.Account),
				CurrencyID: this.formBuilder.control(_StaticAccount.CurrencyID),
				Currency: this.initObject(_StaticAccount.Currency),
				Status: this.formBuilder.control(_StaticAccount.Status)
			});
		}

		fg.get('XStaticAccount').valueChanges.subscribe(value => {
			this.StaticAccount_XStaticAccount_AutoComplete(value);
		});

		fg.get('Account').valueChanges.subscribe(value => {
			this.StaticAccount_Account_AutoComplete(value);
		});

		fg.get('Currency').valueChanges.subscribe(value => {
			this.StaticAccount_Currency_AutoComplete(value);
		});

		return fg;
	}

	add_StaticAccount() {
		this.formArray('StaticAccount').push(this.initStaticAccount());
	}

	remove_StaticAccount(index) {
		const control = this.formArray('StaticAccount').controls[index];
		const item: StaticAccount = control.value as StaticAccount;
		if (item.ID && item.Status !== 3) {
			item.Status = 3;
		} else if (item.ID && item.Status === 3) {
			item.Status = null;
		} else {
			this.formArray('StaticAccount').controls.splice(index, 1);
		}
	}

	StaticAccount_XStaticAccount_AutoComplete(name) {
		this._XStaticAccountService.XStaticAccount_Auto(name).subscribe(res => {
			this.StaticAccounton_XStaticAccountList = res.Data;
		});
	}

	StaticAccounton_onXStaticAccountChanged($event, index: number) {
		const selected: XStaticAccount = $event.option.value as XStaticAccount;
		this.formControl('StaticAccount', 'XStaticAccountID', index).setValue(selected.ID);
	}

	StaticAccount_Account_AutoComplete(name) {
		this._AccountService.Account_Auto(name).subscribe(res => {
			this.StaticAccount_AccountList = res.Data;
		});
	}

	StaticAccount_onAccountChanged($event, index: number) {
		const selected: Account = $event.option.value as Account;
		this.formControl('StaticAccount', 'AccountID', index).setValue(selected.ID);
	}

	StaticAccount_Currency_AutoComplete(name) {
		this._CurrencyService.Currency_Auto(name).subscribe(res => {
			this.StaticAccount_CurrencyList = res.Data;
		});
	}

	StaticAccount_onCurrencyChanged($event, index: number) {
		const selected: Currency = $event.option.value as Currency;
		this.formControl('StaticAccount', 'CurrencyID', index).setValue(selected.ID);
	}

	initCommissionAccount = (_CommissionAccount?: CommissionAccount): FormGroup => {

		let fg: FormGroup;

		if (!_CommissionAccount) {
			fg = this.formBuilder.group({
				ID: [''],
				CurrencyID: [''], Currency: ['', Validators.required],
				DebitAccountID: [''], DebitAccount: ['', Validators.required],
				CreditAccountID: [''], CreditAccount: ['', Validators.required],
				Status: 1
			});
		} else {
			fg = this.formBuilder.group({
				ID: this.formBuilder.control(_CommissionAccount.ID),
				CurrencyID: this.formBuilder.control(_CommissionAccount.CurrencyID),
				Currency: this.initObject(_CommissionAccount.Currency),
				DebitAccountID: this.formBuilder.control(_CommissionAccount.DebitAccountID),
				DebitAccount: this.initObject(_CommissionAccount.DebitAccount),
				CreditAccountID: this.formBuilder.control(_CommissionAccount.CreditAccountID),
				CreditAccount: this.initObject(_CommissionAccount.CreditAccount),
				Status: this.formBuilder.control(_CommissionAccount.Status)
			});
		}
		fg.get('Currency').valueChanges.subscribe(value => {
			this.CommissionAccount_Currency_AutoComplete(value);
		});
		fg.get('DebitAccount').valueChanges.subscribe(value => {
			this.CommissionAccount_DebitAccount_AutoComplete(value);
		});
		fg.get('CreditAccount').valueChanges.subscribe(value => {
			this.CommissionAccount_CreditAccount_AutoComplete(value);
		});
		return fg;
	}

	add_CommissionAccount() {
		this.formArray('CommissionAccount').push(this.initCommissionAccount());
	}

	remove_CommissionAccount(index) {
		const control = this.formArray('CommissionAccount').controls[index];
		const item: CommissionAccount = control.value as CommissionAccount;
		if (item.ID && item.Status !== 3) {
			item.Status = 3;
		} else if (item.ID && item.Status === 3) {
			item.Status = null;
		} else {
			this.formArray('CommissionAccount').controls.splice(index, 1);
		}
	}

	CommissionAccount_Currency_AutoComplete(name) {
		this._CurrencyService.Currency_Auto(name).subscribe(res => {
			this.CommissionAccount_CurrencyList = res.Data;
		});
	}

	CommissionAccount_onCurrencyChanged($event, index: number) {
		const selected: Currency = $event.option.value as Currency;
		this.formControl('CommissionAccount', 'CurrencyID', index).setValue(selected.ID);
	}

	CommissionAccount_DebitAccount_AutoComplete(name) {
		this._AccountService.Account_Auto(name).subscribe(res => {
			this.CommissionAccount_DebitAccountList = res.Data;
		});
	}

	CommissionAccount_onDebitAccountChanged($event, index: number) {
		const selected: Account = $event.option.value as Account;
		this.formControl('CommissionAccount', 'DebitAccountID', index).setValue(selected.ID);
	}

	CommissionAccount_CreditAccount_AutoComplete(name) {
		this._AccountService.Account_Auto(name).subscribe(res => {
			this.CommissionAccount_CreditAccountList = res.Data;
		});
	}

	CommissionAccount_onCreditAccountChanged($event, index: number) {
		const selected: Account = $event.option.value as Account;
		this.formControl('CommissionAccount', 'CreditAccountID', index).setValue(selected.ID);
	}

	initObject = (obj?: any): any => {
		if (obj === null || obj === undefined) {
			return {};
		} else {
			return obj;
		}
	}

	displayText(obj?: any): string | undefined {
		return obj ? obj.Name : undefined;
	}

	get(name: string): FormControl {
		return this.myForm.get(name) as FormControl;
	}

	ngOnInit() {

		this.buildForm();

		// this.route.params.subscribe((params: Params) => {
		// 	this.SystemSetting = new SystemSetting();
		// 	const Id: number = params.id as number;
		// 	this.getById(Id);
		// });

		this.SystemSetting = new SystemSetting();
		const Id: number = 1;
		this.getById(Id);

	}

	getById(Id: number) {

		this._SystemSettingService.GetSystemSetting(Id).subscribe(res => {
			if (res === null) {
				this.SystemSetting = null;
			} else {
				this.SystemSetting = null;
				this.SystemSetting = res;
				this.fillForm(this.SystemSetting);
			}
		});

	}

	New() {
		this.SystemSetting = new SystemSetting();
		this.myForm.reset();
	}

	Save() {
		if (this.myForm.valid) {
			this.SystemSetting = this.myForm.value;
			this.SystemSetting.XObjectTypeID = XObjectTypeEnum.SystemSetting;
			this._SystemSettingService.AddSystemSetting(this.SystemSetting)
				.subscribe(res => {
					Messages.HandleResultViewModel(res);
					if (res.Success) {
						this.ngOnInit();
					}
				});
		} else {
			const errors = [];
			this._FormService.markFormGroupTouched(this.myForm, errors);
		}
	}

	Update() {
		if (this.myForm.valid) {
			this.SystemSetting = this.myForm.value;
			this.SystemSetting.XObjectTypeID = XObjectTypeEnum.SystemSetting;
			this._SystemSettingService.UpdateSystemSetting(this.SystemSetting)
				.subscribe(res => {
					Messages.HandleResultViewModel(res);
					if (res.Success) {
						this.ngOnInit();
					}
				});
		} else {
			const errors = [];
			this._FormService.markFormGroupTouched(this.myForm, errors);
		}
	}

	Delete() {
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
				this._SystemSettingService.DeleteSystemSetting(this.SystemSetting.ID).subscribe(res => {
					if (!res.Success) {
						Messages.ShowMessag(res.Message, 'error');
					} else {
						this.ngOnInit();
					}
				});
			}
		});
	}

	NationalCurrency_AutoComplete(name?: string) {
		this._CurrencyService.Currency_Auto(name).subscribe(res => {
			this.NationalCurrencyList = res.Data;
		});
	}

	onNationalCurrencyChanged($event?: any) {
		if ($event) {
			const selected: any = $event.option.value;
			this.get('NationalCurrencyID').setValue(selected.ID);
		} else {
			this.get('NationalCurrency').setValue(null);
			this.get('NationalCurrencyID').setValue(null);
		}
	}

	DefaultForeignCurrency_AutoComplete(name?: string) {
		this._CurrencyService.Currency_Auto(name).subscribe(res => {
			this.DefaultForeignCurrencyList = res.Data;
		});
	}

	onDefaultForeignCurrencyChanged($event?: any) {
		if ($event) {
			const selected: any = $event.option.value;
			this.get('DefaultForeignCurrencyID').setValue(selected.ID);
		} else {
			this.get('DefaultForeignCurrency').setValue(null);
			this.get('DefaultForeignCurrencyID').setValue(null);
		}
	}


} // the end :)

