
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BanksComponent } from './Banks.component';

const routes: Routes = [
    { path: '', component: BanksComponent }
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class BanksRoutingModule {}
	 
