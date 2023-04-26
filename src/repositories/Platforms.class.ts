import { IPlatforms } from "src/connection/models/Platforms.model";
import { AbstractClass } from "./Abstract.class";
import { Db, Filter } from "mongodb";

export class PlatformsClass extends AbstractClass<IPlatforms> {
  public constructor(db: Db) {
    super(process.env.MONGO_COLLECTION_NAME || "", db);
  }

  async getAllPlatorms() {
    return await super.findAll();
  }

  async getPlatformById(id: string) {
    try {
      let filter: Filter<IPlatforms>;

      filter = { platformID: id };

      const result = await super.findOne(filter);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getPlatformsFilteredBy(
    filter: "Construction" | "Active" | "Deprecated"
  ) {
    try {
      const result = await super.findByFilter({ platformState: filter });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async insertPlatform(data: IPlatforms) {
    try {
      const { _id, ...newData } = data;

      if (
        !["Embedded", "NewWindow", "SameWindow"].includes(data.presentation)
      ) {
        throw new Error(
          "Presentation must be one of 'Embedded', 'NewWindow', or 'SameWindow'."
        );
      }

      if (
        !["Construction", "Active", "Deprecated"].includes(data.platformState)
      ) {
        throw new Error(
          "Presentation must be one of 'Construction', 'Active', or 'Deprecated'."
        );
      }

      const result = await super.insertOne(newData);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updatePlatform(data: Partial<IPlatforms>) {
    try {
      const { _id, ...updateData } = data;
      const result = await super.update(_id as string, updateData);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deletePlatform(data: Partial<IPlatforms>) {
    try {
      const { platformID } = data;
      const collection = super.getCollection();
      const result = collection.deleteOne({ platformID });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
