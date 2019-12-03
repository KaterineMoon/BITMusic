import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongToolsComponent } from './song-tools.component';

describe('SongToolsComponent', () => {
  let component: SongToolsComponent;
  let fixture: ComponentFixture<SongToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
