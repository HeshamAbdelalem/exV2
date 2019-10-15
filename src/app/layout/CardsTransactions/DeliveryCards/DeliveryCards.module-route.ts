
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryCardsComponent } from './DeliveryCards.component';import { DeliveryCardComponent } from './DeliveryCard.component'; 

const routes: Routes = [
    { path: '', component: DeliveryCardsComponent }
    , { path: ':id', component: DeliveryCardComponent } ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class DeliveryCardsRoutingModule {}
	 
