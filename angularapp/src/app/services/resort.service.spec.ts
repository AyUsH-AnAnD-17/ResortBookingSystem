import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ResortService } from './resort.service';

describe('ResortService', () => {
  let service: ResortService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ResortService]
    });

    service = TestBed.inject(ResortService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  fit('Frontend_should_add_a_resort_when_addResort_is_called', () => {
    const resort = {
      resortName: 'Paradise Cover',
      resortImageUrl: 'https://example.jpg',
      resortLocation: 'Tropical Island',
      resortAvailableStatus: 'Available',
      description: 'A breathtaking resort with stunning views.',
      price: 5000,
      capacity: 100
    };
    const response = { id: 1, ...resort };

    (service as any).addResort(resort).subscribe();
    const req = httpMock.expectOne(`${(service as any).apiUrl}/api/resort`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(resort);
    expect(req.request.headers.get('Authorization')).toBeTruthy();
    req.flush(response);
  });

  fit('Frontend_should_get_all_resorts_when_getAllResorts_is_called', () => {
    (service as any).getAllResorts().subscribe((resorts) => {
      expect(resorts).toBeTruthy();
    });

    const req = httpMock.expectOne(`${(service as any).apiUrl}/api/resort`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBeTruthy();
  });

  fit('Frontend_should_update_a_resort_when_updateResort_is_called', () => {
    const resortDetails = {
      resortId: 1,
      resortName: 'Updated Paradise Cover',
      resortImageUrl: 'https://example.jpg',
      resortLocation: 'Tropical Island',
      price: 1000,
      capacity: 10,
      description: 'A breathtaking resort with stunning views.',
      resortAvailableStatus: 'Approved'
    };

    (service as any).updateResort(resortDetails).subscribe();
    const req = httpMock.expectOne(`${(service as any).apiUrl}/api/resort/${resortDetails.resortId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(resortDetails);
    expect(req.request.headers.get('Authorization')).toBeTruthy();
  });

  fit('Frontend_should_delete_a_resort_when_deleteResort_is_called', () => {
    const resortId = 1;

    (service as any).deleteResort(resortId).subscribe();
    const req = httpMock.expectOne(`${(service as any).apiUrl}/api/resort/${resortId}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBeTruthy();
  });

  fit('Frontend_should_add_a_review_when_addReview_is_called', () => {
    const review = {
      userId: 1,
      subject: 'Amazing experience!',
      body: 'I had an amazing experience at Paradise Cove. The staff was friendly and the views were breathtaking.',
      rating: 5,
      dateCreated: new Date()
    };

    (service as any).addReview(review).subscribe();
    const req = httpMock.expectOne(`${(service as any).apiUrl}/api/review`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(review);
    expect(req.request.headers.get('Authorization')).toBeTruthy();
  });

  fit('Frontend_should_get_all_reviews_when_getAllReviews_is_called', () => {
    (service as any).getAllReviews().subscribe((reviews) => {
      expect(reviews).toBeTruthy();
    });

    const req = httpMock.expectOne(`${(service as any).apiUrl}/api/review`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBeTruthy();
  });
});
