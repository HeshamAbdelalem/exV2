
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankAccountsRoutingModule } from './BankAccounts.module-route';
import { BankAccountsComponent } from './BankAccounts.component';
import { BankAccountComponent } from './BankAccount.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { CurrencyService } from '../../../services/Masters/Currency.service';import { BankService } from '../../../services/Masters/Bank.service';import { BankAccountService } from '../../../services/Configurations/BankAccount.service';
@NgModule({
  declarations: [
    BankAccountComponent,
    BankAccountsComponent
  ],
  imports: [
    CommonModule,
    BankAccountsRoutingModule,

    ToolbarModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
    
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers: [
	CurrencyService,BankService,BankAccountService,
  ]
})
export class BankAccountsModule { }

