import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { Lesson } from "../model/lesson";
import { Observable, BehaviorSubject, of } from "rxjs";
import { CoursesService } from "./courses.service";
import { catchError, finalize } from "rxjs/operators";

export class LessonsDatasource implements DataSource<Lesson>{
        private lessonSubject = new BehaviorSubject<Lesson[]>([]);
        private loadingSubject = new BehaviorSubject<boolean>(false);
        public loading$ = this.loadingSubject.asObservable();
        constructor(private coursesService: CoursesService){}
        loadLessons(
            courseId:number,
            filter:string,
            sortDirection:string,
            pageIndex:number,
            pageSize:number
            ){
                this.loadingSubject.next(true)
                this.coursesService.findLessons(courseId, filter, sortDirection, pageIndex, pageSize)
                .pipe(catchError(() => of([])), finalize(() => this.loadingSubject.next(false)))
                .subscribe(lessons => this.lessonSubject.next(lessons));
            }
        connect ( collectionViewer: CollectionViewer): Observable<Lesson[]>{
            return this.lessonSubject.asObservable();   
        }   
        
        disconnect (collectionViewer:CollectionViewer):void{
                this.lessonSubject.complete();
        }
}   