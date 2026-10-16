export const INTERVIEW_QUESTIONS = [
  {
    id: "q_01",
    category: "JavaScript",
    role: "Frontend",
    question: "Explain the JavaScript Event Loop, Call Stack, Microtask Queue, and Macrotask Queue.",
    difficulty: "High Yield",
    tip: "Every Tier-1 and startup frontend interview asks this. Don't just give a definition—walk through a concrete code snippet with setTimeout and Promise.",
    answer: "JavaScript is single-threaded with one call stack. Synchronous code executes immediately. When async operations complete, their callbacks enter queues:\n\n1. **Microtask Queue** (Promise callbacks, queueMicrotask, MutationObserver): Has VIP priority! The event loop drains ALL microtasks after each script execution before touching macrotasks.\n2. **Macrotask Queue** (setTimeout, setInterval, setImmediate, I/O): Executes one task at a time after microtasks are cleared, followed by potential UI render passes.\n\nExample:\n`console.log(1);`\n`setTimeout(() => console.log(2), 0);`\n`Promise.resolve().then(() => console.log(3));`\n`console.log(4);`\nOutput: `1, 4, 3, 2` (Microtask 3 runs before macrotask 2)."
  },
  {
    id: "q_02",
    category: "React",
    role: "Frontend",
    question: "What causes unnecessary re-renders in React and how do you optimize them?",
    difficulty: "High Yield",
    tip: "Mention that premature optimization is bad, but explain `React.memo`, `useMemo`, and `useCallback` with their exact use cases.",
    answer: "A React component re-renders when: 1) Its state changes, 2) Its parent component re-renders, or 3) Context values change.\n\nTo prevent wasted renders:\n- **Lift state down**: Keep state close to where it's used so parent re-renders don't propagate.\n- **`React.memo`**: Wraps a child component to skip re-renders if its props haven't changed (shallow comparison).\n- **`useCallback`**: Memoizes function instances so new function references aren't created on every render, which would break `React.memo`.\n- **`useMemo`**: Caches the result of an expensive calculation across renders."
  },
  {
    id: "q_03",
    category: "JavaScript",
    role: "Frontend",
    question: "What is a Closure in JavaScript and give a practical real-world example?",
    difficulty: "Fundamental",
    tip: "A closure is formed when an inner function remembers variables from its lexical outer scope even after the outer function has returned.",
    answer: "A closure gives an inner function access to an outer function's scope from inside it.\n\nPractical use cases:\n1. **Data Privacy / Encapsulation**: Creating private variables that cannot be accessed directly from the outside.\n2. **Currying & Partial Application**: Pre-configuring functions (e.g. `const multiplyByTwo = multiply(2)`).\n3. **Debounce & Throttle functions**: Storing the timer ID in outer scope while returning the debounced event handler."
  },
  {
    id: "q_04",
    category: "SQL",
    role: "Data",
    question: "Explain the difference between WHERE and HAVING, and demonstrate execution order.",
    difficulty: "High Yield",
    tip: "Always remember: WHERE filters raw rows before aggregation; HAVING filters aggregated groups after GROUP BY.",
    answer: "SQL Logical Query Processing Order:\n1. FROM / JOIN\n2. WHERE (filters individual rows before grouping)\n3. GROUP BY (collapses rows into groups)\n4. HAVING (filters summarized group records)\n5. SELECT (evaluates expressions)\n6. DISTINCT\n7. ORDER BY\n8. LIMIT / OFFSET\n\nExample:\n`SELECT department, AVG(salary) FROM employees WHERE status = 'Active' GROUP BY department HAVING AVG(salary) > 75000;`"
  },
  {
    id: "q_05",
    category: "Python",
    role: "Data",
    question: "What is the difference between loc and iloc in Pandas?",
    difficulty: "Fundamental",
    tip: "Remember: loc is label-based (names, strings, inclusive ends), iloc is integer position-based (0, 1, 2, exclusive ends).",
    answer: "- `df.loc[]`: Label/Index-based. You pass index names and column names (e.g. `df.loc[0:5, ['name', 'salary']]`). Note: In `loc`, string and label ranges are inclusive of the end boundary!\n- `df.iloc[]`: Integer index-based. You pass 0-indexed integer coordinates (e.g. `df.iloc[0:5, 0:2]`). End boundary is exclusive like Python array slicing."
  },
  {
    id: "q_06",
    category: "SQL",
    role: "Data",
    question: "What are Window Functions in SQL and how do ROW_NUMBER(), RANK(), and DENSE_RANK() differ?",
    difficulty: "High Yield",
    tip: "Use the classic example of students scoring equal marks (e.g. scores 100, 100, 90).",
    answer: "Window functions perform calculations across a set of table rows related to the current row without collapsing rows into a single output row (unlike GROUP BY).\n\nIf two rows tie for 1st place:\n- `ROW_NUMBER()`: Assigns unique sequential integers (1, 2, 3).\n- `RANK()`: Ties get same rank, but skips subsequent numbers (1, 1, 3).\n- `DENSE_RANK()`: Ties get same rank without skipping (1, 1, 2)."
  },
  {
    id: "q_07",
    category: "Web & HTTP",
    role: "Fullstack",
    question: "What happens when you type https://google.com into the browser and press Enter?",
    difficulty: "Core Systems",
    tip: "Structure your answer in 4 clean phases: DNS resolution, TCP/TLS handshake, HTTP request/response, and Browser Rendering.",
    answer: "1. **URL Parsing & DNS**: Browser checks cache (browser, OS, router). If not found, queries recursive DNS servers to resolve hostname to IP address.\n2. **TCP & TLS Handshake**: Establishes connection via TCP 3-way handshake (SYN, SYN-ACK, ACK) and negotiates TLS certificates/ciphers for HTTPS.\n3. **HTTP Request & Response**: Browser sends `GET / HTTP/2` request with headers. Server processes and returns HTML with HTTP 200 and Cache-Control headers.\n4. **Critical Rendering Path**: Browser parses HTML into DOM, CSS into CSSOM, combines them into Render Tree, computes Layout (geometry), and Paints pixels on screen."
  },
  {
    id: "q_08",
    category: "Behavioral",
    role: "General",
    question: "Tell me about a difficult bug you faced in your project and how you resolved it.",
    difficulty: "Behavioral / STAR",
    tip: "Use the STAR framework: Situation, Task, Action, Result. Highlight methodical debugging over trial-and-error.",
    answer: "**STAR Structure Example**:\n- **Situation**: In my FinTrack app, users reported that expense charts were re-rendering with blank screens intermittently when switching date filters.\n- **Task**: I needed to identify whether the bug was caused by invalid date parsing, asynchronous state updates, or the Chart.js canvas lifecycle.\n- **Action**: I used React DevTools Profiler and Chrome Network tab. I discovered that Chart.js was trying to update a destroyed canvas element due to missing cleanup in a `useEffect` hook during fast tab switching.\n- **Result**: I implemented an AbortController and proper canvas cleanup return function in `useEffect`, eliminating 100% of crashes and reducing re-render time by 40%."
  }
];
