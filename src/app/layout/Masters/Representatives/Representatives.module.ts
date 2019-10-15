
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepresentativesRoutingModule } from './Representatives.module-route';
import { RepresentativesComponent } from './Representatives.component';
import { RepresentativeComponent } from './Representative.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { RepresentativeService } from '../../../services/Masters/Representative.service';
@NgModule({
  declarations: [
    RepresentativeComponent,
    RepresentativesComponent
  ],
  imports: [
    CommonModule,
    RepresentativesRoutingModule,

    ToolbarModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
    
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers: [
	RepresentativeService,
  ]
})
export class RepresentativesModule { }

