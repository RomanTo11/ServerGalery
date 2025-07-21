import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Offer, OfferDocument } from './schemas/offer.schema';
import { CreateOfferDto } from './dto/offer.dto';

@Injectable()
export class OffersService {
  constructor(
    @InjectModel(Offer.name) private offerModel: Model<OfferDocument>,
  ) {}

  async create(createOfferDto: CreateOfferDto): Promise<Offer> {
    const createdOffer = new this.offerModel(createOfferDto);
    return createdOffer.save();
  }

  async findAll(): Promise<Offer[]> {
    return this.offerModel.find().exec();
  }

  async findByArtworkId(artworkId: number): Promise<Offer[]> {
    return this.offerModel.find({ artworkId }).exec();
  }

  async updateStatus(id: string, status: string): Promise<Offer | null> {
    return this.offerModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }
}