import { TestBed } from '@angular/core/testing';

import { TaskgroupService } from './taskgroup.service';

describe('TaskgroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskgroupService = TestBed.get(TaskgroupService);
    expect(service).toBeTruthy();
  });
});
