
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPaymentsRoutingModule } from './CardPayments.module-route';
import { CardPaymentsComponent } from './CardPayments.component';
import { CardPaymentComponent } from './CardPayment.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ReceiveCardService } from '../../../services/CardsTransactions/ReceiveCard.service';import { ReceiveCardDetailService } from '../../../services/CardsTransactions/ReceiveCardDetail.service';import { CardPaymentService } from '../../../services/CardsTransactions/CardPayment.service';import { CardPaymentDetailService } from '../../../services/CardsTransactions/CardPaymentDetail.service';
@NgModule({
  declarations: [
    CardPaymentComponent,
    CardPaymentsComponent
  ],
  imports: [
    CommonModule,
    CardPaymentsRoutingModule,

    ToolbarModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
    
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers: [
	ReceiveCardService,ReceiveCardDetailService,CardPaymentService,CardPaymentDetailService,
  ]
})
export class CardPaymentsModule { }

