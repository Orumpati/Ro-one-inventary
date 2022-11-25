import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';

import {MatTableModule} from '@angular/material/table'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import { QrCodeModule } from 'ng-qrcode';
import { QRCodeModule } from 'angularx-qrcode';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,


    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    QrCodeModule,
    QRCodeModule
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
