
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BanksRoutingModule } from './Banks.module-route';
import { BanksComponent } from './Banks.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { BankService } from '../../../services/Masters/Bank.service';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { BankService } from '../../../services/Masters/Bank.service';

@NgModule({
  declarations: [
    
    BanksComponent
  ],
  imports: [
    CommonModule,
    BanksRoutingModule,

    ToolbarModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
    
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers: [
	BankService,

  ]
})
export class BanksModule { }

