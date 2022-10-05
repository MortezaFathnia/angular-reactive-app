import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { interval, noop, Observable, of, throwError, timer } from 'rxjs';
import { catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap } from 'rxjs/operators';
import { CourseService } from '../../../services/courses.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(
    private courseService: CourseService
  ) {

  }

  ngOnInit() {
    this.reloadCourses()
  }

  reloadCourses() {
    const courses$ = this.courseService.loadAllCourses()
      .pipe(map(courses => courses.sort(sortCoursesBySeqNo)));

    this.beginnerCourses$ = courses$
      .pipe(
        map(courses => courses.filter(course => course.category == 'BEGINNER'))
      );

    this.advancedCourses$ = courses$
      .pipe(
        map(courses => courses.filter(course => course.category == 'ADVANCED'))
      )
  }
}




