import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGraghComponent } from './admin-gragh.component';

describe('AdminGraghComponent', () => {
  let component: AdminGraghComponent;
  let fixture: ComponentFixture<AdminGraghComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminGraghComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGraghComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
