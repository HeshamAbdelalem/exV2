
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuarantorsComponent } from './Guarantors.component';import { GuarantorComponent } from './Guarantor.component'; 

const routes: Routes = [
    { path: '', component: GuarantorsComponent }
    , { path: ':id', component: GuarantorComponent } ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class GuarantorsRoutingModule {}
	 
