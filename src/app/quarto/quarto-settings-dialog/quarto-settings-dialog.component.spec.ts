import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuartoSettingsDialogComponent } from './quarto-settings-dialog.component';

describe('QuartoSettingsDialogComponent', () => {
  let component: QuartoSettingsDialogComponent;
  let fixture: ComponentFixture<QuartoSettingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuartoSettingsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuartoSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
