export function BadRequestException(errMsg = "Bad Request", cause = { statusCode: 400 }) {
  throw new Error(errMsg, { cause });
}

export function ConflictException(errMsg = "conflict", cause = { statusCode: 409 }) {
  throw new Error(errMsg, { cause });
}

export function NotFoundException(errMsg = "NotFound", cause = { statusCode: 404 }) {
  throw new Error(errMsg, { cause });
}