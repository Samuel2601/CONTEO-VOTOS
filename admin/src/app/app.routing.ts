import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { IndexDistributivonsComponent } from "./components/distributivons/index-distributivons/index-distributivons.component";
import { IndexDignidadComponent } from "./components/dignidads/index-dignidad/index-dignidad.component";
import { CreateDignidadComponent } from "./components/dignidads/create-dignidad/create-dignidad.component";
import { EditDignidadComponent } from "./components/dignidads/edit-dignidad/edit-dignidad.component";
import { AuthGuard } from "../app/guards/auth.guard";

import { ConfigComponent } from "./components/config/config.component";
import { IndexVotacionesComponent } from "./components/votaciones/index-votaciones/index-votaciones.component";
import { CreateVotacionesComponent } from "./components/votaciones/create-votaciones/create-votaciones.component";
import { ShowVotacionesComponent } from "./components/votaciones/show-votaciones/show-votaciones.component";

import { EditDistributivonComponent } from "./components/distributivons/edit-distributivon/edit-distributivon.component";

import { DetalleDistributivonComponent } from "./components/distributivons/detalle-distributivon/detalle-distributivon.component";
import { CreateDistributivonComponent } from "./components/distributivons/create-distributivon/create-distributivon.component";

import { IndexAdminComponent } from "./components/administrativo/index-administrativo/index-administrativo.component";
import { EditAdminComponent } from "./components/administrativo/edit-administrativo/edit-administrativo.component";
import { CreateAdminComponent } from "./components/administrativo/create-administrativo/create-administrativo.component";

const appRoute: Routes = [
	{ path: "", redirectTo: "login", pathMatch: "full" },
	{ path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
	{ path: "login", component: LoginComponent },

	{ path: "distributivons", component: IndexDistributivonsComponent, canActivate: [AuthGuard] },
	{
		path: "distributivons/create",
		component: CreateDistributivonComponent,
		canActivate: [AuthGuard]
	},
	{
		path: "distributivons/edit/:id",
		component: EditDistributivonComponent,
		canActivate: [AuthGuard]
	},
	{
		path: "distributivons/detalle/:id",
		component: DetalleDistributivonComponent,
		canActivate: [AuthGuard]
	},

	{ path: "administrativo", component: IndexAdminComponent, canActivate: [AuthGuard] },
	{
		path: "administrativo/create",
		component: CreateAdminComponent,
		canActivate: [AuthGuard]
	},
	{
		path: "administrativo/edit/:id",
		component: EditAdminComponent,
		canActivate: [AuthGuard]
	},

	{ path: "dignidads", component: IndexDignidadComponent, canActivate: [AuthGuard] },
	{path: 'dignidads/create', component: CreateDignidadComponent, canActivate:[AuthGuard]},
	{path: 'dignidads/edit/:id', component: EditDignidadComponent, canActivate:[AuthGuard]},

	{ path: "votaciones", component: IndexVotacionesComponent, canActivate: [AuthGuard] },
	{ path: "votaciones/create", component: CreateVotacionesComponent, canActivate: [AuthGuard] },
	{ path: "votaciones/:id", component: ShowVotacionesComponent, canActivate: [AuthGuard] },

	{ path: "configuraciones", component: ConfigComponent, canActivate: [AuthGuard] }

	/* {path: '**', component: NotFoundComponent}, */
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);
