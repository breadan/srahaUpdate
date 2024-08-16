import EventEmitter from 'events';
import { Audit } from '../models/audit.model.js';
// import AuditModel from '../models/audit.model.js';

let emitter = new EventEmitter();

const auditEvent = 'audit';
emitter.on(auditEvent, async function (Audit) {
  //complete????
  Audit;
  console.log('a7a', Audit);
});

const prepareAudit = function (
  auditAction,
  data,
  status,
  error,
  auditBy
  // auditOn
) {
  var status = 200;
  // if (err) {
  //   return (status = 500);
  // }

  let objAudit = new Audit(auditAction, data, status, error, auditBy); //auditOn
  emitter.emit(auditEvent, objAudit);
};
const dateFormate = () => {
  return new Date(Date.now()).toLocaleString();
};

export { prepareAudit, dateFormate };
