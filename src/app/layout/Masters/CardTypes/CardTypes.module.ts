
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardTypesRoutingModule } from './CardTypes.module-route';
import { CardTypesComponent } from './CardTypes.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { CardTypeService } from '../../../services/Masters/CardType.service';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { CardTypeService } from '../../../services/Masters/CardType.service';

@NgModule({
  declarations: [
    
    CardTypesComponent
  ],
  imports: [
    CommonModule,
    CardTypesRoutingModule,

    ToolbarModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
    
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers: [
	CardTypeService,

  ]
})
export class CardTypesModule { }

