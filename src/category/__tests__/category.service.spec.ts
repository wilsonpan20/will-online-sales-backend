import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category.service';
import { CategoryEntity } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { categoryMock } from '../__mocks__/category.mock';
import { createCategoryMock } from '../__mocks__/create.category.mock';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: Repository<CategoryEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService, {
        provide: getRepositoryToken(CategoryEntity),
        useValue: {
          findOne: jest.fn().mockResolvedValue([categoryMock]),
          find: jest.fn().mockResolvedValue([categoryMock]),
          save: jest.fn().mockReturnValue([categoryMock])
        }
      }],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<CategoryEntity>>(
      getRepositoryToken(CategoryEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryRepository).toBeDefined();
  });

  it('should return list category', async () => {
    const category = await service.findAllCategories()
    expect(category).toEqual([categoryMock]);
  });

  it('should return error in list category empty ', async () => {
    jest.spyOn(categoryRepository, 'find').mockResolvedValue([])

    expect(service.findAllCategories()).rejects.toThrowError();
  });

  it('should return error in list category exception ', async () => {
    jest.spyOn(categoryRepository, 'find').mockRejectedValue(new Error())

    expect(service.findAllCategories()).rejects.toThrowError();
  });

  it('should return  error if exist category name ', async () => {

    expect(service.createCategory).rejects.toThrowError()


  });

  it('should return  category after save ', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined)

    const category = await service.createCategory(createCategoryMock)


    expect(category[0]).toEqual(categoryMock)


  });


  it('should return error  exception ', async () => {
    jest.spyOn(categoryRepository, 'save').mockRejectedValue(new Error())

    expect(service.createCategory(createCategoryMock)).rejects.toThrowError();
  });


  it('should return  category in find by name ', async () => {
    const category = await service.findCategoryByName(categoryMock.name)

    expect(category[0]).toEqual(categoryMock)

  });


  it('should return  error if category find by name empty  ', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined)

    expect(service.findCategoryByName(categoryMock.name)).rejects.toThrowError()

  });

});
