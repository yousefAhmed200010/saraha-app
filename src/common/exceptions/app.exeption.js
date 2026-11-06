export function BadRequestException(errMsg = "Bad Request", cause = {  }) {
  throw new Error(errMsg, { cause:{statusCode,...cause} });
}

export function ConflictException(errMsg = "conflict", cause = { statusCode: 409 }) {
  throw new Error(errMsg, { cause });
}

export function NotFoundException(errMsg = "NotFound", cause = { statusCode: 404 }) {
  throw new Error(errMsg, { cause });
}
export function UnAuthorizeException (errMsg = "UnAuthorization", cause = { statusCode: 401 }) {
  throw new Error(errMsg, { cause });
}

export function forbiddenException (errMsg = "forbidden", cause = { statusCode: 403 }) {
  throw new Error(errMsg, { cause });
}