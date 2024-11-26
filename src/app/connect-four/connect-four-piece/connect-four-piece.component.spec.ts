import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectFourPieceComponent } from './connect-four-piece.component';

describe('ConnectFourPieceComponent', () => {
  let component: ConnectFourPieceComponent;
  let fixture: ComponentFixture<ConnectFourPieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectFourPieceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectFourPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
