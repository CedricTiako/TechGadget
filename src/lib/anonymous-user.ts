import { v4 as uuidv4 } from 'uuid';

const ANONYMOUS_ID_KEY = 'anonymous_user_id';

export function getAnonymousId(): string {
  let anonymousId = localStorage.getItem(ANONYMOUS_ID_KEY);
  
  if (!anonymousId) {
    anonymousId = uuidv4();
    localStorage.setItem(ANONYMOUS_ID_KEY, anonymousId);
  }
  
  return anonymousId;
}

export function getUserAgent(): string {
  return navigator.userAgent;
}