import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuartoBoardComponent } from './quarto-board.component';

describe('QuartoBoardComponent', () => {
  let component: QuartoBoardComponent;
  let fixture: ComponentFixture<QuartoBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuartoBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuartoBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
