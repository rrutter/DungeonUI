import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { townAccessGuard } from './town-access.guard';

describe('townAccessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => townAccessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
