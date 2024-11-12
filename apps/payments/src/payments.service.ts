import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from './dto/create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get<string>('STRIPE_SECRET'),
    {
      apiVersion: '2024-10-28.acacia',
    },
  );
  constructor(private readonly configService: ConfigService) {}

  async createCharge({ card, amount }: CreateChargeDto) {
    const paymentMetod = await this.stripe.paymentMethods.create({
      type: 'card',
      card,
    });

    const payment_intent = await this.stripe.paymentIntents.create({
      payment_method: paymentMetod.id,
      amount: amount * 100,
      confirm: true,
      payment_method_types: ['card'],
      currency: 'usd',
    });

    return payment_intent;
  }
}
