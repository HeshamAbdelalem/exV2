
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyCardsRoutingModule } from './BuyCards.module-route';
import { BuyCardsComponent } from './BuyCards.component';

import { BuyCardComponent } from './BuyCard.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { XCardsOperationsTypeService } from '../../../services/Lookups/XCardsOperationsType.service';
import { CurrencyService } from '../../../services/Masters/Currency.service';
import { GuarantorService } from '../../../services/Masters/Guarantor.service';
import { ReceiveCardService } from '../../../services/CardsTransactions/ReceiveCard.service';
import { ReceiveCardDetailService } from '../../../services/CardsTransactions/ReceiveCardDetail.service';
import { CardService } from '../../../services/CardsTransactions/Card.service';
import { BankService } from '../../../services/Masters/Bank.service';
import { CardTypeService } from '../../../services/Masters/CardType.service';
import { CardIssuerService } from '../../../services/Masters/CardIssuer.service';

@NgModule({
  declarations: [
    BuyCardComponent,
    BuyCardsComponent
  ],
  imports: [
    CommonModule,
    BuyCardsRoutingModule,

    ToolbarModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,

    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ],
  providers: [
    XCardsOperationsTypeService,
    CurrencyService,
    GuarantorService,
    ReceiveCardService,
    ReceiveCardDetailService,
    CardService,

    BankService,
    CardTypeService,
    CardIssuerService,
  ]
})

export class BuyCardsModule { }

