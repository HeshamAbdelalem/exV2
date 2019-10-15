
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalTransferPricesComponent } from './LocalTransferPrices.component';

const routes: Routes = [
    { path: '', component: LocalTransferPricesComponent }
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class LocalTransferPricesRoutingModule {}
	 
