import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
	Observable,
	debounceTime,
	distinctUntilChanged,
	filter,
	map,
	switchMap,
	tap,
} from 'rxjs';
import { SearchService } from '../shared/search.service';
import { Search } from './search';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
	public searchField: FormGroup;
	public result$: Observable<Search[]> | undefined;
	public total: number;

	constructor(private fb: FormBuilder, private searchService: SearchService) {
		this.searchField = this.fb.group({
			queryField: [null],
		});

		// this.result$ = new Observable();
		this.total = 0;
	}

	ngOnInit() {
		this.getSearch();
	}

	onSearch() {
		let value = this.searchField.get('queryField')?.value;

		if (value && (value = value.trim()) !== '') {
			this.result$ = this.searchService.getLibraries(value).pipe(
				tap((res: any) => (this.total = res.total)),
				map((res: any) => res.results)
			);
		}
	}

	getSearch() {
		(this.result$ = this.searchField.get('queryField')?.valueChanges.pipe(
			map(value => value.trim()),
			filter(value => value.length > 1),
			debounceTime(200),
			distinctUntilChanged(),
			// tap(value => console.log(value)),
			switchMap(
				value => (this.result$ = this.searchService.getLibraries(value))
			)
		)),
			tap((res: any) => (this.total = res.total)),
			map((res: any) => res.results);
	}
}
