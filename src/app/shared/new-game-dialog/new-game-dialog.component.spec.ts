import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectFourNewGameDialogComponent } from './connect-four-new-game-dialog.component';

describe('ConnectFourNewGameDialogComponent', () => {
  let component: ConnectFourNewGameDialogComponent;
  let fixture: ComponentFixture<ConnectFourNewGameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectFourNewGameDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectFourNewGameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
