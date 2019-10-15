
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './Employees.component';import { EmployeeComponent } from './Employee.component'; 

const routes: Routes = [
    { path: '', component: EmployeesComponent }
    , { path: ':id', component: EmployeeComponent } ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class EmployeesRoutingModule {}
	 
