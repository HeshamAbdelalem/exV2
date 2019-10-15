
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsRoutingModule } from './Cards.module-route';
import { CardsComponent } from './Cards.component';

import { CardComponent } from './Card.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { CurrencyService } from '../../../services/Masters/Currency.service';
import { BankService } from '../../../services/Masters/Bank.service';
import { CardTypeService } from '../../../services/Masters/CardType.service';
import { CardIssuerService } from '../../../services/Masters/CardIssuer.service';
import { CardService } from '../../../services/CardsTransactions/Card.service';

@NgModule({
  declarations: [
    CardComponent,
    CardsComponent
  ],
  imports: [
    CommonModule,
    CardsRoutingModule,

    ToolbarModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
    
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers: [
    CurrencyService,
    BankService,
    CardTypeService,
    CardIssuerService,
    CardService,
  ]
})
export class CardsModule { }

