
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuarantorsRoutingModule } from './Guarantors.module-route';
import { GuarantorsComponent } from './Guarantors.component';
import { GuarantorComponent } from './Guarantor.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { GuarantorService } from '../../../services/Masters/Guarantor.service';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { GuarantorService } from '../../../services/Masters/Guarantor.service';

@NgModule({
  declarations: [
    GuarantorComponent,
    GuarantorsComponent
  ],
  imports: [
    CommonModule,
    GuarantorsRoutingModule,

    ToolbarModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
    
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers: [
	GuarantorService,

  ]
})
export class GuarantorsModule { }

