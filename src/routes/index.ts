import { Router } from "express";
import PlatformRoutes from "./Platforms";

const router = Router();

router.use("/platforms", PlatformRoutes);

export default router;
