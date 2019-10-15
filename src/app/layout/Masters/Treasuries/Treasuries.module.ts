
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreasuriesRoutingModule } from './Treasuries.module-route';
import { TreasuriesComponent } from './Treasuries.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { TreasuryService } from '../../../services/Masters/Treasury.service';
@NgModule({
  declarations: [
    
    TreasuriesComponent
  ],
  imports: [
    CommonModule,
    TreasuriesRoutingModule,

    ToolbarModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
    
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers: [
	TreasuryService,
  ]
})
export class TreasuriesModule { }

