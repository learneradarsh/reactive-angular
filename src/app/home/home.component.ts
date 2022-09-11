import {Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import { ApiService } from '../services/api.service';
import { LoaderService } from '../services/loader.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(private apiService: ApiService, 
    private dialog: MatDialog,
    private readonly loaderService: LoaderService) {

  }

  ngOnInit() {

    const couses$ = this.apiService.loadCourses$();

    const loadingCourses$ = this.loaderService.showLoaderUntilCompleted(couses$);

    this.beginnerCourses$ = loadingCourses$.pipe(
      map(courses => courses.filter(course => course.category === "BEGINNER"))
    );

    this.advancedCourses$ = loadingCourses$.pipe(
      map(courses => courses.filter(course => course.category === "ADVANCED"))
    );

  }

  editCourse(course: Course) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

  }

}




