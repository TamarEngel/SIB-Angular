import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateChallengeComponent } from './update-challenge.component';

describe('UpdateChallengeComponent', () => {
  let component: UpdateChallengeComponent;
  let fixture: ComponentFixture<UpdateChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateChallengeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
