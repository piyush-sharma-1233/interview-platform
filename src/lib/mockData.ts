import type { Question, SkillScore } from '@/types/interview';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Tell me about yourself and your background in software development.",
    type: 'behavioral',
    difficulty: 'Easy',
    timeLimit: 120,
    hints: ["Start with your current role", "Mention key technologies", "Keep it under 2 minutes"],
  },
  {
    id: 2,
    text: "Describe a challenging technical problem you solved recently. What was your approach and what did you learn?",
    type: 'behavioral',
    difficulty: 'Medium',
    timeLimit: 120,
    hints: ["Use the STAR method", "Focus on your specific contribution", "Quantify the impact if possible"],
  },
  {
    id: 3,
    text: "Explain the concept of closures in JavaScript and provide a practical use case where closures are beneficial.",
    type: 'technical',
    difficulty: 'Medium',
    timeLimit: 120,
    hints: ["Mention lexical scope", "Give a counter or memoization example"],
  },
  {
    id: 4,
    text: "How would you optimize a React application that is experiencing performance issues? Walk me through your debugging process.",
    type: 'technical',
    difficulty: 'Hard',
    timeLimit: 120,
    hints: ["Mention React DevTools Profiler", "Talk about useMemo / useCallback", "Discuss code splitting and lazy loading"],
  },
  {
    id: 5,
    text: "Describe a time when you had to work with a difficult teammate. How did you handle the situation?",
    type: 'behavioral',
    difficulty: 'Medium',
    timeLimit: 120,
    hints: ["Focus on communication", "Show empathy", "Highlight the resolution"],
  },
  {
    id: 6,
    text: "What is the difference between REST and GraphQL? When would you choose one over the other?",
    type: 'technical',
    difficulty: 'Medium',
    timeLimit: 120,
    hints: ["Compare over-fetching/under-fetching", "Mention real-time subscriptions in GraphQL"],
  },
  {
    id: 7,
    text: "Explain how the event loop works in JavaScript, and describe how async/await interacts with it.",
    type: 'technical',
    difficulty: 'Hard',
    timeLimit: 120,
    hints: ["Call stack, Web APIs, callback queue, microtask queue", "Promises resolve in microtask queue"],
  },
  {
    id: 8,
    text: "Where do you see yourself in 5 years, and how does this role align with your career goals?",
    type: 'behavioral',
    difficulty: 'Easy',
    timeLimit: 120,
  },
  {
    id: 9,
    text: "Implement a function that finds the two numbers in an array that sum to a target value. Return their indices.",
    type: 'coding',
    difficulty: 'Easy',
    timeLimit: 300,
    problemTitle: "Two Sum",
    problemDescription: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    sampleInput: `nums = [2, 7, 11, 15], target = 9`,
    expectedOutput: `[0, 1]  // nums[0] + nums[1] == 9`,
    hints: ["Consider using a hash map for O(n) time complexity", "Store each number's index as you iterate"],
    codeTemplate: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Your solution here

}

// Test
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]`,
      python: `def two_sum(nums: list[int], target: int) -> list[int]:
    # Your solution here
    pass

# Test
print(two_sum([2, 7, 11, 15], 9))  # [0, 1]`,
      java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your solution here
        return new int[]{};
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(Arrays.toString(sol.twoSum(new int[]{2,7,11,15}, 9)));
    }
}`,
      cpp: `#include <vector>
#include <unordered_map>
#include <iostream>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Your solution here
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    auto result = twoSum(nums, 9);
    cout << "[" << result[0] << ", " << result[1] << "]" << endl;
}`,
    },
  },
  {
    id: 10,
    text: "Implement a function that checks if a string is a valid palindrome, considering only alphanumeric characters and ignoring cases.",
    type: 'coding',
    difficulty: 'Easy',
    timeLimit: 300,
    problemTitle: "Valid Palindrome",
    problemDescription: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.

Alphanumeric characters include letters and numbers.

Given a string \`s\`, return \`true\` if it is a palindrome, or \`false\` otherwise.`,
    sampleInput: `s = "A man, a plan, a canal: Panama"`,
    expectedOutput: `true`,
    hints: ["Use two pointers from both ends", "Skip non-alphanumeric characters"],
    codeTemplate: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
  // Your solution here

}

