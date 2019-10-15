const compute = (mask) => {
  const n = mask.length;
  const m = mask[0].length;
  const k = Math.min(n, m);
  let firstOneX = -1;
  let firstOneY = -1;
  for (let i = 0; i < n && firstOneX === -1; ++i) {
    for (let j = 0; j < m; ++j) {
      if (mask[i][j] === 1) {
        firstOneX = i;
        firstOneY = j;
        break;
      }
    }
  }

  if (firstOneX === -1) {
    const ans = Array.from(Array(k + 1), () => 0);
    ans[0] = 1;
    return ans;
  }

  const copyMask = [];
  for (let i = 0; i < n; ++i) {
    const arr = [];
    for (let j = 0; j < m; ++j) {
      arr.push(mask[i][j]);
    }
    copyMask.push(arr);
  }

  copyMask[firstOneX][firstOneY] = 0;
  const dp1 = compute(copyMask);

  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < m; ++j) {
      copyMask[i][j] = mask[i][j];
    }
  }
  for (let i = 0; i < n; ++i) {
    copyMask[i][firstOneY] = 0;
  }
  for (let j = 0; j < m; ++j) {
    copyMask[firstOneX][j] = 0;
  }
  const dp2 = compute(copyMask);

  const ans = Array.from(Array(k + 1), () => 0);
  for (let i = 0; i <= k; ++i) {
    ans[i] = dp1[i];
    if (i > 0) {
      ans[i] += dp2[i - 1];
    }
  }
  return ans;
};

module.exports = compute;
