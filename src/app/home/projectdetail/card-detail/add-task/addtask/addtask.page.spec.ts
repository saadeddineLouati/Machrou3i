import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddtaskPage } from './addtask.page';

describe('AddtaskPage', () => {
  let component: AddtaskPage;
  let fixture: ComponentFixture<AddtaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtaskPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddtaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
