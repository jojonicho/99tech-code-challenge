// 1. normal O(n)
function sum_to_n_a(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}
console.log(sum_to_n_a(5));

// 2. efficient using maths O(1)

function sum_to_n_b(n: number): number {
  return (n * (n + 1)) / 2;
}
console.log(sum_to_n_b(5));

// 3. generator
function* range(n: number) {
  for (let i = 1; i <= n; i++) {
    yield i;
  }
}

function sum_to_n_c(n: number): number {
  return [...range(n)].reduce((acc, x) => acc + x, 0);
}

console.log(sum_to_n_c(5));
