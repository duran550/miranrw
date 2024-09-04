import mongoose, { Schema, model } from 'mongoose';

export interface ReportAndCategoryType {
  level: string;

  text: string;
  category: any;
    report: any;
    status?:boolean
}

const categoryandcategorySchema = new Schema<ReportAndCategoryType>({
  text: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  report: { type: Schema.Types.ObjectId, ref: 'Report' },
  level: { type: String, required: true },
  status: {
    type: Boolean,
    required: false,
    default: true,
  },
});
categoryandcategorySchema.set('timestamps', true);
export const CategoryAndReport =
  mongoose.models.CategoryAndReport ||
  mongoose.model<ReportAndCategoryType>(
    'CategoryAndReport',
    categoryandcategorySchema
  );
