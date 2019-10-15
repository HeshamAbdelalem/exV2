
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemMenusRoutingModule } from './SystemMenus.module-route';
import { SystemMenusComponent } from './SystemMenus.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { SystemMenuService } from '../../../services/Configurations/SystemMenu.service';
@NgModule({
  declarations: [
    
    SystemMenusComponent
  ],
  imports: [
    CommonModule,
    SystemMenusRoutingModule,

    ToolbarModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
    
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers: [
	SystemMenuService,
  ]
})
export class SystemMenusModule { }

