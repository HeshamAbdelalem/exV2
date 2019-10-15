
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesRoutingModule } from './Countries.module-route';
import { CountriesComponent } from './Countries.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { CountryService } from '../../../services/Masters/Country.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    
    CountriesComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,

    ToolbarModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
    
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers: [
	CountryService,

  ]
})
export class CountriesModule { }

