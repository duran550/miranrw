import mongoose, { Document } from 'mongoose';
const Schema = mongoose.Schema;
const UpdateReportSchema = new Schema({
  description: { type: String, required: false },
  status: { type: String, required: false, default: 'pending' },
  category: { type: Array<object>, required: false },
  reportID: { type: Schema.Types.ObjectId, ref: 'Report'}
},
{
  timestamps: true,
}
);
// UpdateReportSchema.set('timestamps', true);
// const UpdateReport =  model('updatereport', UpdateReportSchema);
export default mongoose.model('UpdateReport', UpdateReportSchema); 