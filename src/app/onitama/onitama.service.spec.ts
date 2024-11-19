import { TestBed } from '@angular/core/testing';

import { OnitamaService } from './onitama.service';

describe('OnitamaService', () => {
  let service: OnitamaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnitamaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
