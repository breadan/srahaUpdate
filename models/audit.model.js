class Audit {
  constructor(auditAction, data, status, error, auditBy) {
    this.auditAction = auditAction;
    this.data = data;
    this.status = status;
    this.error = error;
    this.auditBy = auditBy;
  }
}

// import { Schema, model } from 'mongoose';

// const auditSchema = new Schema(
//   {
//     auditAction: {
//       type: String,
//     },
//     data: {
//       type: String,
//     },
//     status: {
//       type: Number,
//     },
//     auditBy: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// );

// const auditModel = model('Audit', auditSchema);
// export default auditModel;

export { Audit };
