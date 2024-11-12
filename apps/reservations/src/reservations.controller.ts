import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { CurrentUser, JwtAuthGuard, UserDto } from '@app/common';
import { ObjectIdPipe } from './pipes/objectId-validation.pipe';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createReservationDto: CreateReservationDto,
    @CurrentUser() user?: UserDto,
  ) {
    return await this.reservationsService.create(
      createReservationDto,
      user._id,
    );
  }

  @Get()
  async findAll() {
    return await this.reservationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ObjectIdPipe()) id: string) {
    return await this.reservationsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', new ObjectIdPipe()) id: string,
    @Body() updateReservationDto: UpdateReservationDto,
    @CurrentUser() user?: UserDto,
  ) {
    return await this.reservationsService.update(
      id,
      user._id,
      updateReservationDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('id', new ObjectIdPipe()) id: string,
    @CurrentUser() user?: UserDto,
  ) {
    return await this.reservationsService.remove(id, user._id);
  }
}
