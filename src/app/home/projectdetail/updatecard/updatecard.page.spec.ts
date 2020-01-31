import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdatecardPage } from './updatecard.page';

describe('UpdatecardPage', () => {
  let component: UpdatecardPage;
  let fixture: ComponentFixture<UpdatecardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatecardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatecardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
