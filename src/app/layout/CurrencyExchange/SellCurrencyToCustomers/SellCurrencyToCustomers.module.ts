
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellCurrencyToCustomersRoutingModule } from './SellCurrencyToCustomers.module-route';
import { SellCurrencyToCustomersComponent } from './SellCurrencyToCustomers.component';
import { SellCurrencyToCustomerComponent } from './SellCurrencyToCustomer.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AccountService } from '../../../services/GeneralLedger/Account.service';import { CurrencyService } from '../../../services/Masters/Currency.service';import { CurrencyTransferService } from '../../../services/MoneyTransfer/CurrencyTransfer.service';
@NgModule({
  declarations: [
    SellCurrencyToCustomerComponent,
    SellCurrencyToCustomersComponent
  ],
  imports: [
    CommonModule,
    SellCurrencyToCustomersRoutingModule,

    ToolbarModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
    
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers: [
	AccountService,CurrencyService,CurrencyTransferService,
  ]
})
export class SellCurrencyToCustomersModule { }

