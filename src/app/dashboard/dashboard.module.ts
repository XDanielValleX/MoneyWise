import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './dashboard.page';

// 1. SharedModule
import { SharedModule } from '../shared/shared-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    SharedModule // 2. Agrégalo aquí a la lista de imports
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule { }