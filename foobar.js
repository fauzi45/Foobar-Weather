var j = [];

function isPrime(n) {
  if (n < 2) return false;
  for (let k = 2; k * k <= n; k++) {
    if (n % k === 0) return false;
  }
  return true;
}

for (let i = 100; i > 0; i--) {
  if (isPrime(i)) continue;
  if (i % 3 === 0 && i % 5 === 0) {
    j.push("FooBar");
  } else if (i % 3 === 0) {
    j.push("Foo");
  } else if (i % 5 === 0) {
    j.push("Bar");
  } else if(i % 2 === 0) {
    j.push(i);
  }
}

console.log(j.join(", "));
