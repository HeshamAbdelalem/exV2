import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsTransactionsComponent } from './CardsTransactions.component';

export const CardsTransactionsRoutes: Routes = [
    {
        path: '',
        component: CardsTransactionsComponent,
        children: [
            {
                path: 'Cards',
                loadChildren: './Cards/Cards.module#CardsModule'
            },
            {
                path: 'BuyCards',
                loadChildren: './BuyCards/BuyCards.module#BuyCardsModule',
                data: { XCardsOperationsTypeID: 1 }
            },
            {
                path: 'CollectCardForPercent',
                loadChildren: './BuyCards/BuyCards.module#BuyCardsModule',
                data: { XCardsOperationsTypeID: 2 }
            },
            {
                path: 'CollectCardForValue',
                loadChildren: './BuyCards/BuyCards.module#BuyCardsModule',
                data: { XCardsOperationsTypeID: 3 }
            },
            {
                path: 'CardPayments',
                loadChildren: './CardPayments/CardPayments.module#CardPaymentsModule'
            },
            {
                path: 'SendCards',
                loadChildren: './SendCards/SendCards.module#SendCardsModule'
            }, 
            {
                path: 'DrawCards',
                loadChildren: './DrawCards/DrawCards.module#DrawCardsModule'
            }, 
            {
                path: 'BackCards',
                loadChildren: './BackCards/BackCards.module#BackCardsModule'
            }, 
            {
                path: 'DeliveryCards',
                loadChildren: './DeliveryCards/DeliveryCards.module#DeliveryCardsModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(CardsTransactionsRoutes)],
    exports: [RouterModule]
})
export class CardsTransactionsRoutingModule { }
