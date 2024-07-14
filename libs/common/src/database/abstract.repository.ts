import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;
  constructor(readonly model: Model<TDocument>) {}
  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }
  async findOne(
    filterQuery: FilterQuery<TDocument>,
    throwError: boolean = true,
  ) {
    console.log({ filterQuery, throwError });
    const document = await this.model
      .findOne(filterQuery)
      .lean<TDocument>(true);
    if (!document && throwError) {
      this.logger.warn('No document found with filterQuery', filterQuery);
      throw new NotFoundException('Document was not found');
    }
    return document;
  }

  async findById(filterQuery: FilterQuery<TDocument>) {
    if (!Types.ObjectId.isValid(filterQuery._id)) {
      this.logger.warn('No document found with filterQuery', filterQuery);
      throw new NotFoundException('Document was not found');
    }
    const document = await this.model
      .findById(filterQuery)
      .lean<TDocument>(true);
    if (!document) {
      this.logger.warn('No document found with filterQuery', filterQuery);
      throw new NotFoundException('Document was not found');
    }
    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    if (!Types.ObjectId.isValid(filterQuery._id)) {
      this.logger.warn('No document found with filterQuery', filterQuery);
      throw new NotFoundException('Document was not found');
    }
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, {
        new: true,
      })
      .lean<TDocument>(true);
    if (!document) {
      this.logger.warn('No document found with filterQuery', filterQuery);
      throw new NotFoundException('Document was not found');
    }
    return document;
  }
  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery).lean<TDocument>(true);
  }
  async findOneAndDelete(filterQuery: FilterQuery<TDocument>) {
    return this.model.findOneAndDelete(filterQuery).lean<TDocument>(true);
  }
  async updateMany() {
    return this.model.updateMany({}, { $unset: { email: '' } });
  }

  async resetCollection() {
    await this.model.collection.drop();
    try {
      // await this.model.createIndex({ /* Define your indexes here if needed */ });
    } catch (error) {
      console.error('Error resetting collection:', error);
      throw error;
    }
  }
}
