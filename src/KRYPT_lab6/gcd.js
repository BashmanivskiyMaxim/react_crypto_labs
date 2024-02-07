/* global BigInt */
export default function Euclid_gcd(a, b) {
  //a = BigInt(+a);
  //b = BigInt(+b);

  if (a === Infinity || a === -Infinity || b === Infinity || b === -Infinity) {
    return [Infinity, Infinity, Infinity];
  }
  // Checks if a or b are decimals
  if (a % 1n !== 0n || b % 1n !== 0n) {
    return false;
  }
  var signX = a < 0n ? -1n : 1n,
    signY = b < 0n ? -1n : 1n,
    x = 0n,
    y = 1n,
    u = 1n,
    v = 0n,
    q = 0n,
    r = 0n,
    m = 0n,
    n = 0n;
  const abs = (n) => (n < 0n ? -n : n);
  a = abs(a);
  b = abs(b);


  while (a !== 0n) {
    q = b / a;
    r = b % a;
    m = x - u * q;
    n = y - v * q;
    b = a;
    a = r;
    x = u;
    y = v;
    u = m;
    v = n;
  }
  return [b, signX * x, signY * y];
}
