
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackCardsComponent } from './BackCards.component';import { BackCardComponent } from './BackCard.component'; 

const routes: Routes = [
    { path: '', component: BackCardsComponent }
    , { path: ':id', component: BackCardComponent } ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class BackCardsRoutingModule {}
	 
