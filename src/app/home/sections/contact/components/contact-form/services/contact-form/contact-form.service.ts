import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { catchError, Observable, of, retry } from 'rxjs'
import { environment } from 'src/environments/environment'
import { ContactFormData } from '../models/contact-form.model'

// Protected against external usage, not provided in "root".
// Besides that, it only loads when "ContactFormComponent" loads.
@Injectable()
export class ContactFormService {
  private http = inject(HttpClient)

  post (data: ContactFormData): Observable<unknown> {
    return this.http
      .post(environment.formApiUrl, data)
      .pipe(
        retry(2),
        catchError(err => {
          console.log('Failed after all tries', err)
          return of('Fail')
        })
      )
  }
}
