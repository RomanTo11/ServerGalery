import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wishlist, WishlistDocument } from './schemas/wishlist.schema';
import { AddToWishlistDto } from './dto/wishlist.dto';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist.name) private wishlistModel: Model<WishlistDocument>,
  ) {}

  // Buscar por userId o sessionId
  async findWishlist({ userId, sessionId }: { userId?: string; sessionId?: string }) {
    return this.wishlistModel.findOne({ $or: [{ userId }, { sessionId }] }).exec();
  }

  async addToWishlist({ userId, sessionId }: { userId?: string; sessionId?: string }, dto: AddToWishlistDto) {
    let wishlist = await this.findWishlist({ userId, sessionId });
    if (!wishlist) {
      wishlist = new this.wishlistModel({ userId, sessionId, items: [] });
    }
    wishlist.items.push({ artworkId: dto.artworkId, dateAdded: new Date() });
    return wishlist.save();
  }

  async removeFromWishlist({ userId, sessionId }: { userId?: string; sessionId?: string }, artworkId: number) {
    const wishlist = await this.findWishlist({ userId, sessionId });
    if (!wishlist) return null;
    wishlist.items = wishlist.items.filter((item) => item.artworkId !== artworkId);
    return wishlist.save();
  }

  async getWishlistItems({ userId, sessionId }: { userId?: string; sessionId?: string }) {
    const wishlist = await this.findWishlist({ userId, sessionId });
    return wishlist ? wishlist.items : [];
  }
}