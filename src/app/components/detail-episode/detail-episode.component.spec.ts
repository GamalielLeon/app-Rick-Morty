import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEpisodeComponent } from './detail-episode.component';

describe('DetailEpisodeComponent', () => {
  let component: DetailEpisodeComponent;
  let fixture: ComponentFixture<DetailEpisodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailEpisodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEpisodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
