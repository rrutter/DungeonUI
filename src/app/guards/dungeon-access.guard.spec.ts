import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { dungeonAccessGuard } from './dungeon-access.guard';

describe('dungeonAccessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => dungeonAccessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
