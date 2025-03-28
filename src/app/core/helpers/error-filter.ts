import { HttpErrorResponse } from "@angular/common/http";
 export function getErrorMessage(error?: HttpErrorResponse): string | undefined {

   if (!error) {
      return undefined;
    }
    
    if (error?.status === 0) {
        return 'Network error or server unreachable.';
      }
    
    if (error?.error) {
      if (error.error?.message) {
        return error.error.message;
      }
    }
    
    return undefined;
  }