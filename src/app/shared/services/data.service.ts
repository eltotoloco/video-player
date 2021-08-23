import { Injectable } from '@angular/core';
import { Observable, Subject, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators'
import { Video } from 'src/app/model/video';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
    })
};
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private requestSource = new Subject<Video>()
  videoRequested$ = this.requestSource.asObservable()
  private bookmarkVideoSource = new Subject<Video>()
  videoBookmarked$ = this.bookmarkVideoSource.asObservable()
  private REST_API_SERVER = "http://localhost:8000";
  
  constructor(private httpClient: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.log("error happend")
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  callBookmarkVideo(video:Video):Observable<any>{
    return this.httpClient.post(this.REST_API_SERVER+"/bookmarks",JSON.stringify(video),httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  callAddToHistory(video:Video):Observable<any>{
    console.log("Add video to history" + video + " json " + JSON.stringify(video))
    return this.httpClient.post(this.REST_API_SERVER+"/history",JSON.stringify(video),httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }
  
  getHistory(): Observable<any> {
    return this.httpClient.get(this.REST_API_SERVER+"/history",httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }
  getBookmarks(): Observable<any> {
    return this.httpClient.get(this.REST_API_SERVER+"/bookmarks",httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  addToHistory(video: any) {
    this.requestSource.next(video)
  }
  bookmarkVideo(video: Video) {
    this.bookmarkVideoSource.next(video)
  }

  isBookmarked(video:Video){

  }
  
}
