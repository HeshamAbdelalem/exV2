
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellCurrencyOutsComponent } from './SellCurrencyOuts.component';import { SellCurrencyOutComponent } from './SellCurrencyOut.component'; 

const routes: Routes = [
    { path: '', component: SellCurrencyOutsComponent }
    , { path: ':id', component: SellCurrencyOutComponent } ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class SellCurrencyOutsRoutingModule {}
	 
