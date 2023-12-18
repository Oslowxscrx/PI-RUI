import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalAssetsComponent } from './modal-assets.component';


describe('ModalEmployeesComponent', () => {
  let component: ModalAssetsComponent;
  let fixture: ComponentFixture<ModalAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAssetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
