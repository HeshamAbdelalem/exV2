
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrenciesRoutingModule } from './Currencies.module-route';
import { CurrenciesComponent } from './Currencies.component';
import { CurrencyComponent } from './Currency.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { CurrencyService } from '../../../services/Masters/Currency.service';
@NgModule({
  declarations: [
    CurrencyComponent,
    CurrenciesComponent
  ],
  imports: [
    CommonModule,
    CurrenciesRoutingModule,

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
export class CurrenciesModule { }

