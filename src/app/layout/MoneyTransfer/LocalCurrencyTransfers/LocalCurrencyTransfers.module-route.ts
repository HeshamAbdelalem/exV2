
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalCurrencyTransfersComponent } from './LocalCurrencyTransfers.component';import { LocalCurrencyTransferComponent } from './LocalCurrencyTransfer.component'; 

const routes: Routes = [
    { path: '', component: LocalCurrencyTransfersComponent }
    , { path: ':id', component: LocalCurrencyTransferComponent } ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class LocalCurrencyTransfersRoutingModule {}
	 
