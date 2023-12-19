import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigStateComponent } from './configState.component';

describe('ConfigStateComponent', () => {
  let component: ConfigStateComponent;
  let fixture: ComponentFixture<ConfigStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigStateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
