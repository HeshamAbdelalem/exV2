
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalCurrencyTransfersRoutingModule } from './LocalCurrencyTransfers.module-route';
import { LocalCurrencyTransfersComponent } from './LocalCurrencyTransfers.component';
import { LocalCurrencyTransferComponent } from './LocalCurrencyTransfer.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AccountService } from '../../../services/GeneralLedger/Account.service';import { CurrencyService } from '../../../services/Masters/Currency.service';import { CityService } from '../../../services/Masters/City.service';import { CurrencyTransferService } from '../../../services/MoneyTransfer/CurrencyTransfer.service';
@NgModule({
  declarations: [
    LocalCurrencyTransferComponent,
    LocalCurrencyTransfersComponent
  ],
  imports: [
    CommonModule,
    LocalCurrencyTransfersRoutingModule,

    ToolbarModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
    
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers: [
	AccountService,CurrencyService,CityService,CurrencyTransferService,
  ]
})
export class LocalCurrencyTransfersModule { }

