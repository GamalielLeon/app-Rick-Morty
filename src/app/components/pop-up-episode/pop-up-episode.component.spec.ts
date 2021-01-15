import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpEpisodeComponent } from './pop-up-episode.component';

xdescribe('PopUpEpisodeComponent', () => {
  let component: PopUpEpisodeComponent;
  let fixture: ComponentFixture<PopUpEpisodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpEpisodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpEpisodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
