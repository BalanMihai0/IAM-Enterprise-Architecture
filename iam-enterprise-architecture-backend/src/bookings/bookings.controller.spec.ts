import { Test, TestingModule } from '@nestjs/testing';
import { BookingsController } from './bookings.controller';
import { BookingService } from './bookings.service';

describe('BookingsController',()=>{
    let controller:BookingsController;
    let service:BookingService;


    beforeEach(async()=>{
        const module:TestingModule=await Test.createTestingModule({
            controllers:[BookingsController],
            providers:[BookingService]
        }).compile();

        controller=module.get<BookingsController>(BookingsController);
        service=module.get<BookingService>(BookingService);
    });

    it('should be defined',()=>{
        expect(controller).toBeDefined();
    });
});


