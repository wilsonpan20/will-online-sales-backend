import { Controller, Get } from '@nestjs/common';
import { ReturnCategoryDto } from './dtos/return-category.dto';
import { CategoryService } from './category.service';
import { Roles } from 'src/decorators/role.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
@Roles(UserType.Admin, UserType.User)
@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService
  ) { }
  @Get()
  async findAllCategories(): Promise<ReturnCategoryDto[]> {
    return (await this.categoryService.findAllCategories()).map((category) => new ReturnCategoryDto(category))

  }
}
