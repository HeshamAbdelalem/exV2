
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyTransfersComponent } from './CurrencyTransfers.component';import { CurrencyTransferComponent } from './CurrencyTransfer.component'; 

const routes: Routes = [
    { path: '', component: CurrencyTransfersComponent }
    , { path: ':id', component: CurrencyTransferComponent } ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class CurrencyTransfersRoutingModule {}
	 
