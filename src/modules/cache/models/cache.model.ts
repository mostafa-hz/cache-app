import {Types} from "mongoose";
import {getModelForClass, index, modelOptions, prop} from "@typegoose/typegoose";
import config from "@config";

@modelOptions({
    schemaOptions: {
        timestamps: true,
        capped: {
            max: config.cacheLimit,
            size: 1024 * 128,
        },
    },
})
@index({key: 1, deleted: 1})
export class CacheModel {
    _id!: Types.ObjectId;

    @prop({required: true, index: true})
    key!: string;

    @prop({required: true})
    value!: string;

    @prop({required: true, type: Date})
    expireAt!: Date;

    @prop({required: true, default: false, index: true})
    deleted!: boolean;

    createdAt!: Date;

    updatedAt!: Date;
}

export const cacheModel = getModelForClass(CacheModel);
