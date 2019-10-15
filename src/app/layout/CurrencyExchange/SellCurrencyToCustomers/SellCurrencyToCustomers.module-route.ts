
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellCurrencyToCustomersComponent } from './SellCurrencyToCustomers.component';import { SellCurrencyToCustomerComponent } from './SellCurrencyToCustomer.component'; 

const routes: Routes = [
    { path: '', component: SellCurrencyToCustomersComponent }
    , { path: ':id', component: SellCurrencyToCustomerComponent } ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class SellCurrencyToCustomersRoutingModule {}
	 
