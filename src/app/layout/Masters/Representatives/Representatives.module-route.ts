
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepresentativesComponent } from './Representatives.component';import { RepresentativeComponent } from './Representative.component'; 

const routes: Routes = [
    { path: '', component: RepresentativesComponent }
    , { path: ':id', component: RepresentativeComponent } ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class RepresentativesRoutingModule {}
	 
