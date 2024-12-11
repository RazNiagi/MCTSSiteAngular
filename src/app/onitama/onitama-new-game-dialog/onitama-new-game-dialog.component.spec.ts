import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnitamaNewGameDialogComponent } from './onitama-new-game-dialog.component';

describe('OnitamaNewGameDialogComponent', () => {
  let component: OnitamaNewGameDialogComponent;
  let fixture: ComponentFixture<OnitamaNewGameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnitamaNewGameDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnitamaNewGameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
