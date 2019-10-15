
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrawCardsComponent } from './DrawCards.component';import { DrawCardComponent } from './DrawCard.component'; 

const routes: Routes = [
    { path: '', component: DrawCardsComponent }
    , { path: ':id', component: DrawCardComponent } ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class DrawCardsRoutingModule {}