import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './page/search.component';
import { SearchRoutingModule } from './search-routing.module';

@NgModule({
	declarations: [SearchComponent],
	imports: [CommonModule, SearchRoutingModule, ReactiveFormsModule],
	exports: [SearchComponent],
})
export class SearchModule {}
