import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuartoPieceComponent } from './quarto-piece.component';

describe('QuartoPieceComponent', () => {
  let component: QuartoPieceComponent;
  let fixture: ComponentFixture<QuartoPieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuartoPieceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuartoPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
