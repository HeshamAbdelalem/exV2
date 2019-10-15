
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChequeSellCurrenciesComponent } from './ChequeSellCurrencies.component';import { ChequeSellCurrencyComponent } from './ChequeSellCurrency.component'; 

const routes: Routes = [
    { path: '', component: ChequeSellCurrenciesComponent }
    , { path: ':id', component: ChequeSellCurrencyComponent } ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class ChequeSellCurrenciesRoutingModule {}
	 
