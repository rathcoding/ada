import { Router } from "express";
import { LoginController } from "./controllers/LoginController";
import { CompanyLoginController } from "./controllers/CompanyLoginController";
import { ProfessionalController } from "./controllers/ProfessionalController";
import { CompanyController } from "./controllers/CompanyController";
import { SkillController } from "./controllers/SkillController";
import { LevelController } from "./controllers/LevelController";
import { StageController } from "./controllers/StageController";
import { TokenController } from "./controllers/TokenController";
import { verifyToken } from "./Middleware/Auth";
import { SelectsController } from "./controllers/SelectsController";

const routes = Router();

routes.post("/login", new LoginController().handleLogin)
routes.post("/token", new TokenController().handleRefresh)


routes.get("/selects-resume", verifyToken, new SelectsController().handleGetSelectsResume);


// professional infos
routes.post("/professional/register", new ProfessionalController().handleCreate);
routes.get("/profile", verifyToken, new ProfessionalController().handleGetProfile);
routes.put("/profile", verifyToken, new ProfessionalController().handleUpdateProfile);
routes.get("/resume", verifyToken, new ProfessionalController().handleGetResume);
routes.post("/skill", verifyToken, new ProfessionalController().handleCreateSkill);
routes.put("/skill/:id", verifyToken, new ProfessionalController().handleUpdateSkill);
routes.delete("/skill/:id", verifyToken, new ProfessionalController().handleDeleteSkill);

// professional jobs
routes.post("/professional/jobs", verifyToken, new ProfessionalController().handleGetJobs);
routes.post("/professional/jobs/application", verifyToken, new ProfessionalController().handleCreateApplication);
routes.get("/professional/jobs", verifyToken, new ProfessionalController().handleGetJobsMatch);
routes.get("/professional/application", verifyToken, new ProfessionalController().handleGetApplication);
routes.delete("/professional/application/:id", verifyToken, new ProfessionalController().handleDeleteApplication);


//company info
routes.post("/company/register", new CompanyController().handleCreate);
routes.post("/company/login", new CompanyLoginController().handleLogin);
routes.get("/company", verifyToken, new CompanyController().handleGetOne);
routes.put("/company/profile", verifyToken, new CompanyController().handleUpdate);


//company job
routes.get("/company/job", verifyToken, new CompanyController().handleGetJobs);
routes.delete("/company/job/:id", verifyToken, new CompanyController().handleDeleteJob);
routes.get("/company/job/:id", verifyToken, new CompanyController().handleGetJob);
routes.post("/company/job", verifyToken, new CompanyController().handleCreateJob);
routes.put("/company/job", verifyToken, new CompanyController().handleUpdateJob);
routes.get("/company/job/skill/:id", verifyToken, new CompanyController().handleGetJobSkills);
routes.post("/company/job/skill", verifyToken, new CompanyController().handleCreateSkill);
routes.put("/company/job/skill/:id", verifyToken, new CompanyController().handleUpdateSkill);
routes.delete("/company/job/skill/:id", verifyToken, new CompanyController().handleDeleteSkill);

routes.get("/company/job/applications/:id", verifyToken, new CompanyController().handleGetJobApplications);
routes.get("/company/job/application/:id", verifyToken, new CompanyController().handleGetJobApplication);
routes.put("/company/job/application", verifyToken, new CompanyController().handleUpdateJobApplication);

routes.get("/company/professional/:id", verifyToken, new CompanyController().handleGetProfessional);
routes.post("/company/professional", verifyToken, new CompanyController().handleGetProfessionals);

// Estas entidades serão pré-cadastradas via SEEDER.
routes.get("/level", verifyToken, new LevelController().handleGetAll);
routes.get("/stage", verifyToken, new StageController().handleGetAll);
routes.get("/skill", verifyToken, new SkillController().handleGetAll);
//routes.post("/skill", verifyToken, new SkillController().handleCreate)
//routes.delete("/skill/:id", verifyToken, new SkillController().handleDelete)
//routes.put("/skill/:id", verifyToken, new SkillController().handlePut)

export { routes }