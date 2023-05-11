import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('./templates/home/home.module').then(m => m.HomeModule),
	},
	{
		path: 'table',
		loadChildren: () =>
			import('./templates/table/table.module').then(m => m.TableModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
