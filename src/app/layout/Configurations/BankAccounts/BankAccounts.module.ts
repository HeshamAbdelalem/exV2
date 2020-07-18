
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankAccountsRoutingModule } from './BankAccounts.module-route';
import { BankAccountsComponent } from './BankAccounts.component';
import { BankAccountComponent } from './BankAccount.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { CurrencyService } from '../../../services/Masters/Currency.service';
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
	CurrencyService,
  ]
})
export class BankAccountsModule { }
