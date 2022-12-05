import { LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { routing } from "./app.routing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule, NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxTinymceModule } from "ngx-tinymce";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { TopnavComponent } from "./components/topnav/topnav.component";

import { IndexDistributivonsComponent } from "./components/distributivons/index-distributivons/index-distributivons.component";
import { IndexDignidadComponent } from "./components/dignidads/index-dignidad/index-dignidad.component";
import { CreateDignidadComponent } from "./components/dignidads/create-dignidad/create-dignidad.component";
import { EditDignidadComponent } from "./components/dignidads/edit-dignidad/edit-dignidad.component";

import { ConfigComponent } from "./components/config/config.component";
import { IndexVotacionesComponent } from "./components/votaciones/index-votaciones/index-votaciones.component";
import { ShowVotacionesComponent } from "./components/votaciones/show-votaciones/show-votaciones.component";
import { CreateVotacionesComponent } from "./components/votaciones/create-votaciones/create-votaciones.component";

import { EditDistributivonComponent } from "./components/distributivons/edit-distributivon/edit-distributivon.component";
import { DetalleDistributivonComponent } from "./components/distributivons/detalle-distributivon/detalle-distributivon.component";
import { CreateDistributivonComponent } from "./components/distributivons/create-distributivon/create-distributivon.component";

import { CreateAdminComponent } from "./components/administrativo/create-administrativo/create-administrativo.component";
import { EditAdminComponent } from "./components/administrativo/edit-administrativo/edit-administrativo.component";
import { IndexAdminComponent } from "./components/administrativo/index-administrativo/index-administrativo.component";

import { FlatfileAdapterModule } from "@flatfile/angular";

import { MatTableExporterModule } from "mat-table-exporter";
import { MatTableModule } from "@angular/material/table";

import localeES from "@angular/common/locales/es";
import { registerLocaleData } from "@angular/common";
registerLocaleData(localeES, "es");
import { A11yModule } from "@angular/cdk/a11y";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { PortalModule } from "@angular/cdk/portal";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { CdkTableModule } from "@angular/cdk/table";
import { CdkTreeModule } from "@angular/cdk/tree";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatBadgeModule } from "@angular/material/badge";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTreeModule } from "@angular/material/tree";



import {CdkAccordionModule} from '@angular/cdk/accordion';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {OverlayModule} from '@angular/cdk/overlay';
//import {CdkMenuModule} from '@angular/cdk/menu';
//import {DialogModule} from '@angular/cdk/dialog';

import "./polyfills";

//mport {HttpClientModule} from '@angular/common/http';
//import {NgModule} from '@angular/core';
//import {FormsModule, ReactiveFormsModule} from '@angular/forms';
//import {MatNativeDateModule} from '@angular/material/core';
//import {BrowserModule} from '@angular/platform-browser';
//import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

//import {TableBasicExample} from './app/components/dashboard/dashboard.component';

@NgModule({
	exports: [
		CdkAccordionModule,
		ClipboardModule,
		OverlayModule,
		//CdkMenuModule,
		//DialogModule,
		A11yModule,
		CdkStepperModule,
		CdkTableModule,
		CdkTreeModule,
		DragDropModule,
		MatAutocompleteModule,
		MatBadgeModule,
		MatBottomSheetModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatCardModule,
		MatCheckboxModule,
		MatChipsModule,
		MatStepperModule,
		MatDatepickerModule,
		MatDialogModule,
		MatDividerModule,
		MatExpansionModule,
		MatGridListModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatMenuModule,
		MatNativeDateModule,
		MatPaginatorModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatRadioModule,
		MatRippleModule,
		MatSelectModule,
		MatSidenavModule,
		MatSliderModule,
		MatSlideToggleModule,
		MatSnackBarModule,
		MatSortModule,
		MatTableModule,
		MatTabsModule,
		MatToolbarModule,
		MatTooltipModule,
		MatTreeModule,
		PortalModule,
		ScrollingModule,
		BrowserAnimationsModule
	],
	declarations: [
		AppComponent,
		LoginComponent,
		DashboardComponent,
		SidebarComponent,
		TopnavComponent,
		IndexDistributivonsComponent,
		IndexDignidadComponent,
		CreateDignidadComponent,
		EditDignidadComponent,
		CreateAdminComponent,
		EditAdminComponent,
		IndexAdminComponent,
		ConfigComponent,
		IndexVotacionesComponent,
		ShowVotacionesComponent,
		CreateVotacionesComponent,
		EditDistributivonComponent,
		DetalleDistributivonComponent,
		CreateDistributivonComponent
	],

	imports: [
		FlatfileAdapterModule,
		BrowserModule,
		AppRoutingModule,
		routing,
		FormsModule,
		HttpClientModule,
		NgbPaginationModule,
		MatTableModule,
		MatTableExporterModule,
		MatNativeDateModule,
		BrowserAnimationsModule,
		MatProgressBarModule,
		ReactiveFormsModule,
		
		NgxTinymceModule.forRoot({
			//baseURL: '../../../assets/tinymce/',
			baseURL: "//cdnjs.cloudflare.com/ajax/libs/tinymce/5.7.1/"
		})
	],
	providers: [{ provide: LOCALE_ID, useValue: "es" }],
	bootstrap: [AppComponent]
})
export class AppModule {}
