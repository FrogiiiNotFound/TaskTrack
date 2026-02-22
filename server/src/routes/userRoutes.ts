import { Router } from "express";
import { userController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/uploadMiddleware";
import { EventSchema } from "../ultils/validation/eventValidation";
import { validate } from "../middlewares/validationMiddleware";

const userRouter = Router();

userRouter.use(authMiddleware);

userRouter.get("/user", userController.getUser);
userRouter.get("/user/events", userController.getUserDayEvents);
userRouter.post("/user/events", validate(EventSchema), userController.addEvent);
userRouter.patch("/user/nickname", userController.changeNickname);
userRouter.post("/user/avatar", upload.single("avatar"), userController.changeAvatar);
userRouter.delete("/user/avatar", userController.deleteAvatar);

export default userRouter;
