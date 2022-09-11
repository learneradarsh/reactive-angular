import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private readonly http: HttpClient) { }

  loadCourses$(): Observable<Course[]> {
    return this.http.get<Course[]>('/api/courses').pipe(
      map(res => res["payload"])
    );
  }
}
