
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendCardsRoutingModule } from './SendCards.module-route';
import { SendCardsComponent } from './SendCards.component';

import { SendCardComponent } from './SendCard.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { RepresentativeService } from '../../../services/Masters/Representative.service';
import { ReceiveCardDetailService } from '../../../services/CardsTransactions/ReceiveCardDetail.service';
import { SendCardService } from '../../../services/CardsTransactions/SendCard.service';
import { SendCardDetailService } from '../../../services/CardsTransactions/SendCardDetail.service';
import { CardService } from '../../../services/CardsTransactions/Card.service';

@NgModule({
  declarations: [
    SendCardComponent,
    SendCardsComponent
  ],
  imports: [
    CommonModule,
    SendCardsRoutingModule,

    ToolbarModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
    
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers: [
    RepresentativeService,
    ReceiveCardDetailService,
    SendCardService,
    SendCardDetailService,
    CardService
  ]
})
export class SendCardsModule { }

