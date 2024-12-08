import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPerfumeComponent } from './editar-perfume.component';

describe('EditarPerfumeComponent', () => {
  let component: EditarPerfumeComponent;
  let fixture: ComponentFixture<EditarPerfumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPerfumeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPerfumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
