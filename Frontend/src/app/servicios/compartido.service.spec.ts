import { TestBed } from '@angular/core/testing';

import { CompartidoService } from './compartido.service';

describe('CompartidoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompartidoService = TestBed.get(CompartidoService);
    expect(service).toBeTruthy();
  });
});
