import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyExchangeComponent } from './CurrencyExchange.component';

export const CurrencyExchangeRoutes: Routes = [
    {
        path: '',
        component: CurrencyExchangeComponent,
        children: [
            {
                path: 'CurrencyPrices',
                loadChildren: './CurrencyPrices/CurrencyPrices.module#CurrencyPricesModule'
            }
            ,
            {
                path: 'CashBuyCurrencies',
                loadChildren: './CashBuyCurrencies/CashBuyCurrencies.module#CashBuyCurrenciesModule'
            }
            ,
            {
                path: 'ChequeBuyCurrenies',
                loadChildren: './ChequeBuyCurrenies/ChequeBuyCurrenies.module#ChequeBuyCurreniesModule'
            }
            ,
            {
                path: 'CashSellCurrencies',
                loadChildren: './CashSellCurrencies/CashSellCurrencies.module#CashSellCurrenciesModule'
            }
            ,
            {
                path: 'ChequeSellCurrencies',
                loadChildren: './ChequeSellCurrencies/ChequeSellCurrencies.module#ChequeSellCurrenciesModule'
            },
            {
                path: 'SellCurrencyToCustomers',
                loadChildren: './SellCurrencyToCustomers/SellCurrencyToCustomers.module#SellCurrencyToCustomersModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(CurrencyExchangeRoutes)],
    exports: [RouterModule]
})
export class CurrencyExchangeRoutingModule { }
