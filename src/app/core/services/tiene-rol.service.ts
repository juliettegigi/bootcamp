import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TieneRol {
  getUserRoles(): { rol: string }[] {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return JSON.parse(localStorage.getItem('userRoles') ?? '[]');
    }
    return [];
  }

  hasRole(role: string): boolean {
    const roles = this.getUserRoles();
    return roles.some((element) => element.rol === role);
  }
}