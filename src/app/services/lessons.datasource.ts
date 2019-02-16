import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { Lesson } from "../model/lesson";
import { Observable } from "rxjs";
import { CoursesService } from "./courses.service";

export class LessonsDatasource implements DataSource<Lesson>{
        
        constructor(private coursesService: CoursesService){}
        connect ( collectionViewer: CollectionViewer): Observable<Lesson[]>{
            return undefined
        }
        disconnect (collectionViewer:CollectionViewer):void{

        }
}   