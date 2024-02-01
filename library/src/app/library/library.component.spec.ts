import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryComponent } from './library.component';
import { FormComponent } from '../form/form.component';
import { ActivatedRoute } from '@angular/router';
import { FilterPipe } from '../filter.pipe';
import { FormsModule } from '@angular/forms';

describe('LibraryComponent', () => {
  let component: LibraryComponent;
  let fixture: ComponentFixture<LibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LibraryComponent, FormComponent, FilterPipe],
      providers: [{   provide: ActivatedRoute,
        useValue: {
            snapshot: {
                paramMap: {
                    get(): string {
                        return '123';
                    },
                },
            },
        },
    }],
    imports: [FormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
