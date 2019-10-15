import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MastersComponent } from './Masters.component';

export const MastersRoutes: Routes = [
    {
        path: '',
        component: MastersComponent,
        children: [
            {
                path: '',
                redirectTo: 'Banks'
            },
            {
                path: 'Banks',
                loadChildren: './Banks/Banks.module#BanksModule'
            }
            ,
            {
                path: 'CardTypes',
                loadChildren: './CardTypes/CardTypes.module#CardTypesModule'
            }
            ,
            {
                path: 'Currencies',
                loadChildren: './Currencies/Currencies.module#CurrenciesModule'
            }
            ,
            {
                path: 'Countries',
                loadChildren: './Countries/Countries.module#CountriesModule'
            }
            ,
            {
                path: 'Cities',
                loadChildren: './Cities/Cities.module#CitiesModule'
            }
            ,
            {
                path: 'Treasuries',
                loadChildren: './Treasuries/Treasuries.module#TreasuriesModule'
            }
            ,
            {
                path: 'Guarantors',
                loadChildren: './Guarantors/Guarantors.module#GuarantorsModule'
            }
            ,
            {
                path: 'Representatives',
                loadChildren: './Representatives/Representatives.module#RepresentativesModule'
            }
            ,
            {
                path: 'CardIssuers',
                loadChildren: './CardIssuers/CardIssuers.module#CardIssuersModule'
            }
            ,
            {
                path: 'Customers',
                loadChildren: './Customers/Customers.module#CustomersModule'
            }
            ,
            {
                path: 'Treasuries',
                loadChildren: './Treasuries/Treasuries.module#TreasuriesModule'
            }
            ,
            {
                path: 'Employees',
                loadChildren: './Employees/Employees.module#EmployeesModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(MastersRoutes)],
    exports: [RouterModule]
})
export class MastersRoutingModule { }
