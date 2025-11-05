import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

// PUBLIC_INTERFACE
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const isAuthed = auth.isAuthenticated();

  if (!isAuthed) {
    router.navigate(['/auth/login'], { queryParams: { redirect: state.url } });
    return false;
  }

  const allowedRoles = route.data?.['roles'] as string[] | undefined;
  if (allowedRoles && allowedRoles.length > 0) {
    const role = auth.role();
    if (!role || !allowedRoles.includes(role)) {
      router.navigate(['/']);
      return false;
    }
  }

  return true;
};
