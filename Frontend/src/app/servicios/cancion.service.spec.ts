import { TestBed } from '@angular/core/testing';

import { CancionService } from './cancion.service';

describe('CancionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CancionService = TestBed.get(CancionService);
    expect(service).toBeTruthy();
  });
});
