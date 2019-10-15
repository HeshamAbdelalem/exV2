import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardsTransactionsRoutingModule } from './CardsTransactions.module-routes';
import { CardsTransactionsComponent } from './CardsTransactions.component';

import { TranslateModule } from '@ngx-translate/core';
// import { CardSearchComponent } from './card-search/card-search.component';


@NgModule({
    imports: [
        CommonModule,
        CardsTransactionsRoutingModule,
        TranslateModule
    ],
    declarations: [
        CardsTransactionsComponent,
        // CardSearchComponent,
    ],
    providers: []
})
export class CardsTransactionsModule { }
