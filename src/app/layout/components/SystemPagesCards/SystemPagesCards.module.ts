import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
// import { ChartsModule as Ng2Charts } from 'ng2-charts';

// import {
//   MatGridListModule,
//   MatCardModule,
//   MatTableModule,
//   MatButtonModule,
//   MatBadgeModule,
//   MatIconModule
// } from '@angular/material';

import { SystemPagesCardsRoutingModule } from './SystemPagesCards.module-routing';
import { SystemPagesCardsComponent } from './SystemPagesCards.component';
import { SystemMenuPageService } from '../../../services/Configurations/SystemMenuPage.service';
import { SystemMenuService } from '../../../services/Configurations/SystemMenu.service';
import { MaterialModule } from '../../../common/mat-components';
// import { SystemMenuPageService } from '../../../services/Authorizations/SystemMenuPage.service';
// import { SystemPageService } from '../../../services/Authorizations/SystemPage.service';
// import { TextSummaryPipe } from '../../../pipes/TextSummary.pipe';

@NgModule({
  imports: [
    CommonModule,
    // MatGridListModule,
    // MatCardModule,
    // MatCardModule,
    // MatTableModule,
    // MatButtonModule,
    // MatIconModule,
    // MatBadgeModule,
    MaterialModule,
    SystemPagesCardsRoutingModule,

    // Ng2Charts,

    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ],
  declarations: [
    SystemPagesCardsComponent
  ],
  providers: [
    SystemMenuService,
    SystemMenuPageService
    // TextSummaryPipe,
    // SystemPageService,
    // SystemMenuPageService
  ]
})
export class SystemPagesCardsModule { }
