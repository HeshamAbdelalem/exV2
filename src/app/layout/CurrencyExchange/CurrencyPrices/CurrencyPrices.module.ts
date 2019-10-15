
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPricesRoutingModule } from './CurrencyPrices.module-route';
import { CurrencyPricesComponent } from './CurrencyPrices.component';
import { CurrencyPriceComponent } from './CurrencyPrice.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { CurrencyPriceService } from '../../../services/CurrencyExchange/CurrencyPrice.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CurrencyService } from '../../../services/Masters/Currency.service';

@NgModule({
  declarations: [
    CurrencyPriceComponent,
    CurrencyPricesComponent
  ],
  imports: [
    CommonModule,
    CurrencyPricesRoutingModule,

    ToolbarModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,

    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ],
  providers: [
    CurrencyService,
    CurrencyPriceService,
  ]
})

export class CurrencyPricesModule { }