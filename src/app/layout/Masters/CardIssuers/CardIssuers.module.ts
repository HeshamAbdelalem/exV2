
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardIssuersRoutingModule } from './CardIssuers.module-route';
import { CardIssuersComponent } from './CardIssuers.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { CardIssuerService } from '../../../services/Masters/CardIssuer.service';
@NgModule({
  declarations: [
    
    CardIssuersComponent
  ],
  imports: [
    CommonModule,
    CardIssuersRoutingModule,

    ToolbarModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
    
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers: [
	CardIssuerService,
  ]
})
export class CardIssuersModule { }

