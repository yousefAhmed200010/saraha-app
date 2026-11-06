export async function findOneDoc({ model, filter = {}, projection } = {}) {
  return await model.findOne(filter, projection);
}

export async function FindByIDDoc({ model, id, projection } = {}) {
  return await model.FindByIDDoc( id, projection);
}


export async function createDoc({ model, insertedData, options } = {}) {
  return await model.create(insertedData, options);
}
