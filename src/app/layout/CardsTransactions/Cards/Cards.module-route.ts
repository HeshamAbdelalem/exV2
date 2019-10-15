
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './Cards.component';
import { CardComponent } from './Card.component'; 

const routes: Routes = [
    { path: '', component: CardsComponent }
    , { path: ':id', component: CardComponent } ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class CardsRoutingModule {}
	 
