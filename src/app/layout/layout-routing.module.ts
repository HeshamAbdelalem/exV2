import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { Screen1Component } from './screen1/screen1.component';
import { Screen2Component } from './screen2/screen2.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'Configurations',
                loadChildren: './Configurations/Configurations.module#ConfigurationsModule'
            }
            ,
            {
                path: 'Masters',
                loadChildren: './Masters/Masters.module#MastersModule'
            }
            ,
            {
                path: 'CardsTransactions',
                loadChildren: './CardsTransactions/CardsTransactions.module#CardsTransactionsModule'
            },
            {
                path: 'CurrencyExchange',
                loadChildren: './CurrencyExchange/CurrencyExchange.module#CurrencyExchangeModule'
            },
            {
                path: 'MoneyTransfer',
                loadChildren: './MoneyTransfer/MoneyTransfer.module#MoneyTransferModule'
            },            
            {
                path: 'Pages',
                loadChildren: './components/SystemPagesCards/SystemPagesCards.module#SystemPagesCardsModule'
            }   
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule {}
