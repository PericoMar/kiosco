import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageOptionComponent } from './language-option.component';

describe('LanguageOptionComponent', () => {
  let component: LanguageOptionComponent;
  let fixture: ComponentFixture<LanguageOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageOptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LanguageOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
