
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChequeSellCurrenciesRoutingModule } from './ChequeSellCurrencies.module-route';
import { ChequeSellCurrenciesComponent } from './ChequeSellCurrencies.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { CurrencyService } from '../../../services/Masters/Currency.service';
@NgModule({
  declarations: [
    ChequeSellCurrencyComponent,
    ChequeSellCurrenciesComponent
  ],
  imports: [
    CommonModule,
    ChequeSellCurrenciesRoutingModule,

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
export class ChequeSellCurrenciesModule { }
