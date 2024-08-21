import { Schema, model } from 'mongoose';

const auditSchema = new Schema(
  {
    auditAction: {
      type: String,
    },
    data: {
      type: String,
    },
    status: {
      type: Number,
    },
    auditBy: {
      type: String,
    },
  },
  { timestamps: true }
);
export const auditModel = model('Audit', auditSchema);
