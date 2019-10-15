
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyPricesComponent } from './CurrencyPrices.component';
import { CurrencyPriceComponent } from './CurrencyPrice.component'; 

export const CurrencyPricesRoutes: Routes = [
    { path: '', component: CurrencyPricesComponent }
    , { path: ':id', component: CurrencyPriceComponent } ];

@NgModule({
    imports: [RouterModule.forChild(CurrencyPricesRoutes)],
    exports: [RouterModule],
})

export class CurrencyPricesRoutingModule {}
	 
