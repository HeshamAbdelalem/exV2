
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalCurrencyTransfersRoutingModule } from './LocalCurrencyTransfers.module-route';
import { LocalCurrencyTransfersComponent } from './LocalCurrencyTransfers.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AccountService } from '../../../services/GeneralLedger/Account.service';
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
	AccountService,
  ]
})
export class LocalCurrencyTransfersModule { }
