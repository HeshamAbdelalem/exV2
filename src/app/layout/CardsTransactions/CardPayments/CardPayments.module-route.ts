
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardPaymentsComponent } from './CardPayments.component';import { CardPaymentComponent } from './CardPayment.component'; 

const routes: Routes = [
    { path: '', component: CardPaymentsComponent }
    , { path: ':id', component: CardPaymentComponent } ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class CardPaymentsRoutingModule {}
	 
