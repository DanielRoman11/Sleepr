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
      userId: '12345',
    });
  }

  async findAll() {
    return await this.reservationRepo.find({});
  }

  async findOne(_id: string) {
    return await this.reservationRepo.findOne({});
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return await this.reservationRepo.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  async remove(_id: string) {
    return await this.reservationRepo.findOneAndDelete({ _id });
  }
}
