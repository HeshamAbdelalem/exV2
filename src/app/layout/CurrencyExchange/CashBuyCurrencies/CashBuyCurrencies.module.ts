
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashBuyCurrenciesRoutingModule } from './CashBuyCurrencies.module-route';
import { CashBuyCurrenciesComponent } from './CashBuyCurrencies.component';

import { CashBuyCurrencyComponent } from './CashBuyCurrency.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { CurrencyService } from '../../../services/Masters/Currency.service';
import { BuyCurrenyService } from '../../../services/CurrencyExchange/BuyCurreny.service';
import { SystemSettingService } from '../../../services/Configurations/SystemSetting.service';

@NgModule({
  declarations: [
    CashBuyCurrencyComponent,
    CashBuyCurrenciesComponent
  ],
  imports: [
    CommonModule,
    CashBuyCurrenciesRoutingModule,

    ToolbarModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,

    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ],
  providers: [
    CurrencyService,
    BuyCurrenyService,
    SystemSettingService
  ]
})
export class CashBuyCurrenciesModule { }