// Tests
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car"));                     // false`,
      python: `def is_palindrome(s: str) -> bool:
    # Your solution here
    pass

# Tests
print(is_palindrome("A man, a plan, a canal: Panama"))  # True
print(is_palindrome("race a car"))                       # False`,
      java: `class Solution {
    public boolean isPalindrome(String s) {
        // Your solution here
        return false;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.isPalindrome("A man, a plan, a canal: Panama")); // true
    }
}`,
      cpp: `#include <string>
#include <iostream>
using namespace std;

bool isPalindrome(string s) {
    // Your solution here
    return false;
}

int main() {
    cout << isPalindrome("A man, a plan, a canal: Panama") << endl; // 1
}`,
    },
  },
];

export const MOCK_SKILL_SCORES: SkillScore[] = [
  { label: 'Communication', score: 82, color: 'bg-blue-500' },
  { label: 'Technical Depth', score: 74, color: 'bg-purple-500' },
  { label: 'Problem Solving', score: 88, color: 'bg-emerald-500' },
  { label: 'Confidence', score: 71, color: 'bg-amber-500' },
];

export const MOCK_STRENGTHS = [
  'Excellent communication skills and clear articulation of complex concepts',
  'Strong understanding of JavaScript fundamentals and async patterns',
  'Demonstrated systematic problem-solving approach with working code',
];

export const MOCK_IMPROVEMENTS = [
  'Could provide more concrete metrics when describing past achievements',
  'Consider discussing trade-offs more explicitly in system design questions',
];

export const MOCK_OUTPUTS: Record<string, string> = {
  javascript: `> Running test cases...

Test 1: twoSum([2, 7, 11, 15], 9)
  Expected: [0, 1]
  Received: [0, 1]
  ✓ PASSED

Test 2: twoSum([3, 2, 4], 6)
  Expected: [1, 2]
  Received: [1, 2]
  ✓ PASSED

Test 3: twoSum([3, 3], 6)
  Expected: [0, 1]
  Received: [0, 1]
  ✓ PASSED

All 3 test cases passed. Time: 2ms | Memory: 44.2 MB`,
  python: `Running test cases...

Test 1: two_sum([2, 7, 11, 15], 9)
  Expected: [0, 1]
  Got:      [0, 1]
  ✓ PASSED

Test 2: two_sum([3, 2, 4], 6)
  Expected: [1, 2]
  Got:      [1, 2]
  ✓ PASSED

All 3 test cases passed. Runtime: 56ms | Memory: 17.3 MB`,
  java: `Compiling Solution.java...
Compilation successful.

Running test cases...
Test 1: [2, 7, 11, 15], target=9 → [0, 1] ✓
Test 2: [3, 2, 4], target=6 → [1, 2] ✓

2/2 test cases passed. Time: 4ms | Memory: 42.5 MB`,
  cpp: `Compiling...
Build successful (0 warnings, 0 errors)

Running test cases...
[0, 1]  ✓ Test 1 passed
[1, 2]  ✓ Test 2 passed

All tests passed. Time: 0ms | Memory: 8.7 MB`,
};

export const MOCK_TRANSCRIPT = [
  { speaker: 'ai' as const, text: "Welcome! I'm your AI interviewer today. Let's begin with an introduction." },
  { speaker: 'candidate' as const, text: "Hi! I'm excited to be here. I have 4 years of experience in frontend development..." },
  { speaker: 'ai' as const, text: "Great background! Now, let's talk about a technical challenge you've faced." },
];
