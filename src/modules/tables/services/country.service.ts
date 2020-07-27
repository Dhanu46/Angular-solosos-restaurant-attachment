import { RESTAURANTS } from './../data/countries';
import { DecimalPipe } from '@angular/common';
import { Injectable, PipeTransform } from '@angular/core';
;
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { RestaurantList } from '../models';
import { SortDirection } from '../directives';

interface SearchResult {
    restaurants: RestaurantList[];
    total: number;
}

interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: string;
    sortDirection: SortDirection;
}

function compare(v1: number | string, v2: number | string) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(countries: RestaurantList[], column: string, direction: string): RestaurantList[] {
    if (direction === '') {
        return countries;
    } else {
        return [...countries].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}

function matches(country: RestaurantList, term: string, pipe: PipeTransform) {
    return (
        country.name.toLowerCase().includes(term.toLowerCase()) ||
        pipe.transform(country.area).includes(term) ||
        pipe.transform(country.population).includes(term)
    );
}

@Injectable({ providedIn: 'root' })
export class CountryService {
    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    private _restaurants$ = new BehaviorSubject<RestaurantList[]>([]);
    private _total$ = new BehaviorSubject<number>(0);

    private _state: State = {
        page: 1,
        pageSize: 4,
        searchTerm: '',
        sortColumn: '',
        sortDirection: '',
    };

    constructor(private pipe: DecimalPipe) {
        this._search$
            .pipe(
                tap(() => this._loading$.next(true)),
                debounceTime(120),
                switchMap(() => this._search()),
                delay(120),
                tap(() => this._loading$.next(false))
            )
            .subscribe(result => {
                this._restaurants$.next(result.restaurants);
                this._total$.next(result.total);
            });

        this._search$.next();
    }

    get countries$() {
        return this._restaurants$.asObservable();
    }
    get total$() {
        return this._total$.asObservable();
    }
    get loading$() {
        return this._loading$.asObservable();
    }
    get page() {
        return this._state.page;
    }
    set page(page: number) {
        this._set({ page });
    }
    get pageSize() {
        return this._state.pageSize;
    }
    set pageSize(pageSize: number) {
        this._set({ pageSize });
    }
    get searchTerm() {
        return this._state.searchTerm;
    }
    set searchTerm(searchTerm: string) {
        this._set({ searchTerm });
    }
    set sortColumn(sortColumn: string) {
        this._set({ sortColumn });
    }
    set sortDirection(sortDirection: SortDirection) {
        this._set({ sortDirection });
    }

    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    private _search(): Observable<SearchResult> {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

        // 1. sort
        let restaurants = sort(RESTAURANTS, sortColumn, sortDirection);

        // 2. filter
        restaurants = restaurants.filter(country => matches(country, searchTerm, this.pipe));
        const total = restaurants.length;

        // 3. paginate
        restaurants = restaurants.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return of({ restaurants, total });
    }
}
