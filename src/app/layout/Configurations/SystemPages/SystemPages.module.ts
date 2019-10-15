
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemPagesRoutingModule } from './SystemPages.module-route';
import { SystemPagesComponent } from './SystemPages.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { SystemPageService } from '../../../services/Configurations/SystemPage.service';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SystemPageService } from '../../../services/Configurations/SystemPage.service';

@NgModule({
  declarations: [
    
    SystemPagesComponent
  ],
  imports: [
    CommonModule,
    SystemPagesRoutingModule,

    ToolbarModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
    
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers: [
	SystemPageService,

  ]
})
export class SystemPagesModule { }

