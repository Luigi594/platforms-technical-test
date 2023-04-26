import {
  Db,
  Collection,
  WithId,
  Filter,
  Document,
  InsertOneResult,
  OptionalUnlessRequiredId,
  FindOptions,
  UpdateResult,
  ObjectId,
  UpdateFilter,
} from "mongodb";

export abstract class AbstractClass<T extends Document> {
  public nameCollection: string;
  private connection: Db;
  private collection: Collection<T>;

  constructor(nameCollection: string, connection: Db) {
    this.nameCollection = nameCollection;

    if (connection) {
      this.connection = connection;
      this.collection = this.connection.collection<T>(nameCollection);
    } else {
      throw new Error("No Db connection was found");
    }
  }

  public async findAll(): Promise<WithId<T>[]> {
    return await this.collection.find({}).toArray();
  }

  public async findOne(filter: Filter<T>): Promise<WithId<T> | null> {
    try {
      const result = await this.collection.findOne(filter);
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async findByFilter(
    filter: Filter<T>,
    options: FindOptions<T> = {}
  ): Promise<WithId<T>[]> {
    return this.collection.find(filter, options).toArray();
  }

  public async insertOne(
    data: OptionalUnlessRequiredId<T>
  ): Promise<InsertOneResult<T>> {
    return await this.collection.insertOne(data);
  }

  public async update(id: string, data: Partial<T>): Promise<UpdateResult> {
    const _id = new ObjectId(id) as Filter<T>;
    return this.collection.updateOne({ _id }, {
      $set: data,
    } as UpdateFilter<T>);
  }

  public getCollection(): Collection<T> {
    return this.collection;
  }
}
