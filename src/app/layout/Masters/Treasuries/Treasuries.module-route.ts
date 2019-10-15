
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreasuriesComponent } from './Treasuries.component';

const routes: Routes = [
    { path: '', component: TreasuriesComponent }
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class TreasuriesRoutingModule {}
	 
