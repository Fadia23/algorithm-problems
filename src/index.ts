// ===========================
// Problem 1: Flood Fill
// ===========================
const floodFill = (
  img: number[][],
  sr: number,
  sc: number,
  newColor: number,
): number[][] => {
  if (img.length === 0) return img;

  const rows: number = img.length;
  const cols: number = img[0]?.length ?? 0;
  if (sr < 0 || sr >= rows || sc < 0 || sc >= cols) return img;

  const originalColor: number = img[sr]![sc] ?? 0;
  if (originalColor === newColor) return img;

  function dfs(r: number, c: number): void {
    if (r < 0) return;
    if (r >= rows) return;
    if (c < 0) return;
    if (c >= cols) return;
    if (img[r]![c] !== originalColor) return;

    img[r]![c] = newColor;
    dfs(r - 1, c);
    dfs(r + 1, c);
    dfs(r, c - 1);
    dfs(r, c + 1);
  }

  dfs(sr, sc);
  return img;
};

// ===========================
// Problem 2: Trapping Rain Water
// ===========================
const trap = (height: number[]): number => {
    const n: number = height.length;
    if (n === 0) return 0;

    let left: number = 0;
    let right: number = n - 1;
    let maxLeft: number = 0;
    let maxRight: number = 0;
    let water: number = 0;

    while (left < right) {
      const leftVal: number = height[left] ?? 0;
      const rightVal: number = height[right] ?? 0;

      if (leftVal <= rightVal) {
        if (leftVal >= maxLeft) {
          maxLeft = leftVal;
        } else {
          water += maxLeft - leftVal;
        }
        left++;
      } else {
        if (rightVal >= maxRight) {
          maxRight = rightVal;
        } else {
          water += maxRight - rightVal;
        }
        right--;
      }
    }
    return water;
}

// ===========================
// Problem 3: Climbing Stairs
// ===========================
const climbStairs = (n: number): number => {
  if (n <= 2) return n;

  let prev2: number = 1;
  let prev1: number = 2;

  for (let i: number = 3; i <= n; i++) {
    const curr: number = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}

// ===========================
// Problem 4: Jump Game
// ===========================
const canJump = (nums: number[]): boolean => {
  let maxReach: number = 0;

  for (let i: number = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    const val: number = nums[i] ?? 0;
    maxReach = Math.max(maxReach, i + val);
    if (maxReach >= nums.length - 1) return true;
  }
  return true;
}

// ===========================
// Problem 5: Rod Cutting
// ===========================
const rodCutting = (price: number[], n: number): number => {
  const dp: number[] = new Array(n + 1).fill(0) as number[];

  for (let len: number = 1; len <= n; len++) {
    let maxVal: number = -Infinity;

    for (let cut: number = 1; cut <= len; cut++) {
      const priceVal: number = price[cut] ?? 0;
      const remainder: number = dp[len - cut] ?? 0;
      const val: number = priceVal + remainder;
      maxVal = Math.max(maxVal, val);
    }
    dp[len] = maxVal;
  }
  return dp[n] ?? 0;
}

// ===========================
// Problem 6: Largest Rectangle in Histogram
// ===========================
const largestRectangleInHistogram = (heights: number[]): number => {
  const stack: number[] = [];
  let maxArea: number = 0;
  const n: number = heights.length;

  for (let i: number = 0; i <= n; i++) {
    const h: number = i < n ? (heights[i] ?? 0) : 0;

    while (stack.length > 0) {
      const topIndex: number = stack[stack.length - 1]!;
      if ((heights[topIndex] ?? 0) <= h) break;
      stack.pop();
      const height: number = heights[topIndex] ?? 0;
      const prevIndex: number = stack[stack.length - 1] ?? -1;
      const width: number = stack.length === 0 ? i : i - prevIndex - 1;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }
  return maxArea;
}

// ===========================
// Problem 7: Maximal Rectangle
// ===========================
const histogramMaxRect = (h: number[]): number => {
  const stack: number[] = [];
  let max: number = 0;
  const n: number = h.length;

  for (let i: number = 0; i <= n; i++) {
    const cur: number = i < n ? (h[i] ?? 0) : 0;

    while (stack.length > 0) {
      const topIndex: number = stack[stack.length - 1]!;
      if ((h[topIndex] ?? 0) <= cur) break;
      stack.pop();
      const ht: number = h[topIndex] ?? 0;
      const prevIndex: number = stack[stack.length - 1] ?? -1;
      const w: number = stack.length > 0 ? i - prevIndex - 1 : i;
      max = Math.max(max, ht * w);
    }
    stack.push(i);
  }
  return max;
}

const maximalRectangle = (mat: number[][]): number => {
  if (!mat.length) return 0;

  const cols: number = mat[0]!.length;
  const heights: number[] = new Array(cols).fill(0) as number[];
  let maxArea: number = 0;

  for (const row of mat) {
    for (let c: number = 0; c < cols; c++) {
      const cell: number = row[c] ?? 0;
      heights[c] = cell === 1 ? (heights[c] ?? 0) + 1 : 0;
    }
    maxArea = Math.max(maxArea, histogramMaxRect(heights));
  }
  return maxArea;
}

// ===========================
// Tests
// ===========================
console.log(
  "P1: floodFill ",
  JSON.stringify(
    floodFill(
      [
        [1, 1, 1, 0],
        [0, 1, 1, 1],
        [1, 0, 1, 1],
      ],
      1,
      2,
      2,
    ),
  ),
);
console.log("P2: trap", trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
console.log("P3:climbStairs", climbStairs(5));
console.log("P4 canJump true:", canJump([2, 3, 1, 1, 4]));
console.log("P4 canJump false:", canJump([3, 2, 1, 0, 4]));
console.log("P5: rodCutting", rodCutting([0, 1, 5, 8, 9], 4));
console.log("P6: largestRectangleInHistogram", largestRectangleInHistogram([6, 2, 5, 4, 5, 1, 6]));
console.log(
  "P7: maximalRectangle",
  maximalRectangle([
    [0, 1, 1, 0],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 0, 0],
  ]),
);
