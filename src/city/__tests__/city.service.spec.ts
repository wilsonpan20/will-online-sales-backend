import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from '../city.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CityEntity } from '../entities/city.entity';
import { cityMock } from '../__mocks__/city.mock';
import { CacheService } from '../../cache/cache.service';



describe('CityService', () => {
  let service: CityService;
  let cityRepository: Repository<CityEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockReturnValue([cityMock])
          }
        },

        {
          provide: getRepositoryToken(CityEntity),
          useValue: {
            findOne: jest.fn().mockReturnValue(cityMock),
            find: jest.fn().mockResolvedValue(cityMock),

          }
        }
      ],
    }).compile();

    service = module.get<CityService>(CityService)
    cityRepository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity)
    )
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cityRepository).toBeDefined();
  });
  it('should return findOne  City', async () => {
    const city = await service.findCityById(cityMock.id)

    expect(city).toEqual(cityMock);

  });

  it('should return findOne not found', async () => {
    jest.spyOn(cityRepository, 'findOne').mockRejectedValueOnce(new Error)

    expect(service.findCityById(cityMock.id)).rejects.toThrowError();

  });
  it('should return Cities in getAllCitiesByStateId', async () => {
    const city = await service.getAllCitiesByStateId(cityMock.stateId)

    expect(city).toEqual([cityMock]);

  });

});
