import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    return true;
  }
  window.location.href = '/';
  return false;
};
