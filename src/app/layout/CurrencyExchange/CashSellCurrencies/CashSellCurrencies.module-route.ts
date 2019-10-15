
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashSellCurrenciesComponent } from './CashSellCurrencies.component';
import { CashSellCurrencyComponent } from './CashSellCurrency.component'; 

const routes: Routes = [
    { path: '', component: CashSellCurrenciesComponent }
    , { path: ':id', component: CashSellCurrencyComponent } ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class CashSellCurrenciesRoutingModule {}
	 
