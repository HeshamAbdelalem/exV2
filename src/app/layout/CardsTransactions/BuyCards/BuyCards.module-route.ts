
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyCardsComponent } from './BuyCards.component'; import { BuyCardComponent } from './BuyCard.component';

const routes: Routes = [
    { path: '', component: BuyCardsComponent }
    , { path: ':id/:XCardsOperationsTypeID', component: BuyCardComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class BuyCardsRoutingModule { }