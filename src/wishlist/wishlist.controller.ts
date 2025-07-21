import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { AddToWishlistDto } from './dto/wishlist.dto';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  // Agregar una obra: puedes enviar userId o sessionId por query (según autenticación)
  @Post()
  addToWishlist(
    @Body() dto: AddToWishlistDto,
    @Query('userId') userId?: string,
    @Query('sessionId') sessionId?: string,
  ) {
    return this.wishlistService.addToWishlist({ userId, sessionId }, dto);
  }

  // Traer obras en wishlist
  @Get()
  getWishlistItems(
    @Query('userId') userId?: string,
    @Query('sessionId') sessionId?: string,
  ) {
    return this.wishlistService.getWishlistItems({ userId, sessionId });
  }

  // Quitar obra de wishlist
  @Delete(':artworkId')
  removeFromWishlist(
    @Param('artworkId') artworkId: number,
    @Query('userId') userId?: string,
    @Query('sessionId') sessionId?: string,
  ) {
    return this.wishlistService.removeFromWishlist({ userId, sessionId }, artworkId);
  }
}