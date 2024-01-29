import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsComponent } from './details/details.component';

const appRoutes: Routes = [
	{ path: '', component: DashboardComponent },
	{ path: 'calendar', component: DashboardComponent },
	{ path: 'add', component: DetailsComponent },
	{ path: 'edit/:id', component: DetailsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
	FormsModule,
	RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
