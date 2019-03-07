import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppHttpInterceptorService } from './http-service';
import { DisplayItemsComponent } from './display-items/display-items.component';
import { AddItemsComponent } from './add-items/add-items.component';
import { RemoveItemsComponent } from './remove-items/remove-items.component';
import { BorrowItemComponent } from './borrow-item/borrow-item.component';
import { ReturnItemComponent } from './return-item/return-item.component';
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { ReserveItemsComponent } from './reserve-items/reserve-items.component';

const routes: Routes = [
  { path: 'addItem', component: AddItemsComponent },
  { path: 'removeItem', component: RemoveItemsComponent },
  { path: 'borrowItem', component: BorrowItemComponent },
  { path: 'returnItem', component: ReturnItemComponent },
  { path: 'displayItems', component: DisplayItemsComponent },
  { path: 'generateReport', component: GenerateReportComponent },
  { path: 'reserveItem', component: ReserveItemsComponent },
  { path: '**', redirectTo: '/displayItems', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    DisplayItemsComponent,
    GenerateReportComponent,
    AddItemsComponent,
    RemoveItemsComponent,
    BorrowItemComponent,
    ReturnItemComponent,
    ReserveItemsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'Csrf-Token',
      headerName: 'Csrf-Token',
    }),
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptorService
    }
  ],
  bootstrap: [AppComponent,DisplayItemsComponent]
})
export class AppModule {
}
