export const ROADMAPS = {
  frontend: {
    id: "frontend",
    title: "Frontend Web Engineer",
    badge: "Most In-Demand Fresher Track",
    salaryRange: "₹4.5 - ₹9.0 LPA",
    targetDurationWeeks: 8,
    estimatedHours: 120,
    summary: "From absolute zero to building & deploying production React web applications with clean architecture, responsive layouts, and state management.",
    diagnosticQuestions: [
      {
        id: "fe_q1",
        question: "What is the primary difference between `let` and `const` in modern JavaScript?",
        options: [
          "`let` is function-scoped while `const` is block-scoped",
          "`let` can be reassigned, whereas `const` cannot be reassigned",
          "`const` values are immutable and their object properties cannot be modified",
          "`let` is hoisted to the top of its scope but `const` is not"
        ],
        correctIndex: 1,
        explanation: "`const` declarations create read-only references; the variable identifier cannot be reassigned, while `let` can be reassigned."
      },
      {
        id: "fe_q2",
        question: "In CSS Flexbox, which property aligns items along the cross-axis?",
        options: [
          "justify-content",
          "flex-direction",
          "align-items",
          "flex-wrap"
        ],
        correctIndex: 2,
        explanation: "`justify-content` aligns items along the main axis, while `align-items` aligns items along the cross-axis."
      },
      {
        id: "fe_q3",
        question: "What will `console.log(typeof null)` output in standard JavaScript?",
        options: [
          "`'null'`",
          "`'undefined'`",
          "`'object'`",
          "`'boolean'`"
        ],
        correctIndex: 2,
        explanation: "`typeof null === 'object'` is a legacy historical quirk of JavaScript dating back to its first implementation."
      },
      {
        id: "fe_q4",
        question: "When should the dependency array in React's `useEffect` hook be left empty `[]`?",
        options: [
          "When the effect should run on every single component render",
          "When the effect should execute only once after initial mount",
          "When the effect should trigger whenever any state changes",
          "When you want to prevent memory leaks in event listeners"
        ],
        correctIndex: 1,
        explanation: "An empty dependency array `[]` signals to React that the effect doesn't depend on any reactive state/props, running only once on mount."
      },
      {
        id: "fe_q5",
        question: "Which HTTP status code indicates that the request was successful and a new resource was created?",
        options: [
          "200 OK",
          "201 Created",
          "204 No Content",
          "301 Moved Permanently"
        ],
        correctIndex: 1,
        explanation: "HTTP 201 Created indicates the request succeeded and led to the creation of a resource."
      }
    ],
    weeks: [
      {
        week: 1,
        title: "Web Architecture, HTML5 Semantics & Modern CSS",
        objective: "Understand client-server architecture, write accessible semantic HTML, and master Flexbox & CSS Grid.",
        hoursEstimated: 14,
        topics: [
          {
            id: "fe_w1_t1",
            title: "How the Web Works: DNS, HTTP/HTTPS & Browser Rendering",
            type: "video",
            author: "freeCodeCamp / Aaron Jack",
            duration: "45 mins",
            url: "https://www.youtube.com/watch?v=7_LPdttKXPc",
            summary: "Learn what happens under the hood from the moment you type a URL until HTML/CSS/JS is painted on screen.",
            keyPoints: ["DNS lookup & IP routing", "TCP 3-way handshake", "DOM & CSSOM construction", "Render tree and critical rendering path"]
          },
          {
            id: "fe_w1_t2",
            title: "HTML5 Semantic Elements & Accessibility (a11y)",
            type: "docs",
            author: "MDN Web Docs",
            duration: "60 mins",
            url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure",
            summary: "Structure real-world pages without `<div>` soup using `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, and `<aside>`.",
            keyPoints: ["Proper heading hierarchy (single h1)", "ARIA attributes & alt texts", "Form validation & input types", "Keyboard accessibility"]
          },
          {
            id: "fe_w1_t3",
            title: "CSS Modern Layouts: Complete Flexbox & Grid Masterclass",
            type: "video",
            author: "Kevin Powell",
            duration: "1 hr 30 mins",
            url: "https://www.youtube.com/watch?v=rg7Fvvl3taU",
            summary: "The definitive guide to aligning any UI layout responsively without float or hacky margins.",
            keyPoints: ["Main axis vs cross axis", "flex-grow, flex-shrink, flex-basis", "CSS Grid template areas & minmax()", "Mobile-first media queries"]
          },
          {
            id: "fe_w1_t4",
            title: "Interactive Sandbox: Flexbox Froggy & Grid Garden",
            type: "interactive",
            author: "Codepip",
            duration: "45 mins",
            url: "https://flexboxfroggy.com/",
            summary: "Gamified practice rounds to cement flex-direction, justify-content, and align-items in muscle memory.",
            keyPoints: ["24 levels of Flexbox challenges", "Visual spatial reasoning for UI"]
          }
        ],
        milestoneAction: "Build a responsive Developer Landing Page with semantic HTML, mobile drawer, and CSS Grid feature cards."
      },
      {
        week: 2,
        title: "Modern JavaScript (ES6+) & DOM Manipulation",
        objective: "Master core JavaScript execution, scopes, closures, high-order array methods, and real-time DOM updates.",
        hoursEstimated: 16,
        topics: [
          {
            id: "fe_w2_t1",
            title: "JavaScript Execution Context, Call Stack & Hoisting",
            type: "video",
            author: "Chai aur Code / Hitesh Choudhary",
            duration: "1 hr 15 mins",
            url: "https://www.youtube.com/watch?v=byqwEQD2i_c",
            summary: "Deep dive into Memory Creation Phase and Code Execution Phase to never fear interview JS questions again.",
            keyPoints: ["Global Execution Context", "Lexical environment & scope chain", "Hoisting behavior of var vs let/const", "Temporal Dead Zone (TDZ)"]
          },
          {
            id: "fe_w2_t2",
            title: "Essential ES6+ Features: Destructuring, Spread, Rest & Arrow Functions",
            type: "docs",
            author: "JavaScript.info",
            duration: "1 hr",
            url: "https://javascript.info/destructuring-assignment",
            summary: "Clean, idiomatic modern syntax used in 99% of React codebases.",
            keyPoints: ["Object & array destructuring", "Spread operator for immutability", "Rest parameters in functions", "Lexical `this` in arrow functions"]
          },
          {
            id: "fe_w2_t3",
            title: "Functional Array Methods: `map`, `filter`, `reduce`, `find`",
            type: "video",
            author: "Web Dev Simplified",
            duration: "40 mins",
            url: "https://www.youtube.com/watch?v=R8rmfD9Y5-c",
            summary: "Transform, filter, and accumulate data collections declaratively without mutating original arrays.",
            keyPoints: ["Chaining array methods", "Understanding accumulator in reduce", "Immutable state patterns"]
          },
          {
            id: "fe_w2_t4",
            title: "DOM Manipulation & Event Delegation",
            type: "video",
            author: "Dave Gray",
            duration: "1 hr 10 mins",
            url: "https://www.youtube.com/watch?v=5fb2aPlgoys",
            summary: "Select, manipulate, and listen to user interactions efficiently using event bubbling.",
            keyPoints: ["querySelector & querySelectorAll", "Event bubbling & capturing", "Event delegation for dynamic elements", "Classlist & dataset manipulation"]
          }
        ],
        milestoneAction: "Build a dynamic Task Matrix application with local storage persistence and priority filtering."
      },
      {
        week: 3,
        title: "Asynchronous JavaScript, APIs & Data Fetching",
        objective: "Master Event Loop, Promises, `async`/`await`, fetch API, and handling edge cases/network errors.",
        hoursEstimated: 15,
        topics: [
          {
            id: "fe_w3_t1",
            title: "The JavaScript Event Loop, Microtasks & Macrotasks",
            type: "video",
            author: "Jake Archibald (JSConf)",
            duration: "35 mins",
            url: "https://www.youtube.com/watch?v=cCOL7MC4Pl0",
            summary: "The legendary conference talk that visually demonstrates the call stack, microtask queue (Promises), and macrotask queue (setTimeout).",
            keyPoints: ["Single-threaded non-blocking runtime", "Promise resolution priority", "Animation frames & render pipeline"]
          },
          {
            id: "fe_w3_t2",
            title: "Working with REST APIs: Fetch API, Async/Await & Try/Catch",
            type: "docs",
            author: "MDN Web Docs",
            duration: "1 hr",
            url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing_asynchronous_JavaScript",
            summary: "Fetch remote JSON data, handle HTTP status codes, and manage loading and error states gracefully.",
            keyPoints: ["HTTP headers & payloads", "Parsing JSON response", "Graceful try/catch error handling", "AbortController for canceling requests"]
          },
          {
            id: "fe_w3_t3",
            title: "Hands-on API Lab: Postman & Public APIs",
            type: "interactive",
            author: "Postman Student Academy",
            duration: "45 mins",
            url: "https://academy.postman.com/",
            summary: "Test real-world endpoints (GitHub API, Weather API, CoinGecko) and inspect request headers and response tokens.",
            keyPoints: ["GET, POST, PUT, DELETE methods", "Authorization Bearer tokens", "Rate limiting considerations"]
          }
        ],
        milestoneAction: "Build a live GitHub Dev Finder web app consuming the public GitHub REST API with search debouncing."
      },
      {
        week: 4,
        title: "React Foundations: JSX, Components, State & Hooks",
        objective: "Understand React's declarative component model, reconciliation, and foundational hooks (`useState`, `useEffect`).",
        hoursEstimated: 16,
        topics: [
          {
            id: "fe_w4_t1",
            title: "React Official Interactive Docs: Describing the UI & State",
            type: "docs",
            author: "React.dev (Official)",
            duration: "2 hrs",
            url: "https://react.dev/learn",
            summary: "The new gold-standard interactive React documentation with hands-on sandboxes.",
            keyPoints: ["JSX rules & transpilation", "Props passing and immutability", "State as a snapshot", "Component re-rendering lifecycle"]
          },
          {
            id: "fe_w4_t2",
            title: "Mastering `useState` & `useEffect` without Bugs",
            type: "video",
            author: "Web Dev Simplified",
            duration: "50 mins",
            url: "https://www.youtube.com/watch?v=O6P86uwfdR0",
            summary: "Avoid infinite re-render loops and stale closures by understanding dependency arrays and cleanup functions.",
            keyPoints: ["Functional state updates", "Effect cleanup functions", "Synchronizing with external systems"]
          },
          {
            id: "fe_w4_t3",
            title: "Handling Forms & Controlled vs Uncontrolled Components",
            type: "video",
            author: "Codevolution",
            duration: "40 mins",
            url: "https://www.youtube.com/watch?v=7Vo_VCcWupQ",
            summary: "Create robust form inputs, validation feedback, and clean state handlers in React.",
            keyPoints: ["Controlled component state", "Single source of truth", "Handling multiple input fields cleanly"]
          }
        ],
        milestoneAction: "Build an Interactive Recipe & Nutrition Calculator in React with filtering and state persistence."
      },
      {
        week: 5,
        title: "Advanced React: Routing, Custom Hooks & Global State",
        objective: "Build multi-page SPAs with React Router v6, extract reusable Custom Hooks, and manage shared state with Context API.",
        hoursEstimated: 15,
        topics: [
          {
            id: "fe_w5_t1",
            title: "React Router v6 Complete Tutorial",
            type: "video",
            author: "Traversy Media / Net Ninja",
            duration: "1 hr 15 mins",
            url: "https://www.youtube.com/watch?v=Ul3y1LXxzdU",
            summary: "Implement dynamic routes, URL query params, nested layouts, and 404 error pages.",
            keyPoints: ["BrowserRouter, Routes, Route", "useParams & useSearchParams", "Protected routes architecture", "Outlet for nested layouts"]
          },
          {
            id: "fe_w5_t2",
            title: "Building Reusable Custom Hooks: `useLocalStorage`, `useFetch`, `useDebounce`",
            type: "docs",
            author: "usehooks.com",
            duration: "1 hr",
            url: "https://usehooks.com/",
            summary: "Extract repetitive business logic into modular, testable, and reusable hooks.",
            keyPoints: ["Rules of Hooks", "Composing existing hooks", "Returning tuples vs objects"]
          },
          {
            id: "fe_w5_t3",
            title: "State Management: Context API + `useReducer` vs Zustand",
            type: "video",
            author: "Jack Herrington",
            duration: "45 mins",
            url: "https://www.youtube.com/watch?v=poQXNp9ItL4",
            summary: "Avoid prop drilling across deeply nested components without boilerplate.",
            keyPoints: ["React Context creation & Provider", "Dispatching actions with useReducer", "When to use lightweight Zustand"]
          }
        ],
        milestoneAction: "Build a multi-page E-Commerce Cart & Checkout interface with global state and custom hooks."
      },
      {
        week: 6,
        title: "Full-Stack Integration: Supabase, Auth & Database",
        objective: "Connect your React frontend to a real cloud Postgres database, handle user authentication, and secure row data.",
        hoursEstimated: 15,
        topics: [
          {
            id: "fe_w6_t1",
            title: "Supabase Crash Course: Auth, Postgres Database & RLS",
            type: "video",
            author: "freeCodeCamp / Jon Meyers",
            duration: "1 hr 45 mins",
            url: "https://www.youtube.com/watch?v=7uKQBl9uZW0",
            summary: "Build real production backends in minutes with authentication, tables, and Row Level Security (RLS).",
            keyPoints: ["User signup/login/session tracking", "Postgres table design & foreign keys", "Row Level Security policies", "File storage buckets"]
          },
          {
            id: "fe_w6_t2",
            title: "Securing Client Apps: JWT, LocalStorage vs Cookies, XSS & CSRF",
            type: "docs",
            author: "OWASP Web Security",
            duration: "45 mins",
            url: "https://owasp.org/www-project-top-ten/",
            summary: "Essential security best practices that every hiring manager expects a junior frontend engineer to know.",
            keyPoints: ["Cross-Site Scripting (XSS) prevention", "Cross-Site Request Forgery (CSRF)", "Environment variable safety (.env)"]
          }
        ],
        milestoneAction: "Integrate user authentication and remote persistent cloud storage into your capstone project."
      },
      {
        week: 7,
        title: "Testing, Git Workflow & Web Performance",
        objective: "Write component tests with Vitest/React Testing Library, master professional Git workflows, and score 90+ on Lighthouse.",
        hoursEstimated: 14,
        topics: [
          {
            id: "fe_w7_t1",
            title: "Professional Git & GitHub for Software Teams",
            type: "video",
            author: "Kunal Kushwaha",
            duration: "1 hr 30 mins",
            url: "https://www.youtube.com/watch?v=apGV9Kg7ics",
            summary: "Branching strategies, conventional commit messages, rebasing, and creating professional Pull Requests.",
            keyPoints: ["feature-branch workflow", "Conventional commits: feat, fix, chore", "Resolving merge conflicts like a pro"]
          },
          {
            id: "fe_w7_t2",
            title: "Web Vitals & Performance Optimization",
            type: "docs",
            author: "web.dev by Google",
            duration: "1 hr",
            url: "https://web.dev/vitals/",
            summary: "Measure and optimize Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS).",
            keyPoints: ["Lazy loading images & code splitting (`React.lazy`)", "Bundle analysis", "Minimizing re-renders with `useMemo` & `useCallback`"]
          },
          {
            id: "fe_w7_t3",
            title: "Component Testing with React Testing Library",
            type: "video",
            author: "Codevolution",
            duration: "50 mins",
            url: "https://www.youtube.com/watch?v=T2sv8jXoP4s",
            summary: "Test user behavior rather than implementation details.",
            keyPoints: ["render, screen, fireEvent/userEvent", "expect assertions", "Testing async API fetch calls with mocks"]
          }
        ],
        milestoneAction: "Run Google Lighthouse on your project, resolve all warnings, and write 3 unit test suites."
      },
      {
        week: 8,
        title: "Capstone Delivery, Vercel Deployment & Portfolio Presentation",
        objective: "Complete proof-of-work project, deploy to Vercel/Netlify with custom domain/SSL, and write an outstanding hiring README.",
        hoursEstimated: 15,
        topics: [
          {
            id: "fe_w8_t1",
            title: "Deploying React Apps on Vercel & Configuring CI/CD",
            type: "video",
            author: "Vercel Official",
            duration: "30 mins",
            url: "https://www.youtube.com/watch?v=2HBIzEx6IZA",
            summary: "Automated continuous deployment on every git push with environment secrets management.",
            keyPoints: ["Git integration", "Environment variable injection", "Custom domain configuration", "Production build logs"]
          },
          {
            id: "fe_w8_t2",
            title: "How to Write a GitHub README That Gets You Hired",
            type: "docs",
            author: "Make A Readme",
            duration: "45 mins",
            url: "https://www.makeareadme.com/",
            summary: "Architecture diagrams, live demo badges, feature list, installation instructions, and tech stack tags.",
            keyPoints: ["GIF preview of live app", "Architecture & design decisions", "Lighthouse audit screenshot", "Key learnings & challenges overcome"]
          }
        ],
        milestoneAction: "Submit GitHub repository URL and live deployed URL to PathPilot Proof-of-Work Verification Engine."
      }
    ],
    capstones: [
      {
        id: "capstone_fe_1",
        title: "FinTrack: Personal Wealth & Expense Analytics Platform",
        tier: "Standard Capstone",
        summary: "A production-grade budget & investment tracker with responsive charts, categorization, CSV export, and persistent data storage.",
        acceptanceCriteria: [
          "Users can log transactions with date, category, amount, and payment mode",
          "Interactive dashboard with expense breakdown charts (Pie/Doughnut & Bar charts)",
          "Monthly budget threshold with alert warnings when approaching 80% & 100%",
          "Search & filter transactions by date range and category tag",
          "Export transaction history to CSV format",
          "Data persisted across sessions (LocalStorage or Supabase DB)",
          "Responsive mobile drawer and dark/light mode toggle",
          "Google Lighthouse performance score >= 90"
        ],
        techStack: ["React 18", "Chart.js / Recharts", "Tailwind CSS / Vanilla CSS", "Supabase / LocalStorage", "Vercel"]
      },
      {
        id: "capstone_fe_2",
        title: "DevCollab: Real-Time Developer Community & Project Radar",
        tier: "Advanced Pro Capstone",
        summary: "A specialized platform for developers to showcase projects, find accountability partners, and comment on code architecture.",
        acceptanceCriteria: [
          "Supabase Auth with Email and GitHub OAuth login",
          "User profile creation with skills badges, bio, and social links",
          "Project showcase cards with live demo links, repository stars, and upvotes",
          "Markdown preview editor for project documentation",
          "Comment thread with nested replies for peer code reviews",
          "Filter projects by tech stack (React, Node, Python, etc.)",
          "Zero layout shifts and fast LCP < 1.5s"
        ],
        techStack: ["React", "React Router v6", "Supabase Auth & Database", "Lucide Icons", "Vercel"]
      }
    ]
  },
  data: {
    id: "data",
    title: "Python Data Analyst & Business Intelligence",
    badge: "Fastest Transition for Non-CS Grads",
    salaryRange: "₹4.0 - ₹8.5 LPA",
    targetDurationWeeks: 8,
    estimatedHours: 110,
    summary: "From spreadsheets to querying enterprise SQL databases, building automated Python pipelines, and delivering executive Power BI dashboards.",
    diagnosticQuestions: [
      {
        id: "da_q1",
        question: "Which SQL clause is used to filter the results of an aggregate function like `COUNT()` or `AVG()`?",
        options: [
          "WHERE",
          "HAVING",
          "ORDER BY",
          "GROUP BY"
        ],
        correctIndex: 1,
        explanation: "`WHERE` filters individual rows before grouping, while `HAVING` filters aggregated group results."
      },
      {
        id: "da_q2",
        question: "In Python Pandas, what is the default behavior of `df.dropna(axis=0)`?",
        options: [
          "Drops all columns that contain at least one null value",
          "Drops all rows that contain at least one null value",
          "Fills missing values with the column mean",
          "Replaces null values with 0"
        ],
        correctIndex: 1,
        explanation: "`axis=0` refers to rows; `df.dropna(axis=0)` drops rows containing null/NaN values."
      },
      {
        id: "da_q3",
        question: "What is the primary difference between `INNER JOIN` and `LEFT JOIN` in SQL?",
        options: [
          "`INNER JOIN` returns all rows from the right table regardless of match",
          "`LEFT JOIN` returns all rows from the left table and matched rows from the right table",
          "`INNER JOIN` joins tables using primary keys only",
          "`LEFT JOIN` removes duplicate rows automatically"
        ],
        correctIndex: 1,
        explanation: "`LEFT JOIN` preserves all records from the left table, filling non-matching right table columns with `NULL`."
      },
      {
        id: "da_q4",
        question: "Which metric is most resilient to extreme statistical outliers in a skewed salary distribution?",
        options: [
          "Mean (Average)",
          "Median",
          "Standard Deviation",
          "Variance"
        ],
        correctIndex: 1,
        explanation: "The median is a non-parametric statistic resistant to extreme outliers, making it ideal for skewed distributions like income."
      },
      {
        id: "da_q5",
        question: "In Power BI or Tableau, what is a primary purpose of DAX or Calculated Fields?",
        options: [
          "To format the font size of cards",
          "To write custom mathematical aggregations, ratios, and time-intelligence metrics",
          "To clean HTML tags from web scrapers",
          "To export reports directly to LaTeX"
        ],
        correctIndex: 1,
        explanation: "DAX (Data Analysis Expressions) enables dynamic calculations like Year-over-Year growth, customer churn rate, and weighted margins."
      }
    ],
    weeks: [
      {
        week: 1,
        title: "Business Problem Solving & Advanced Excel Masterclass",
        objective: "Master Excel functions, XLOOKUP, Pivot Tables, conditional formulas, and executive chart storytelling.",
        hoursEstimated: 12,
        topics: [
          {
            id: "da_w1_t1",
            title: "Advanced Excel for Data Analysts: Formulas to Insights",
            type: "video",
            author: "Leila Gharani",
            duration: "1 hr 30 mins",
            url: "https://www.youtube.com/watch?v=OFIx_qO3W3w",
            summary: "Learn essential modern Excel functions used by corporate analysts: XLOOKUP, INDEX/MATCH, SUMIFS, and dynamic arrays.",
            keyPoints: ["XLOOKUP vs legacy VLOOKUP", "Conditional calculations with COUNTIFS & SUMIFS", "Data validation & cleaning trailing spaces"]
          },
          {
            id: "da_w1_t2",
            title: "Pivot Tables, Slicers & Executive Dashboard Design in Excel",
            type: "video",
            author: "Chandoo",
            duration: "1 hr 10 mins",
            url: "https://www.youtube.com/watch?v=m0wI61ahfLc",
            summary: "Transform raw transactional data into interactive KPI summaries with calculated fields and slicers.",
            keyPoints: ["Grouping by dates and quarters", "Calculated fields inside Pivot Tables", "Creating clean visual KPI summary cards"]
          }
        ],
        milestoneAction: "Build an Executive Sales Performance Dashboard in Excel from 10,000 raw transactional records."
      },
      {
        week: 2,
        title: "Relational Databases & SQL Foundations",
        objective: "Understand relational database schema design and write core queries (`SELECT`, `WHERE`, `GROUP BY`, `ORDER BY`).",
        hoursEstimated: 14,
        topics: [
          {
            id: "da_w2_t1",
            title: "SQL for Beginners: Complete Course",
            type: "video",
            author: "Alex The Analyst",
            duration: "2 hrs 15 mins",
            url: "https://www.youtube.com/watch?v=7S_tz1z_5bA",
            summary: "Step-by-step introduction to installing MySQL / PostgreSQL, querying tables, and filtering data.",
            keyPoints: ["SELECT, DISTINCT, WHERE clauses", "Wildcard pattern matching with LIKE", "Aggregate functions: COUNT, SUM, AVG, MIN, MAX", "GROUP BY and HAVING execution order"]
          },
          {
            id: "da_w2_t2",
            title: "Interactive Practice: SQL Murder Mystery",
            type: "interactive",
            author: "Knight Lab",
            duration: "1 hr",
            url: "https://mystery.knightlab.com/",
            summary: "Solve a detective mystery by querying database witness statements, gym check-ins, and car registrations.",
            keyPoints: ["Multi-condition filtering", "Joining evidence tables", "Creative problem solving with SQL"]
          }
        ],
        milestoneAction: "Write 15 analytical SQL queries answering business questions on an E-commerce orders database."
      },
      {
        week: 3,
        title: "Intermediate & Advanced SQL: Joins, Subqueries & CTEs",
        objective: "Master `INNER`/`LEFT`/`RIGHT` joins, subqueries, Common Table Expressions (CTEs), and Window Functions.",
        hoursEstimated: 15,
        topics: [
          {
            id: "da_w3_t1",
            title: "SQL Joins, Subqueries & CTEs Deep Dive",
            type: "video",
            author: "Luke Barousse",
            duration: "1 hr 20 mins",
            url: "https://www.youtube.com/watch?v=9Pzj7Aj25lw",
            summary: "Combine multi-table enterprise schemas and write maintainable CTEs (`WITH` clauses).",
            keyPoints: ["Inner, Left, Right, Full Outer Joins", "Common Table Expressions (CTE) vs subqueries", "Self joins for hierarchical manager/employee data"]
          },
          {
            id: "da_w3_t2",
            title: "SQL Window Functions: `ROW_NUMBER()`, `RANK()`, `LEAD()`, `LAG()`",
            type: "video",
            author: "Alex The Analyst",
            duration: "45 mins",
            url: "https://www.youtube.com/watch?v=Ww71knvhQ-s",
            summary: "Calculate running totals, moving averages, and identify top N customers per category.",
            keyPoints: ["OVER (PARTITION BY ... ORDER BY ...)", "LEAD & LAG for Month-over-Month growth", "DENSE_RANK() vs RANK()"]
          }
        ],
        milestoneAction: "Complete the LeetCode SQL 50 Top Study Plan and save query solutions in a GitHub repo."
      },
      {
        week: 4,
        title: "Python for Data Analysis: Data Structures & Logic",
        objective: "Master Python fundamentals: lists, dictionaries, list comprehensions, lambda functions, and file processing.",
        hoursEstimated: 14,
        topics: [
          {
            id: "da_w4_t1",
            title: "Python for Data Science Beginners",
            type: "video",
            author: "Krish Naik",
            duration: "2 hrs",
            url: "https://www.youtube.com/watch?v=4ojA3p0_QW0",
            summary: "Core Python programming tailored specifically for analytical tasks rather than web backend development.",
            keyPoints: ["Data structures: Lists, Tuples, Sets, Dictionaries", "List comprehensions for fast data mapping", "Custom functions and error handling", "Reading CSV and JSON files natively"]
          },
          {
            id: "da_w4_t2",
            title: "NumPy Essentials: Vectorized Computations & Arrays",
            type: "docs",
            author: "NumPy Official Quickstart",
            duration: "1 hr",
            url: "https://numpy.org/doc/stable/user/quickstart.html",
            summary: "High-performance mathematical array operations that power Pandas and SciPy.",
            keyPoints: ["ndarray dimensions & shapes", "Broadcasting rules", "Boolean indexing and slicing"]
          }
        ],
        milestoneAction: "Build a Python script that parses raw CSV sales logs, computes metrics, and exports clean summaries."
      },
      {
        week: 5,
        title: "Data Wrangling & Cleaning with Pandas",
        objective: "Master DataFrames, handling missing values, pivoting, merging, regex string cleaning, and datetime analysis.",
        hoursEstimated: 16,
        topics: [
          {
            id: "da_w5_t1",
            title: "Pandas Full Tutorial: Clean, Filter, Group, & Transform",
            type: "video",
            author: "Keith Galli",
            duration: "1 hr 45 mins",
            url: "https://www.youtube.com/watch?v=vmEHCJofslg",
            summary: "The highest-rated practical walkthrough of Pandas on real-world multi-megabyte datasets.",
            keyPoints: ["loc vs iloc indexing", "Handling NaN/null values with dropna & fillna", "groupby aggregations and transform", "apply() with custom lambda functions"]
          },
          {
            id: "da_w5_t2",
            title: "DateTime Manipulation & Time-Series Analysis in Pandas",
            type: "docs",
            author: "Pandas Documentation",
            duration: "45 mins",
            url: "https://pandas.pydata.org/docs/user_guide/timeseries.html",
            summary: "Parse dates, extract day-of-week, resample by week/month, and calculate rolling window averages.",
            keyPoints: ["pd.to_datetime() conversion", "Resampling and rolling windows", "Extracting year, quarter, month"]
          }
        ],
        milestoneAction: "Clean an untidy, noisy customer dataset with 20% corrupted rows and publish the Jupyter Notebook."
      },
      {
        week: 6,
        title: "Exploratory Data Analysis (EDA) & Visualization",
        objective: "Uncover patterns, correlations, distributions, and anomalies using Matplotlib & Seaborn.",
        hoursEstimated: 14,
        topics: [
          {
            id: "da_w6_t1",
            title: "Seaborn & Matplotlib Visualization Masterclass",
            type: "video",
            author: "freeCodeCamp / Rob Mulla",
            duration: "1 hr 30 mins",
            url: "https://www.youtube.com/watch?v=daqCS1sZ_5s",
            summary: "Create histograms, box plots, heatmaps, scatter plots, and correlation matrices that speak to business stakeholders.",
            keyPoints: ["Histogram & KDE for distribution skewness", "Box plots & IQR for outlier identification", "Heatmaps for feature correlation", "Formatting chart titles, labels & legends"]
          },
          {
            id: "da_w6_t2",
            title: "Hands-on EDA Case Study: Kaggle Titanic / House Prices",
            type: "interactive",
            author: "Kaggle Learn",
            duration: "1 hr 15 mins",
            url: "https://www.kaggle.com/learn/data-visualization",
            summary: "Interactive cloud notebook completing an end-to-end EDA workflow.",
            keyPoints: ["Hypothesis generation", "Feature engineering insights", "Documenting visual findings with markdown"]
          }
        ],
        milestoneAction: "Publish a comprehensive Exploratory Data Analysis notebook on a public dataset on GitHub."
      },
      {
        week: 7,
        title: "Business Intelligence & Interactive Dashboards (Power BI)",
        objective: "Model relational data schemas, write DAX calculations, and build intuitive executive dashboards.",
        hoursEstimated: 15,
        topics: [
          {
            id: "da_w7_t1",
            title: "Power BI Full Course: Beginner to Pro in 3 Hours",
            type: "video",
            author: "Edureka / Kevin Stratvert",
            duration: "2 hrs 30 mins",
            url: "https://www.youtube.com/watch?v=3u7UDb91nsc",
            summary: "Import data from SQL/Excel, build star schema data models, and assemble interactive dashboards with cross-filtering.",
            keyPoints: ["Power Query ETL transformations", "Star schema vs Snowflake schema", "Building relationships between tables (1-to-many)", "Interactive cross-filtering and drill-throughs"]
          },
          {
            id: "da_w7_t2",
            title: "DAX Essentials: Measures vs Calculated Columns",
            type: "video",
            author: "Guy in a Cube",
            duration: "45 mins",
            url: "https://www.youtube.com/watch?v=hLg7z3h8qis",
            summary: "Master dynamic measures: `CALCULATE()`, `FILTER()`, `TOTALYTD()`, and `DIVIDE()` without syntax errors.",
            keyPoints: ["Row context vs Filter context", "Best practices for DAX measures", "Time intelligence functions"]
          }
        ],
        milestoneAction: "Build a multi-page Power BI Executive Dashboard with dynamic filters, KPIs, and tooltips."
      },
      {
        week: 8,
        title: "End-to-End Capstone Delivery & Executive Presentation",
        objective: "Execute a full business case study (Data Cleaning -> SQL Queries -> Python EDA -> Power BI -> Executive PDF Report).",
        hoursEstimated: 14,
        topics: [
          {
            id: "da_w8_t1",
            title: "How to Structure an Analytics Portfolio Project That Gets Interviews",
            type: "video",
            author: "Luke Barousse",
            duration: "40 mins",
            url: "https://www.youtube.com/watch?v=r-uOLxNrNk8",
            summary: "How to tell the business story, showcase business impact (e.g. ₹50L cost savings identified), and structure your repository.",
            keyPoints: ["Executive Summary structure", "Actionable recommendations vs mere descriptive charts", "Recording a 2-minute Loom walkthrough"]
          }
        ],
        milestoneAction: "Submit GitHub repository with SQL scripts, Jupyter notebooks, Power BI file, and Executive Summary."
      }
    ],
    capstones: [
      {
        id: "capstone_da_1",
        title: "RetailPulse: E-Commerce Churn & Customer Lifetime Value (CLV)",
        tier: "Standard Capstone",
        summary: "End-to-end analytics project diagnosing why customer retention dropped by 18% and modeling RFM customer segments.",
        acceptanceCriteria: [
          "PostgreSQL database with orders, customers, and product tables",
          "SQL queries calculating Cohort Retention Rate & Monthly Churn",
          "Python Pandas notebook performing RFM (Recency, Frequency, Monetary) segmentation",
          "Interactive Power BI dashboard with Executive KPI Cards & Slicers",
          "1-Page Executive PDF Brief highlighting 3 actionable business recommendations",
          "Clean GitHub repo with structured folders: `sql/`, `notebooks/`, `dashboards/`, `data/`"
        ],
        techStack: ["SQL / PostgreSQL", "Python (Pandas, Seaborn)", "Power BI / Tableau", "GitHub"]
      },
      {
        id: "capstone_da_2",
        title: "FinMetric: Fintech Loan Default Risk & Underwriting Analysis",
        tier: "Advanced Pro Capstone",
        summary: "Analyzing 45,000 retail credit applications to detect high-risk default factors and quantify interest rate optimization.",
        acceptanceCriteria: [
          "Data cleaning pipeline handling missing income records and outliers",
          "Multivariate correlation analysis with Seaborn heatmaps",
          "SQL queries grouping risk categories by debt-to-income (DTI) ratio",
          "Executive presentation slide deck with clear visualizations",
          "Loom / YouTube 3-minute video walkthrough linked in the README"
        ],
        techStack: ["Python", "Pandas", "Scikit-Learn (EDA)", "Power BI", "SQL"]
      }
    ]
  },
  backend: {
    id: "backend",
    title: "Backend & Cloud Engineer (Node/Java)",
    badge: "High Growth Potential",
    salaryRange: "₹5.0 - ₹10.0 LPA",
    targetDurationWeeks: 8,
    estimatedHours: 130,
    summary: "Build scalable REST APIs, relational and NoSQL databases, authentication with JWT, Docker containerization, and basic system design.",
    diagnosticQuestions: [
      {
        id: "be_q1",
        question: "In Node.js, what is the role of Libuv?",
        options: [
          "It parses JSON payloads from incoming HTTP requests",
          "It provides the multi-platform C library that handles the event loop and asynchronous I/O thread pool",
          "It manages PostgreSQL database connections",
          "It acts as a reverse proxy like NGINX"
        ],
        correctIndex: 1,
        explanation: "Libuv is the underlying C library responsible for the Node.js event loop, thread pool, file system I/O, and networking."
      },
      {
        id: "be_q2",
        question: "Which HTTP status code is most appropriate when a client fails authentication credentials?",
        options: [
          "400 Bad Request",
          "401 Unauthorized",
          "403 Forbidden",
          "404 Not Found"
        ],
        correctIndex: 1,
        explanation: "401 Unauthorized signifies that authentication is required and has failed or has not been provided."
      }
    ],
    weeks: [
      {
        week: 1,
        title: "Node.js Architecture & HTTP Protocol",
        objective: "Understand Node.js runtime, event loop, modules, and native HTTP server creation.",
        hoursEstimated: 15,
        topics: [
          {
            id: "be_w1_t1",
            title: "Node.js Full Course for Beginners",
            type: "video",
            author: "freeCodeCamp / John Smilga",
            duration: "2 hrs",
            url: "https://www.youtube.com/watch?v=Oe421EPjeBE",
            summary: "Core Node modules, event-driven architecture, streams, and buffers.",
            keyPoints: ["CommonJS vs ES Modules", "fs, path, and http modules", "Streams & buffers for large payloads"]
          }
        ],
        milestoneAction: "Build a raw HTTP REST server without third-party frameworks."
      },
      {
        week: 2,
        title: "Express.js & RESTful API Architecture",
        objective: "Build scalable Express routes, middleware pipelines, error handlers, and input validation with Zod.",
        hoursEstimated: 16,
        topics: [
          {
            id: "be_w2_t1",
            title: "Express.js Fundamentals & Production Architecture",
            type: "video",
            author: "Dave Gray",
            duration: "1 hr 30 mins",
            url: "https://www.youtube.com/watch?v=jD69C035_Lg",
            summary: "Organize route handlers, controllers, service layers, and centralized error middlewares.",
            keyPoints: ["Middleware chain & next()", "Schema validation with Zod", "CORS and Helmet security headers"]
          }
        ],
        milestoneAction: "Create a complete CRUD API with Zod validation and structured logging."
      }
    ],
    capstones: [
      {
        id: "capstone_be_1",
        title: "TaskFlow: Production API with Auth, Redis Caching & Docker",
        tier: "Standard Capstone",
        summary: "A production REST API with JWT auth, refresh token rotation, rate limiting, and Redis caching.",
        acceptanceCriteria: [
          "JWT authentication with HTTP-only cookies and token blacklist",
          "PostgreSQL database connected via Prisma or Drizzle ORM",
          "Redis caching on heavy read endpoints",
          "Rate limiting (e.g. 100 requests per 15 mins per IP)",
          "Docker Compose setup for one-click local startup",
          "API documentation using Swagger / OpenAPI specification"
        ],
        techStack: ["Node.js / Express", "PostgreSQL", "Prisma ORM", "Redis", "Docker"]
      }
    ]
  }
};
