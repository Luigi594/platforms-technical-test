import { Request, Response, Router } from "express";
import { Platforms } from "@src/lib/Platforms";
import { IPlatforms } from "@src/connection/models/Platforms.model";

const router = Router();
const platformClassInstace = new Platforms();

router.get("/", async (_req: Request, res: Response) => {
  try {
    res.status(200).json(await platformClassInstace.getAllPlatforms());
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/platform/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await platformClassInstace.getPlatformById(id);

    if (result) {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/find-filter", async (req: Request, res: Response) => {
  try {
    const { filter } = req.query;
    const result = await platformClassInstace.getPlatformsFilteredBy(
      filter as "Construction" | "Active" | "Deprecated"
    );

    if (result.length === 0) {
      res.status(200).json(await platformClassInstace.getAllPlatforms());
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/new-platform", async (req: Request, res: Response) => {
  try {
    const { ...myObject } = req.body as IPlatforms;
    const result = await platformClassInstace.addNewPlatform(myObject);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.put("/update/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { ...myObject } = req.body as IPlatforms;

    const result = await platformClassInstace.updatePlatform(id, myObject);

    if (result) {
      res.status(200).json({ message: "Record Updated!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Record could not be updated" });
  }
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await platformClassInstace.deletePlatform(id);

    if (result) {
      res.status(200).json({ message: "Record Deleted!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Record could not be deleted" });
  }
});

export default router;
