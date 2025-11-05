import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/models';

/**
 * ApiService centralizes HTTP interaction, base URL, and response normalization.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = environment.API_BASE_URL.replace(/\/+$/, '');

  private url(path: string): string {
    const p = path.startsWith('/') ? path : `/${path}`;
    return `${this.base}${p}`;
  }

  // PUBLIC_INTERFACE
  public get<T>(path: string, params?: Record<string, any>): Observable<T> {
    const httpParams = params ? new HttpParams({ fromObject: params }) : undefined;
    return this.http.get<ApiResponse<T> | T>(this.url(path), { params: httpParams }).pipe(
      map((res: any) => (typeof res?.success === 'boolean' ? res.data : res)),
      catchError(this.handleError)
    );
  }

  // PUBLIC_INTERFACE
  public post<T>(path: string, body?: any, params?: Record<string, any>): Observable<T> {
    const httpParams = params ? new HttpParams({ fromObject: params }) : undefined;
    return this.http.post<ApiResponse<T> | T>(this.url(path), body, { params: httpParams }).pipe(
      map((res: any) => (typeof res?.success === 'boolean' ? res.data : res)),
      catchError(this.handleError)
    );
  }

  // PUBLIC_INTERFACE
  public put<T>(path: string, body?: any, params?: Record<string, any>): Observable<T> {
    const httpParams = params ? new HttpParams({ fromObject: params }) : undefined;
    return this.http.put<ApiResponse<T> | T>(this.url(path), body, { params: httpParams }).pipe(
      map((res: any) => (typeof res?.success === 'boolean' ? res.data : res)),
      catchError(this.handleError)
    );
  }

  // PUBLIC_INTERFACE
  public delete<T>(path: string, params?: Record<string, any>): Observable<T> {
    const httpParams = params ? new HttpParams({ fromObject: params }) : undefined;
    return this.http.delete<ApiResponse<T> | T>(this.url(path), { params: httpParams }).pipe(
      map((res: any) => (typeof res?.success === 'boolean' ? res.data : res)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    const message =
      (error.error && (error.error.message || error.error.error)) ||
      error.message ||
      'Unexpected error occurred.';
    return throwError(() => new Error(message));
  }
}
