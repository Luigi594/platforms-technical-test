import { getMongoConnection } from "@src/connection/MongodbConnection";
import { IPlatforms } from "@src/connection/models/Platforms.model";
import { PlatformsClass } from "@src/repositories/Platforms.class";

export class Platforms {
  private classData!: PlatformsClass;

  constructor() {
    getMongoConnection()
      .then((connection) => {
        this.classData = new PlatformsClass(connection);
      })
      .catch((error) => console.log(error));
  }

  getAllPlatforms() {
    return this.classData.getAllPlatorms();
  }

  getPlatformById(id: string) {
    return this.classData.getPlatformById(id);
  }

  getPlatformsFilteredBy(filter: "Construction" | "Active" | "Deprecated") {
    return this.classData.getPlatformsFilteredBy(filter);
  }

  addNewPlatform(platform: IPlatforms) {
    return this.classData.insertPlatform(platform);
  }

  updatePlatform(id: string, platform: IPlatforms) {
    return this.classData.updatePlatform({ ...platform, platformID: id });
  }

  deletePlatform(id: string) {
    return this.classData.deletePlatform({ platformID: id });
  }
}
