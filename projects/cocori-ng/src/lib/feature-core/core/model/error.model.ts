import { HttpErrorResponse } from '@angular/common/http';

export interface ErrorStacktraceModel {
  message: string;
  stacktrace?: StacktraceModel;
}

export interface StacktraceModel {
  dateError: string,
  httpError: HttpErrorResponse,
}