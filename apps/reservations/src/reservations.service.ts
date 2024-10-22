import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationRepo: ReservationsRepository) {}

  async create(createReservationDto: CreateReservationDto) {
    console.log({ ...createReservationDto });
    return await this.reservationRepo.create({
      ...createReservationDto,
      timestamp: new Date(),
			userId: '12345'
    });
  }

  async findAll() {
    return await this.reservationRepo.find({});
  }

  async findOne(_id: string) {
    return await this.reservationRepo.findOne({});
  }

  update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepo.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  remove(_id: string) {
    return this.reservationRepo.findOneAndDelete({ _id });
  }
}
