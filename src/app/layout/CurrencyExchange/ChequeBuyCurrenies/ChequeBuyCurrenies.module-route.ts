
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChequeBuyCurreniesComponent } from './ChequeBuyCurrenies.component';import { ChequeBuyCurrenyComponent } from './ChequeBuyCurreny.component'; 

const routes: Routes = [
    { path: '', component: ChequeBuyCurreniesComponent }
    , { path: ':id', component: ChequeBuyCurrenyComponent } ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class ChequeBuyCurreniesRoutingModule {}
	 
