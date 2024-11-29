import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnitamaSettingsComponent } from './onitama-settings.component';

describe('OnitamaSettingsComponent', () => {
  let component: OnitamaSettingsComponent;
  let fixture: ComponentFixture<OnitamaSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnitamaSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnitamaSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
