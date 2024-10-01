import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DungeonListComponent } from './dungeon-list.component';

describe('DungeonListComponent', () => {
  let component: DungeonListComponent;
  let fixture: ComponentFixture<DungeonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DungeonListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DungeonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
