import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnitamaPieceComponent } from './onitama-piece.component';

describe('OnitamaPieceComponent', () => {
  let component: OnitamaPieceComponent;
  let fixture: ComponentFixture<OnitamaPieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnitamaPieceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnitamaPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
