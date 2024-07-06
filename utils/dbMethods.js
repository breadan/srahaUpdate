//*************************find Document**************** */

import { model } from 'mongoose';

/*
 model
 condition
 */

const findDoc = async (model, query) => {
  if (!model || !query)
    return { msg: 'invalid arguments', status: 400, success: false };
  const isDocExists = await model.findOne(query);
  if (!isDocExists)
    return { msg: 'Doc not found', status: 404, success: false };
  return { doc: isDocExists, isDocExists, success: true };
};

const createDocument = async (model, data) => {
  if (!model || !data)
    return { msg: 'invalid arguments', status: 400, success: false };
  const createdDocument = await model.create(data);
  if (!createdDocument)
    return { msg: 'invalid document', status: 400, success: false };
  return {
    msg: 'created document',
    createdDocument,
    success: true,
    status: 201,
  };
};

export { findDoc, createDocument };
