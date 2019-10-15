
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashSellCurrenciesRoutingModule } from './CashSellCurrencies.module-route';
import { CashSellCurrenciesComponent } from './CashSellCurrencies.component';

import { CashSellCurrencyComponent } from './CashSellCurrency.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { CurrencyService } from '../../../services/Masters/Currency.service';
import { SellCurrencyService } from '../../../services/CurrencyExchange/SellCurrency.service';
import { SystemSettingService } from '../../../services/Configurations/SystemSetting.service';

@NgModule({
  declarations: [
    CashSellCurrencyComponent,
    CashSellCurrenciesComponent
  ],
  imports: [
    CommonModule,
    CashSellCurrenciesRoutingModule,

    ToolbarModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,

    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ],
  providers: [
    CurrencyService,
    SellCurrencyService,
    SystemSettingService
  ]
})
export class CashSellCurrenciesModule { }

