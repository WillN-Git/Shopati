import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesformComponent } from './categoriesform.component';

describe('CategoriesformComponent', () => {
  let component: CategoriesformComponent;
  let fixture: ComponentFixture<CategoriesformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesformComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
