import { GoalInterface, InputGoalInterface } from "../interfaces";
import { Goal } from "../models";
import { BaseRepository } from "./baseRepository";

export class GoalRepository extends BaseRepository<
InputGoalInterface,
GoalInterface> {
  constructor() {
    super(Goal);
  }
}
