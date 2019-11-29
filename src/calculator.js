const compute = (a) => {
  const n = a.length;
  const m = a[0].length;
  const k = Math.min(n, m);

  // Create dp array of size (n x 2^m)
  const dp = Array.from(Array(n), () => Array.from(Array(1 << m), () => 0));

  // Initialize dp array
  // Attempt to put one rook at every 1 position in the first row.
  dp[0][0] = 1;
  for (let j = 0; j < m; ++j) {
    if (a[0][j] == 1) {
      dp[0][1 << j] = 1;
    }
  }

  for (let i = 1; i < n; ++i) {
    for (let mask = 0; mask < 1 << m; ++mask) {
      // Case 1: ignore the entire i-th row
      dp[i][mask] = dp[i - 1][mask];

      // Case 2: choose exactly one element in the i-th row
      for (let j = 0; j < m; ++j) {
        if (((mask >> j) & 1) == 0 || a[i][j] == 0) {
          continue;
        }
        const prev_mask = mask - (1 << j);
        dp[i][mask] = dp[i][mask] + dp[i - 1][prev_mask];
      }
    }
  }

  const ans = Array.from(Array(k + 1), () => 0);
  for (let mask = 0; mask < 1 << m; ++mask) {
    let cnt = 0;
    for (let i = 0; i < m; ++i) {
      cnt += (mask >> i) & 1;
    }
    if (cnt <= k) {
      ans[cnt] += dp[n - 1][mask];
    }
  }

  return ans;
};

module.exports = compute;
