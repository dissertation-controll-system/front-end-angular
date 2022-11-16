import { TestBed } from '@angular/core/testing';

import { ProfileInfoResolver } from './profile-info.resolver';

describe('ProfileInfoResolver', () => {
  let resolver: ProfileInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProfileInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
