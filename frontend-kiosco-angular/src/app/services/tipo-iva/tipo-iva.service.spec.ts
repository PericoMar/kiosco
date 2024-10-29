import { TestBed } from '@angular/core/testing';

import { TipoIvaService } from './tipo-iva.service';

describe('TipoIvaService', () => {
  let service: TipoIvaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoIvaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
