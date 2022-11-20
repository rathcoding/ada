import { Request, Response } from "express";
import { GetSkillService } from "../services/Skill/GetSkillService";
import { GetLevelService } from "../services/Level/GetLevelService";
import { GetStageService } from "../services/Stage/GetStageService";

export class SelectsController {
  async handleGetSelectsResume(request: Request, response: Response) {

    const serviceSkill = new GetSkillService();
    const serviceLevel = new GetLevelService();
    const serviceStage = new GetStageService();

    const skills = await serviceSkill.execute();
    const levels = await serviceLevel.execute();
    const stages = await serviceStage.execute();

    const newSkills = skills.map(skill=> ({value: skill.id,
    label: skill.description}));

    const newLevels = levels.map(level=> ({value: level.id,
      label: level.description}));

    const newStages = stages.map(stage=> ({value: stage.id,
        label: stage.description}));
    
    return response.status(200).json({skill: newSkills, level: newLevels, stage: newStages});
  }


}