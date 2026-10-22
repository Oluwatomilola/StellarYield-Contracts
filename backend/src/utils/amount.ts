export const I128_MIN = -(2n ** 127n);
export const I128_MAX = 2n ** 127n - 1n;

export class AmountOverflowError extends Error {
  constructor(message = "Amount overflowed the i128 range") {
    super(message);
    this.name = "AmountOverflowError";
  }
}

function assertI128Range(value: bigint, label: string): bigint {
  if (value < I128_MIN || value > I128_MAX) {
    throw new AmountOverflowError(`${label} exceeds the i128 range`);
  }
  return value;
}

function assertSignedI128(value: bigint, label: string): bigint {
  if (value < I128_MIN || value > I128_MAX) {
    throw new AmountOverflowError(`${label} exceeds the i128 range`);
  }
  return value;
}

export function safeAdd(a: bigint, b: bigint): bigint {
  return assertI128Range(a + b, "safeAdd");
}

export function safeSub(a: bigint, b: bigint): bigint {
  return assertI128Range(a - b, "safeSub");
}

export function safeMul(a: bigint, b: bigint): bigint {
  return assertI128Range(a * b, "safeMul");
}

export function mulDiv(a: bigint, b: bigint, c: bigint): bigint {
  if (c === 0n) {
    throw new RangeError("Division by zero in mulDiv");
  }

  const aChecked = assertSignedI128(a, "mulDiv.a");
  const bChecked = assertSignedI128(b, "mulDiv.b");
  const cChecked = assertSignedI128(c, "mulDiv.c");

  const quotient = (aChecked * bChecked) / cChecked;
  return assertI128Range(quotient, "mulDiv");
}
