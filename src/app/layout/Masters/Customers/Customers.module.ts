
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './Customers.module-route';
import { CustomersComponent } from './Customers.component';
import { CustomerComponent } from './Customer.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomerService } from '../../../services/Masters/Customer.service';
@NgModule({
  declarations: [
    CustomerComponent,
    CustomersComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,

    ToolbarModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
    
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers: [
	CustomerService,
  ]
})
export class CustomersModule { }

