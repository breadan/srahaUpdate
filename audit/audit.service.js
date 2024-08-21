import EventEmitter from 'events';
// import { Audit } from '../models/audit.model.js';
import { auditModel } from '../models/audit.model.js';

let emitter = new EventEmitter();

const auditEvent = 'audit';
emitter.on(auditEvent, async function (auditModel) {
  //complete????
  auditModel;
  // console.log('audition', auditModel);
});

// const prepareAudit = function (
//   auditAction,
//   data,
//   status,
//   error,
//   auditBy
//   // auditOn
// ) {
//   var status = 200;
//   // if (err) {
//   //   return (status = 500);
//   // }

let objAudit = new auditModel({ auditAction, data, status, error, auditBy }); //auditOn
emitter.emit(auditEvent, objAudit);
// };
// const dateFormate = () => {
//   return new Date(Date.now()).toLocaleString();
// };

export { prepareAudit }; //dateFormate
