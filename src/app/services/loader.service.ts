import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { concatMap, finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderSub = new BehaviorSubject<boolean>(true);
  loading$ = this.loaderSub.asObservable();
  constructor() { }

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null)
    .pipe(
      tap(() => this.loaderOn()),
      concatMap(() => obs$),
      finalize(() => this.loaderOff())
    )
  }

  loaderOn() {
    this.loaderSub.next(true);
  }

  loaderOff() {
    this.loaderSub.next(false);
  }
}
