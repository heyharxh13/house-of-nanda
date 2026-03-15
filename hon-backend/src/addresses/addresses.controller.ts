import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  // POST /api/addresses
  @Post()
  create(@Request() req, @Body() dto: CreateAddressDto) {
    return this.addressesService.create(req.user.id, dto);
  }

  // GET /api/addresses
  @Get()
  findAll(@Request() req) {
    return this.addressesService.findAllForUser(req.user.id);
  }

  // GET /api/addresses/:id
  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.addressesService.findOne(+id, req.user.id);
  }

  // PATCH /api/addresses/:id
  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() dto: Partial<CreateAddressDto>) {
    return this.addressesService.update(+id, req.user.id, dto);
  }

  // PATCH /api/addresses/:id/set-default
  @Patch(':id/set-default')
  setDefault(@Request() req, @Param('id') id: string) {
    return this.addressesService.setDefault(+id, req.user.id);
  }

  // DELETE /api/addresses/:id
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.addressesService.remove(+id, req.user.id);
  }
}
