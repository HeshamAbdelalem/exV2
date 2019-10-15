import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarComponent } from '../../../common/components/toolbar/toolbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [ CommonModule
    , MatIconModule
    , MatButtonModule
    , MatTooltipModule
    , MatMenuModule   
  ],
  declarations: [ ToolbarComponent ],
  exports: [ToolbarComponent]
})

export class ToolbarModule { }