
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellCurrencyOutsRoutingModule } from './SellCurrencyOuts.module-route';
import { SellCurrencyOutsComponent } from './SellCurrencyOuts.component';
import { SellCurrencyOutComponent } from './SellCurrencyOut.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AccountService } from '../../../services/GeneralLedger/Account.service';import { CurrencyService } from '../../../services/Masters/Currency.service';import { CurrencyTransferService } from '../../../services/MoneyTransfer/CurrencyTransfer.service';
@NgModule({
  declarations: [
    SellCurrencyOutComponent,
    SellCurrencyOutsComponent
  ],
  imports: [
    CommonModule,
    SellCurrencyOutsRoutingModule,

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
export class SellCurrencyOutsModule { }

