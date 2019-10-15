
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankAccountsComponent } from './BankAccounts.component';import { BankAccountComponent } from './BankAccount.component'; 

const routes: Routes = [
    { path: '', component: BankAccountsComponent }
    , { path: ':id', component: BankAccountComponent } ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class BankAccountsRoutingModule {}
	 
