// crypto.randomUUID needs a secure context: http://localhost and https both qualify
export const newIdempotencyKey = () => crypto.randomUUID();