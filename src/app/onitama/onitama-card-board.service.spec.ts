import { TestBed } from '@angular/core/testing';

import { OnitamaCardBoardService } from './onitama-card-board.service';

describe('OnitamaCardBoardService', () => {
  let service: OnitamaCardBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnitamaCardBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
