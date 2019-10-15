
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemMenuPagesRoutingModule } from './SystemMenuPages.module-route';
import { SystemMenuPagesComponent } from './SystemMenuPages.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { SystemMenuPageService } from '../../../services/Configurations/SystemMenuPage.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SystemMenuService } from '../../../services/Configurations/SystemMenu.service';
import { SystemPageService } from '../../../services/Configurations/SystemPage.service';
// import { SystemMenuPageService } from '../../../services/Configurations/SystemMenuPage.service';

@NgModule({
  declarations: [
    
    SystemMenuPagesComponent
  ],
  imports: [
    CommonModule,
    SystemMenuPagesRoutingModule,

    ToolbarModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
    
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers: [
	SystemMenuService,
SystemPageService,
SystemMenuPageService,

  ]
})
export class SystemMenuPagesModule { }

