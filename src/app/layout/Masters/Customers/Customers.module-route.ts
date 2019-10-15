
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './Customers.component';import { CustomerComponent } from './Customer.component'; 

const routes: Routes = [
    { path: '', component: CustomersComponent }
    , { path: ':id', component: CustomerComponent } ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class CustomersRoutingModule {}
	 
