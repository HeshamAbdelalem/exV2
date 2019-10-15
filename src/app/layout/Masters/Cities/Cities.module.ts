
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitiesRoutingModule } from './Cities.module-route';
import { CitiesComponent } from './Cities.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { CityService } from '../../../services/Masters/City.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CountryService } from '../../../services/Masters/Country.service';

@NgModule({
  declarations: [
    
    CitiesComponent
  ],
  imports: [
    CommonModule,
    CitiesRoutingModule,

    ToolbarModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
    
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers: [
	CountryService,
CityService,

  ]
})
export class CitiesModule { }

