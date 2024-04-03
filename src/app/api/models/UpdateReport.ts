import { Schema, model, models } from "mongoose";

const UpdateReportSchema = new Schema({
  description: { type: String, required: false },
  status: { type: String, required: false, default: 'pending' },
  category: { type: Array<object>, required: false },
},
{
  timestamps: true,
});
// UpdateReportSchema.set('timestamps', true);
const UpdateReport = models.UpdateReport || model('UpdateReport', UpdateReportSchema);
export default UpdateReport ;