
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesComponent } from './Countries.component';

const routes: Routes = [
    { path: '', component: CountriesComponent }
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class CountriesRoutingModule {}
	 
