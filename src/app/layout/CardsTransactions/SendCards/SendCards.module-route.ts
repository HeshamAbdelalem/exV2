
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendCardsComponent } from './SendCards.component';import { SendCardComponent } from './SendCard.component'; 

const routes: Routes = [
    { path: '', component: SendCardsComponent }
    , { path: ':id', component: SendCardComponent } ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class SendCardsRoutingModule {}