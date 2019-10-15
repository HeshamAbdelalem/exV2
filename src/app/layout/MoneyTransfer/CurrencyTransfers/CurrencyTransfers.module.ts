
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyTransfersRoutingModule } from './CurrencyTransfers.module-route';
import { CurrencyTransfersComponent } from './CurrencyTransfers.component';
import { CurrencyTransferComponent } from './CurrencyTransfer.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AccountService } from '../../../services/GeneralLedger/Account.service';import { CurrencyService } from '../../../services/Masters/Currency.service';import { CurrencyTransferService } from '../../../services/MoneyTransfer/CurrencyTransfer.service';import { XCommissionTypeService } from '../../../services/Lookups/XCommissionType.service';
@NgModule({
  declarations: [
    CurrencyTransferComponent,
    CurrencyTransfersComponent
  ],
  imports: [
    CommonModule,
    CurrencyTransfersRoutingModule,

    ToolbarModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
    
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers: [
	AccountService,CurrencyService,CurrencyTransferService,XCommissionTypeService,
  ]
})
export class CurrencyTransfersModule { }

