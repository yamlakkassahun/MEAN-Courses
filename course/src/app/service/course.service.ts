import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Course } from '../models/course.interface';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  getAllCourses(): Observable<Course[]> {
    const result = this.http.get<Course[]>('http://localhost:3000/api/courses').pipe(
      tap(() => this.snackBar.open(`All Courses Fetched Successfully`, 'close', {
        duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
      })),
      catchError(this.errorHandler)
    )
    return result;
  }

  createCourse(course: Course, image: File): Observable<Course> {
    const { name, description } = course;
    const courseData = new FormData();
    courseData.append("name", name);
    courseData.append("description", description);
    courseData.append("image", image);

    console.log(course);
    return this.http.post<Course>('http://localhost:3000/api/courses', courseData).pipe(
      tap(() => this.snackBar.open(`All Courses Fetched Successfully`, 'close', {
        duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
      })),
      catchError(this.errorHandler)
    )
  }

  deleteCourse(courseId: string): Observable<any> {
    return this.http.delete('http://localhost:3000/api/courses/' + courseId).pipe(
      tap(() => this.snackBar.open(`Courses Deleted Successfully`, 'close', {
        duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
      })),
      catchError(this.errorHandler)
    );
  }

  updateCourse(courseId: string , course: Course, image: File): Observable<any> {
    const { name, description } = course;
    const courseData = new FormData();
    courseData.append("name", name);
    courseData.append("description", description);
    courseData.append("image", image);
    
    return this.http.put('http://localhost:3000/api/courses/' + courseId, courseData).pipe(
      tap(() => this.snackBar.open(`Courses Updated Successfully`, 'close', {
        duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
      })),
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

