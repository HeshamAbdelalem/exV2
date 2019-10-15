import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemPagesCardsComponent } from './SystemPagesCards.component';
// import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
    {
        path: ':code',
        component: SystemPagesCardsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemPagesCardsRoutingModule {}
