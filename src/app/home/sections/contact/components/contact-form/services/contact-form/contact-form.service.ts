import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { catchError, Observable, retry, throwError } from 'rxjs'
import { environment } from 'src/environments/environment'
import { ContactFormData, ContactFormResponse } from '../models/contact-form.model'

// Protected against external usage, not provided in "root".
// Besides that, it only loads when "ContactFormComponent" loads.
@Injectable()
export class ContactFormService {
  private http = inject(HttpClient)

  post (data: ContactFormData): Observable<ContactFormResponse> {
    return this.http
      .post<ContactFormResponse>(environment.formApiUrl, data)
      .pipe(
        retry(2),
        catchError(err => throwError(() => err))
      )
  }
}
