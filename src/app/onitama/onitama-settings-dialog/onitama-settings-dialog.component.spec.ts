import { ComponentFixture, TestBed } from '@angular/core/testing';

import {OnitamaSettingsDialogComponent} from './onitama-settings-dialog.component';

describe('OnitamaSettingsDialogComponent', () => {
  let component: OnitamaSettingsDialogComponent;
  let fixture: ComponentFixture<OnitamaSettingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnitamaSettingsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnitamaSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
