import { TestBed } from '@angular/core/testing';

import { AuthauthService } from './authauth.service';

describe('AuthauthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthauthService = TestBed.get(AuthauthService);
    expect(service).toBeTruthy();
  });
});
