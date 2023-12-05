import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResult } from '../models/results/login/LoginResult';
import { Observable } from 'rxjs';
import { Credentials } from '../models/login/Credentials';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = 'https://localhost:7089/auth/login';
  constructor(private client: HttpClient) {}

  login(credentials: Credentials): Observable<LoginResult> {
    return this.client.post<LoginResult>(this.baseUrl, credentials);
  }
}
