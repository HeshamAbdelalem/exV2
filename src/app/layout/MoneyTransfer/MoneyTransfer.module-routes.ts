import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoneyTransferComponent } from './MoneyTransfer.component';

export const MoneyTransferRoutes: Routes = [
    {
        path: '',
        component: MoneyTransferComponent,
        children: [
            {
                path: 'LocalTransferPrices',
                loadChildren: './LocalTransferPrices/LocalTransferPrices.module#LocalTransferPricesModule'
            },
            {
                path: 'LocalCurrencyTransfers',
                loadChildren: './LocalCurrencyTransfers/LocalCurrencyTransfers.module#LocalCurrencyTransfersModule'
            },
            {
                path: 'CurrencyTransfers',
                loadChildren: './CurrencyTransfers/CurrencyTransfers.module#CurrencyTransfersModule'
            },
            {
                path: 'SellCurrencyOuts',
                loadChildren: './SellCurrencyOuts/SellCurrencyOuts.module#SellCurrencyOutsModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(MoneyTransferRoutes)],
    exports: [RouterModule]
})
export class MoneyTransferRoutingModule { }
