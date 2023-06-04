import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Search } from '../page/search';

@Injectable({
	providedIn: 'root',
})
export class SearchService {
	readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';

	constructor(private http: HttpClient) {}

	getLibraries(search: string) {
		const fields = 'filename,description,version';
		// const params = {
		// 	search: search,
		// 	fields: fields,
		// };

		let params = new HttpParams();
		params = params.set('search', search);
		params = params.set('fields', fields);

		return this.http.get<Search[]>(`${this.SEARCH_URL}`, { params }).pipe();
	}
}
