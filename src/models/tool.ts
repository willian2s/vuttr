import mongoose, { Document, Model } from 'mongoose';

export interface Tool {
  _id?: string;
  title: string;
  link: string;
  description: string;
  tags: string[];
}

export enum CUSTOM_VALIDATION {
  DUPLICATED = 'DUPLICATED',
}

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: [true, 'Title must be unique'],
    },
    link: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], required: true },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

schema.path('title').validate(
  async (title: string) => {
    const titleCount = await mongoose.models.Tool.countDocuments({ title });
    return !titleCount;
  },
  'already exists in the database.',
  CUSTOM_VALIDATION.DUPLICATED
);

interface ToolModel extends Omit<Tool, '_id'>, Document {}
export const Tool: Model<ToolModel> = mongoose.model('Tool', schema);
