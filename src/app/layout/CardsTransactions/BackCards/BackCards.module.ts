
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackCardsRoutingModule } from './BackCards.module-route';
import { BackCardsComponent } from './BackCards.component';

import { BackCardComponent } from './BackCard.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { RepresentativeService } from '../../../services/Masters/Representative.service';
import { ReceiveCardDetailService } from '../../../services/CardsTransactions/ReceiveCardDetail.service';
import { BackCardService } from '../../../services/CardsTransactions/BackCard.service';
import { BackCardDetailService } from '../../../services/CardsTransactions/BackCardDetail.service';
import { CardService } from '../../../services/CardsTransactions/Card.service';

@NgModule({
  declarations: [
    BackCardComponent,
    BackCardsComponent
  ],
  imports: [
    CommonModule,
    BackCardsRoutingModule,

    ToolbarModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,

    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ],
  providers: [
    RepresentativeService,
    ReceiveCardDetailService,
    BackCardService,
    BackCardDetailService,
    CardService
  ]
})
export class BackCardsModule { }

