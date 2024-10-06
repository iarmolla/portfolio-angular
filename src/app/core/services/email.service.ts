import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/User';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  httpClient = inject(HttpClient)
  constructor() { }
  async send(user: User) {
    return await firstValueFrom(this.httpClient.post(environment.formspreeUrl, user))
  }
}
