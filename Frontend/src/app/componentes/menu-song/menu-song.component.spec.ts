import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSongComponent } from './menu-song.component';

describe('MenuSongComponent', () => {
  let component: MenuSongComponent;
  let fixture: ComponentFixture<MenuSongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
