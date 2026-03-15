import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
  ) {}

  async create(userId: number, dto: CreateAddressDto): Promise<Address> {
    // If setting as default, unset others first
    if (dto.isDefault) {
      await this.addressRepo.update({ userId }, { isDefault: false });
    }
    const address = this.addressRepo.create({ ...dto, userId });
    return this.addressRepo.save(address);
  }

  async findAllForUser(userId: number): Promise<Address[]> {
    return this.addressRepo.find({ where: { userId }, order: { isDefault: 'DESC' } });
  }

  async findOne(id: number, userId: number): Promise<Address> {
    const address = await this.addressRepo.findOne({ where: { id } });
    if (!address) throw new NotFoundException(`Address #${id} not found`);
    if (address.userId !== userId) throw new ForbiddenException('Access denied');
    return address;
  }

  async update(id: number, userId: number, dto: Partial<CreateAddressDto>): Promise<Address> {
    const address = await this.findOne(id, userId);
    if (dto.isDefault) {
      await this.addressRepo.update({ userId }, { isDefault: false });
    }
    Object.assign(address, dto);
    return this.addressRepo.save(address);
  }

  async remove(id: number, userId: number): Promise<{ message: string }> {
    const address = await this.findOne(id, userId);
    await this.addressRepo.remove(address);
    return { message: `Address #${id} deleted` };
  }

  async setDefault(id: number, userId: number): Promise<Address> {
    await this.addressRepo.update({ userId }, { isDefault: false });
    const address = await this.findOne(id, userId);
    address.isDefault = true;
    return this.addressRepo.save(address);
  }
}
