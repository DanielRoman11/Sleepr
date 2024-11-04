import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { UserDto } from '@app/common';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationRepo: ReservationsRepository) {}

  async create(createReservationDto: CreateReservationDto, id: string) {
    return await this.reservationRepo.create({
      ...createReservationDto,
      userId: id,
    });
  }

  async findAll() {
    return await this.reservationRepo.find({});
  }

  async findOne(_id: string) {
    return await this.reservationRepo.findOne({ _id });
  }

  async update(
    _id: string,
    updateReservationDto: UpdateReservationDto,
  ) {
    return await this.reservationRepo.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  async remove(_id: string) {
    return await this.reservationRepo.findOneAndDelete({ _id });
  }
}
