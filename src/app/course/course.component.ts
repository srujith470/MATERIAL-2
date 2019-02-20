import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Course} from "../model/course";
import {CoursesService} from "../services/courses.service";
import {debounceTime, distinctUntilChanged, startWith, tap, timeout} from 'rxjs/operators';
import {merge} from "rxjs/observable/merge";
import {fromEvent} from 'rxjs/observable/fromEvent';
import { LessonsDatasource } from '../services/lessons.datasource';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    course:Course;
    dataSource   :  LessonsDatasource;
    @ViewChild(MatPaginator)
    paginator: MatPaginator;
    constructor(private route: ActivatedRoute,
                private coursesService: CoursesService) {

    }
    displayColumns = ["seqNo","description","duration"]

    ngOnInit() {

        this.course = this.route.snapshot.data["course"];
        this.dataSource = new LessonsDatasource(this.coursesService);
        this.dataSource.loadLessons(this.course.id,'', 'asc',0,3)
    }

    ngAfterViewInit() {
        this.paginator.page.pipe(
           // startWith(null),
            tap(() => this.dataSource.loadLessons(this.course.id, '','asc', this.paginator.pageIndex, this.paginator.pageSize))
        ).subscribe();
    }
}
