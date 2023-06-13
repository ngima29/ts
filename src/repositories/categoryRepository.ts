import { CategoryInterface, InputCategoryInterface } from "../interfaces";
import { Category } from "../models";
import { BaseRepository } from "./baseRepository";

export class CategoryRepository extends BaseRepository<
InputCategoryInterface,
CategoryInterface> {
  constructor() {
    super(Category);
  }
}
