
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawCardsRoutingModule } from './DrawCards.module-route';
import { DrawCardsComponent } from './DrawCards.component';

import { DrawCardComponent } from './DrawCard.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { XCardProblemService } from '../../../services/Lookups/XCardProblem.service';
import { CurrencyService } from '../../../services/Masters/Currency.service';
import { RepresentativeService } from '../../../services/Masters/Representative.service';
import { ReceiveCardDetailService } from '../../../services/CardsTransactions/ReceiveCardDetail.service';
import { DrawCardService } from '../../../services/CardsTransactions/DrawCard.service';
import { DrawCurrencyConversionService } from '../../../services/CardsTransactions/DrawCurrencyConversion.service';
import { DrawCardDetailService } from '../../../services/CardsTransactions/DrawCardDetail.service';
import { CardService } from '../../../services/CardsTransactions/Card.service';

@NgModule({
  declarations: [
    DrawCardComponent,
    DrawCardsComponent
  ],
  imports: [
    CommonModule,
    DrawCardsRoutingModule,

    ToolbarModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
    
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers: [
    XCardProblemService,
    CurrencyService,
    RepresentativeService,
    ReceiveCardDetailService,
    DrawCardService,
    DrawCurrencyConversionService,
    DrawCardDetailService,
    CardService
  ]
})
export class DrawCardsModule { }

