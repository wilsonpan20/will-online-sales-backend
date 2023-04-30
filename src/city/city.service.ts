import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }
  async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
    const citiesCache: CityEntity[] = await this.cacheManager.get(`${stateId}`);

    console.log('esta esta em cities cache', citiesCache);

    if (citiesCache) {
      console.log('esta esta em cities cache', citiesCache);
      // return citiesCache;
    }

    const cities = this.cityRepository.find({
      where: {
        stateId,
      },
    });

    console.log('passou da primeira verificação');

    await this.cacheManager.set(`${stateId}`, cities);
    console.log(await this.cacheManager.set(`${stateId}`, cities));
    console.log('esta em cities', cities);

    return cities;
  }
}
