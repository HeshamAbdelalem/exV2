
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashBuyCurrenciesComponent } from './CashBuyCurrencies.component';
import { CashBuyCurrencyComponent } from './CashBuyCurrency.component';

const routes: Routes = [
    { path: '', component: CashBuyCurrenciesComponent }
    , { path: ':id', component: CashBuyCurrencyComponent, data: { title: 'zaid' } }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class CashBuyCurrenciesRoutingModule { }

