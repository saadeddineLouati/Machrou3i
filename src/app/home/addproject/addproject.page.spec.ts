import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddprojectPage } from './addproject.page';

describe('AddprojectPage', () => {
  let component: AddprojectPage;
  let fixture: ComponentFixture<AddprojectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddprojectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddprojectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
