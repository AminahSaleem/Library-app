import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsComponent } from './book-details.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FormComponent } from '../form/form.component';

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;

  beforeEach(async () => {
    const activatedRouteMock = {
      params: of({id: '123a'})
    }
    await TestBed.configureTestingModule({
      declarations: [BookDetailsComponent, FormComponent],
      providers: [{provide: ActivatedRoute, useValue: activatedRouteMock}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
