
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChequeBuyCurreniesRoutingModule } from './ChequeBuyCurrenies.module-route';
import { ChequeBuyCurreniesComponent } from './ChequeBuyCurrenies.component';
import { ChequeBuyCurrenyComponent } from './ChequeBuyCurreny.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { CurrencyService } from '../../../services/Masters/Currency.service';import { BuyCurrenyService } from '../../../services/CurrencyExchange/BuyCurreny.service';import { BankAccountService } from '../../../services/Configurations/BankAccount.service';import { XCommercialPaperTypeService } from '../../../services/Lookups/XCommercialPaperType.service';
@NgModule({
  declarations: [
    ChequeBuyCurrenyComponent,
    ChequeBuyCurreniesComponent
  ],
  imports: [
    CommonModule,
    ChequeBuyCurreniesRoutingModule,

    ToolbarModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
    
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers: [
	CurrencyService,BuyCurrenyService,BankAccountService,XCommercialPaperTypeService,
  ]
})
export class ChequeBuyCurreniesModule { }

