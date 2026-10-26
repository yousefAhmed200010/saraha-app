export async function findOneDoc({ model, filter = {}, projection } = {}) {
  return await model.findOne(filter, projection);
}

export async function createDoc({ model, insertedData, options } = {}) {
  return await model.create(insertedData, options);
}
