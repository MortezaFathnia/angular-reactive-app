import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import {  Observable } from 'rxjs';
import { CourseService } from '../services/courses.service';
import { CourseStore } from '../services/courses.store';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(
    private courseService: CourseService,
    private courseStore: CourseStore
  ) {

  }

  ngOnInit() {
    this.reloadCourses()
  }

  reloadCourses() {


    this.beginnerCourses$ = this.courseStore.filterByCategory('BEGINNER')

    this.advancedCourses$ = this.courseStore.filterByCategory('ADVANCED')
  }
}




