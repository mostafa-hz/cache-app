import {Types} from "mongoose";
import {getModelForClass, modelOptions, prop} from "@typegoose/typegoose";

@modelOptions({schemaOptions: {timestamps: true}})
export class CacheModel {
    _id!: Types.ObjectId;

    @prop({required: true, unique: true})
    key!: string;

    @prop({required: true})
    value!: string;

    @prop({required: true, type: Date, expires: 1})
    expireAt!: Date;

    createdAt!: Date;

    updatedAt!: Date;
}

export const cacheModel = getModelForClass(CacheModel);
