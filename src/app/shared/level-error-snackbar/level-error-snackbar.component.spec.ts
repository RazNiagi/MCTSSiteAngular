import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelErrorSnackbarComponent } from './level-error-snackbar.component';

describe('LevelErrorSnackbarComponent', () => {
  let component: LevelErrorSnackbarComponent;
  let fixture: ComponentFixture<LevelErrorSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LevelErrorSnackbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelErrorSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
