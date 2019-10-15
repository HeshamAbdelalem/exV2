
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryCardsRoutingModule } from './DeliveryCards.module-route';
import { DeliveryCardsComponent } from './DeliveryCards.component';
import { DeliveryCardComponent } from './DeliveryCard.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { GuarantorService } from '../../../services/Masters/Guarantor.service';import { ReceiveCardDetailService } from '../../../services/CardsTransactions/ReceiveCardDetail.service';import { DeliveryCardService } from '../../../services/CardsTransactions/DeliveryCard.service';import { DeliveryCardDetailService } from '../../../services/CardsTransactions/DeliveryCardDetail.service';import { CardService } from '../../../services/CardsTransactions/Card.service';
@NgModule({
  declarations: [
    DeliveryCardComponent,
    DeliveryCardsComponent
  ],
  imports: [
    CommonModule,
    DeliveryCardsRoutingModule,

    ToolbarModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
    
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers: [
	GuarantorService,ReceiveCardDetailService,DeliveryCardService,DeliveryCardDetailService,CardService,
  ]
})
export class DeliveryCardsModule { }

