
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrenciesComponent } from './Currencies.component';import { CurrencyComponent } from './Currency.component'; 

const routes: Routes = [
    { path: '', component: CurrenciesComponent }
    , { path: ':id', component: CurrencyComponent } ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class CurrenciesRoutingModule {}
	 
