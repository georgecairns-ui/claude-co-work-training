export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "tip"; label: string; text: string }
  | { type: "warn"; label: string; text: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "prompt"; label: string; text: string }

export type Question = {
  prize: string
  question: string
  options: string[]
  correct: number
  audience: number[]
  friend: string
}

export type Module = {
  id: string
  number: string
  title: string
  subtitle: string
  readMins: number
  content: ContentBlock[]
  questions: Question[]
}

export const PRIZE_LADDER = ["£1,000", "£5,000", "£20,000"]

export const modules: Module[] = [
  {
    id: "what-is-cowork",
    number: "01",
    title: "What Cowork actually is",
    subtitle: "Why it is a genuinely different tool from the Claude you already know.",
    readMins: 3,
    content: [
      {
        type: "paragraph",
        text: "Most AI tools are conversational. You ask a question, you get an answer, and the work of turning that answer into something real — a deck, a spreadsheet, a sent email, a tidy folder — is still yours. That is a thinking partner. Useful, but you are still doing the doing.",
      },
      {
        type: "paragraph",
        text: "Claude Cowork is built for the work, not just the answer. It reads and writes files on your computer, uses your connected apps, and runs multi-step jobs on your behalf. You describe an outcome, Claude plans the steps, does them, and hands you something finished.",
      },
      {
        type: "paragraph",
        text: "The shift is small to say and large to live with: you move from chatting with AI to delegating to AI.",
      },
      { type: "heading", text: "What that buys you" },
      {
        type: "list",
        items: [
          "Hours back in your week, because Claude does the context-gathering you would usually skip.",
          "Decisions grounded in everything relevant, not just the three tabs you had open.",
          "Polished output you can trust, with citations back to the real files and messages.",
          "A shorter distance between “I need to do this” and “it is done”, especially for recurring work.",
        ],
      },
      {
        type: "tip",
        label: "Pro tip",
        text: "Think of it like hiring a very capable assistant who lives inside your laptop. You would not tell a new assistant ‘do some marketing’. You would give them the outcome, the format, who it is for, and where the files are. Cowork rewards exactly that.",
      },
    ],
    questions: [
      {
        prize: "£1,000",
        question: "What is the core shift Cowork represents compared to a normal chatbot?",
        options: [
          "From chatting with AI to delegating to AI",
          "From typing prompts to speaking prompts",
          "From free plans to paid plans",
          "From slow answers to faster answers",
        ],
        correct: 0,
        audience: [78, 9, 6, 7],
        friend: "I'm pretty sure it's about delegation — Claude does the doing, not just the talking. Go with A.",
      },
      {
        prize: "£5,000",
        question: "A plain conversational AI is best described in the guide as a…",
        options: ["Work partner", "Thinking partner", "File manager", "Scheduler"],
        correct: 1,
        audience: [12, 71, 8, 9],
        friend: "It contrasts a 'thinking partner' (chat) with a 'work partner' (Cowork). The chatbot is the thinking partner — B.",
      },
      {
        prize: "£20,000",
        question: "According to the guide, what does Cowork actually do beyond giving answers?",
        options: [
          "It only summarises documents",
          "It reads/writes files, uses connected apps, and runs multi-step jobs",
          "It writes code exclusively",
          "It replaces your need to review work",
        ],
        correct: 1,
        audience: [6, 80, 5, 9],
        friend: "Definitely the one about reading/writing files and running multi-step jobs. That's the whole point — B.",
      },
    ],
  },
  {
    id: "chat-vs-cowork-vs-code",
    number: "02",
    title: "Chat vs Cowork vs Code",
    subtitle: "The desktop app has three tabs at the top. Here is what each one is for.",
    readMins: 3,
    content: [
      {
        type: "table",
        headers: ["Tab", "What it is", "Best for"],
        rows: [
          ["Chat", "The regular chatbot — a thinking partner.", "Research, drafting, deciding."],
          ["Cowork", "An agent on your computer that takes action — a work partner.", "Cross-app work touching files and tools."],
          ["Code", "An agent for developers. You can mostly ignore this tab.", "Writing and fixing software."],
        ],
      },
      {
        type: "paragraph",
        text: "The simple rule: if the answer is the deliverable, use Chat. If the answer needs to become files, emails or actions across your tools, use Cowork. When Cowork hits a real coding job, it offers to hand off to Code for you.",
      },
      {
        type: "tip",
        label: "Pro tip",
        text: "Chat and Cowork work brilliantly together. If your Cowork prompt is getting long, jump to the Chat tab, ask Claude to expand and format it for Cowork, then paste it across. Use Chat to think, Cowork to do.",
      },
    ],
    questions: [
      {
        prize: "£1,000",
        question: "You need a quick summary of a report and a suggested reply. Which tab?",
        options: ["Code", "Cowork", "Chat", "Scheduler"],
        correct: 2,
        audience: [4, 18, 73, 5],
        friend: "If the answer itself is the deliverable, that's Chat. Go C.",
      },
      {
        prize: "£5,000",
        question: "When should you reach for Cowork instead of Chat?",
        options: [
          "When you just want a fact",
          "When the answer needs to become files, emails or actions across tools",
          "When you want a shorter reply",
          "When you are offline",
        ],
        correct: 1,
        audience: [7, 79, 9, 5],
        friend: "Cowork is for turning answers into real actions and files — B.",
      },
      {
        prize: "£20,000",
        question: "What happens when Cowork encounters a genuine coding job?",
        options: [
          "It refuses the task",
          "It offers to hand off to the Code tab",
          "It switches you to the free plan",
          "It deletes the files",
        ],
        correct: 1,
        audience: [5, 82, 4, 9],
        friend: "It hands off to Code for you — that's a nice detail from the guide. B.",
      },
    ],
  },
  {
    id: "folder-access",
    number: "03",
    title: "The bit everyone overlooks: folder access",
    subtitle: "Cowork sees nothing until you give it a home on your machine.",
    readMins: 3,
    content: [
      {
        type: "paragraph",
        text: "This is the single thing new users trip over, so it goes near the front. Out of the box, Cowork sees none of your files. It is not quietly reading your hard drive. The first time you ask it to work with files, it asks you to connect a folder, and until you do, the file side of Cowork simply does nothing.",
      },
      {
        type: "paragraph",
        text: "That folder becomes Claude's workshop. It reads from and writes to anything inside — no uploading or downloading. You can connect more folders later and change which folder a task points at.",
      },
      {
        type: "warn",
        label: "Most overlooked",
        text: "Do not point Cowork at your real, live folders on day one. Create a brand new folder, or duplicate the one you want to work with, and point Cowork at the copy. If a task does not turn out how you wanted, your originals are completely untouched.",
      },
      { type: "heading", text: "Why this is good" },
      {
        type: "list",
        items: [
          "A permission, not a default — you control exactly what Claude sees.",
          "It is local — no 20-file upload limit like the chat window.",
          "Outputs land back in the folder as real files.",
        ],
      },
    ],
    questions: [
      {
        prize: "£1,000",
        question: "By default, how much of your computer can Cowork see?",
        options: ["Your entire hard drive", "Nothing until you connect a folder", "Only your desktop", "Only PDFs"],
        correct: 1,
        audience: [6, 80, 8, 6],
        friend: "It sees nothing until you grant a folder. B for sure.",
      },
      {
        prize: "£5,000",
        question: "What is the safest habit when getting started with folder access?",
        options: [
          "Point it at your only copy of important files",
          "Point it at a fresh or duplicated folder",
          "Disable folder access entirely",
          "Upload files one at a time",
        ],
        correct: 1,
        audience: [5, 81, 6, 8],
        friend: "Work on a copy so originals stay safe — B.",
      },
      {
        prize: "£20,000",
        question: "What advantage does a connected folder have over the chat window?",
        options: [
          "It has a 20-file upload limit",
          "It is local with no upload limit, and outputs land back as real files",
          "It hides your files from you",
          "It requires the free plan",
        ],
        correct: 1,
        audience: [4, 83, 5, 8],
        friend: "Local, no 20-file cap, real file outputs — B.",
      },
    ],
  },
  {
    id: "cowork-projects",
    number: "04",
    title: "Cowork projects are not chat projects",
    subtitle: "Same word, two very different things.",
    readMins: 2,
    content: [
      {
        type: "table",
        headers: ["Projects in Chat", "Projects in Cowork"],
        rows: [
          ["A tidy bucket for related conversations", "A persistent workspace wrapped around a real folder"],
          ["Holds custom instructions and uploaded files", "Its own instructions, memory, files and connections"],
          ["Lives entirely inside the chat window", "Remembers context across every session"],
          ["Cannot touch your computer, folders or apps", "Reads and writes real files and runs real tasks"],
        ],
      },
      {
        type: "paragraph",
        text: "In short: a chat project organises your conversations. A Cowork project organises your work, tied to a folder that actually exists on your computer.",
      },
      {
        type: "tip",
        label: "Pro tip",
        text: "You do not need projects on day one. Start with single tasks pointed at a folder. Reach for a Cowork project when you keep re-explaining the same background every session.",
      },
    ],
    questions: [
      {
        prize: "£1,000",
        question: "A Cowork project is wrapped around what?",
        options: ["A chat thread", "A real folder on your computer", "A browser tab", "A connector"],
        correct: 1,
        audience: [9, 78, 7, 6],
        friend: "It's tied to a real folder — B.",
      },
      {
        prize: "£5,000",
        question: "What can a Cowork project do that a chat project cannot?",
        options: [
          "Store custom instructions",
          "Remember context across sessions and run real tasks on files",
          "Organise conversations",
          "Hold uploaded files",
        ],
        correct: 1,
        audience: [8, 77, 7, 8],
        friend: "Persistent memory + real file tasks — that's B.",
      },
      {
        prize: "£20,000",
        question: "When does the guide suggest you actually reach for a Cowork project?",
        options: [
          "On day one, always",
          "When you keep re-explaining the same background every session",
          "Only for coding",
          "Never — single tasks are enough",
        ],
        correct: 1,
        audience: [10, 74, 8, 8],
        friend: "When you're repeating context every time — B.",
      },
    ],
  },
  {
    id: "setup",
    number: "05",
    title: "Setup, step by step",
    subtitle: "A one-time setup of about 2 minutes. No terminal, no code.",
    readMins: 4,
    content: [
      { type: "heading", text: "What you need first" },
      {
        type: "list",
        items: [
          "The Claude desktop app for macOS or Windows — Cowork runs in the desktop app, not the browser.",
          "A paid Claude plan (Pro, Max, Team or Enterprise). It is not on the free plan.",
          "An internet connection throughout the session.",
        ],
      },
      { type: "heading", text: "The steps" },
      {
        type: "list",
        items: [
          "Install and open the desktop app. Sign in.",
          "Switch into Cowork mode using the tab at the top.",
          "Connect the apps you use (Gmail, Drive, Calendar, Slack, Microsoft 365 and more).",
          "Set your permissions comfort level — read-only freely, approval for anything that writes, sends, deletes or shares.",
          "Grant folder access. Until you do, the file features do nothing.",
          "Write your global instructions in Settings → Cowork: your role, tone, output format, and anything Claude should never do.",
        ],
      },
      {
        type: "tip",
        label: "Pro tip",
        text: "Folder instructions sit one level below global ones. Global is ‘how I always work’. Folder is ‘how this particular job works’. Claude can even update folder notes itself as it learns how you like things.",
      },
      {
        type: "warn",
        label: "Model choice",
        text: "For most tasks, Sonnet with thinking mode on is plenty. Step up to Opus only for genuinely complex jobs — it is more thorough but slower and uses your limits faster.",
      },
    ],
    questions: [
      {
        prize: "£1,000",
        question: "Where does Cowork run?",
        options: ["In any web browser", "In the Claude desktop app", "On the free plan only", "In a terminal"],
        correct: 1,
        audience: [9, 80, 6, 5],
        friend: "Desktop app, not the browser — B.",
      },
      {
        prize: "£5,000",
        question: "What is the sensible default for the permissions comfort level?",
        options: [
          "Allow everything automatically",
          "Read-only runs freely; writing, sending, deleting or sharing needs approval",
          "Block everything",
          "Approve only read actions",
        ],
        correct: 1,
        audience: [7, 79, 8, 6],
        friend: "Reads free, anything that changes things needs approval — B.",
      },
      {
        prize: "£20,000",
        question: "Which model should you use for most everyday tasks?",
        options: ["Opus, always", "Sonnet with thinking mode on", "The free model", "Whichever is slowest"],
        correct: 1,
        audience: [11, 76, 6, 7],
        friend: "Stay on Sonnet for everyday work, save Opus for the hard stuff — B.",
      },
    ],
  },
  {
    id: "task-runs",
    number: "06",
    title: "What happens when a task runs",
    subtitle: "So nothing surprises you the first time you watch Claude work.",
    readMins: 3,
    content: [
      {
        type: "list",
        items: [
          "It plans and shows a checklist — top-right, ticked off as Claude finishes each step.",
          "You can watch it think, or walk away. Open the dropdown to follow its reasoning and course-correct mid-task.",
          "It asks sharp clarifying questions before a big job (audience, length, sources).",
          "It splits big jobs across parallel sub-agents that each take a batch, then combines the results.",
          "It runs as long as it needs — hand it something complex, close the window, come back to finished work.",
        ],
      },
      {
        type: "warn",
        label: "Safeguards always on",
        text: "Even in the most permissive mode, Claude needs your permission to delete files and explicit confirmation before sensitive actions: sending things on your behalf, purchases, financial transactions, solving captchas, and modifying system files. It will not quietly send an email for you.",
      },
      {
        type: "tip",
        label: "Pro tip",
        text: "On a big job, start small to test. Ask Claude to run on 10 files before you set it loose on 345. You spot any misunderstanding early, when it is cheap to fix.",
      },
    ],
    questions: [
      {
        prize: "£1,000",
        question: "Where can you see Claude's plan as a task runs?",
        options: [
          "A checklist in the top-right, ticked off as it goes",
          "In a separate email",
          "Nowhere — it is hidden",
          "In the Code tab only",
        ],
        correct: 0,
        audience: [80, 6, 7, 7],
        friend: "There's a live checklist top-right — A.",
      },
      {
        prize: "£5,000",
        question: "How does Cowork handle a very large task?",
        options: [
          "It refuses anything big",
          "It splits the work across parallel sub-agents, then combines results",
          "It does one file per day",
          "It hands everything to Code",
        ],
        correct: 1,
        audience: [6, 81, 7, 6],
        friend: "Parallel sub-agents that combine results — B.",
      },
      {
        prize: "£20,000",
        question: "Which of these will Claude NOT do without explicit confirmation?",
        options: [
          "Read a file",
          "Send an email on your behalf or make a purchase",
          "Summarise a document",
          "Show its reasoning",
        ],
        correct: 1,
        audience: [5, 83, 6, 6],
        friend: "Sensitive actions like sending or buying always need confirmation — B.",
      },
    ],
  },
  {
    id: "skills-connectors-plugins",
    number: "07",
    title: "Skills, connectors and plugins",
    subtitle: "Three ideas that turn a generic assistant into one that works the way you do.",
    readMins: 4,
    content: [
      { type: "heading", text: "Skills — the recipe cards" },
      {
        type: "paragraph",
        text: "A skill is a saved set of instructions that teaches Claude how to do a specific job your way, every time, without re-explaining. Claude loads the right one automatically, or you call it with a slash command.",
      },
      {
        type: "list",
        items: [
          "Do the task once with Claude until the output is exactly right.",
          "Check it carefully — only build a skill from something you have proven works.",
          "Ask Claude to save it as a reusable skill with a clear name.",
          "Test it on a fresh task before you trust it.",
          "Update and share — on Team or Enterprise, share skills so the whole team works to the same playbook.",
        ],
      },
      { type: "heading", text: "Connectors — the links to your apps" },
      {
        type: "paragraph",
        text: "Connectors are how Cowork reaches your other software: Gmail, Drive, Calendar, Slack, Notion, Microsoft 365 and more. If an app is not listed, it can often still be connected through something called MCP.",
      },
      {
        type: "tip",
        label: "Good to know",
        text: "Connectors update constantly. If an app added a new ability and you do not see it, click the three dots next to the connector and choose ‘refresh tools list’. New actions appear without reinstalling anything.",
      },
      { type: "heading", text: "Plugins — the full cookbooks" },
      {
        type: "paragraph",
        text: "A plugin bundles several skills, connectors and commands into one installable package built around a job: sales, legal, finance, marketing. Reach for one when you keep re-explaining the same workflow that spans several tools.",
      },
      {
        type: "warn",
        label: "Stay safe",
        text: "If you install plugins other people have built, only take them from reputable sources. A plugin can carry instructions and connections, so trust the author first.",
      },
    ],
    questions: [
      {
        prize: "£1,000",
        question: "What is a 'skill' in Cowork?",
        options: [
          "A saved set of instructions teaching Claude to do a specific job your way",
          "A paid add-on",
          "A type of folder",
          "A connector for Slack",
        ],
        correct: 0,
        audience: [79, 8, 7, 6],
        friend: "A reusable recipe for a job done your way — A.",
      },
      {
        prize: "£5,000",
        question: "What is the right way to build a skill?",
        options: [
          "Write it from scratch before ever running the task",
          "Do the task once until it's right, verify it, then save it as reusable",
          "Download one from any source",
          "Ask the audience",
        ],
        correct: 1,
        audience: [7, 80, 7, 6],
        friend: "Prove it works first, then save — B.",
      },
      {
        prize: "£20,000",
        question: "What does a plugin bundle together?",
        options: [
          "Only one connector",
          "Several skills, connectors and commands around a job",
          "Your folders",
          "Your billing settings",
        ],
        correct: 1,
        audience: [6, 81, 7, 6],
        friend: "A plugin is the full cookbook — skills + connectors + commands. B.",
      },
    ],
  },
  {
    id: "scheduled-tasks",
    number: "08",
    title: "Scheduled tasks",
    subtitle: "Most of the work that eats your week is recurring. Set it once and let it run.",
    readMins: 2,
    content: [
      {
        type: "paragraph",
        text: "Scheduled tasks let you save a job and have Cowork run it on a cadence: every Monday morning, every Friday at five, the first of every month. The recurring work that never justified its own tool now just happens in the background.",
      },
      {
        type: "prompt",
        label: "Describe it in plain English",
        text: "Every morning at 7am, give me a brief of my day based on my calendar and a short summary of any emails I should be aware of, and save it to my Apple Notes.",
      },
      {
        type: "warn",
        label: "Watch out",
        text: "The desktop app must be open for a scheduled task to fire at its exact time. If it is closed, the task kicks off the next time you open the app.",
      },
      {
        type: "tip",
        label: "Pro tip",
        text: "Pair a scheduled task with a template. Build the weekly report format once, then schedule Claude to fill it in every Friday morning so a finished draft is waiting when you sit down.",
      },
    ],
    questions: [
      {
        prize: "£1,000",
        question: "What are scheduled tasks best suited for?",
        options: ["One-off experiments", "Recurring work on a cadence", "Coding only", "Deleting files"],
        correct: 1,
        audience: [8, 80, 6, 6],
        friend: "Recurring jobs that run on a schedule — B.",
      },
      {
        prize: "£5,000",
        question: "What must be true for a scheduled task to fire at its exact time?",
        options: [
          "You must be on Opus",
          "The desktop app must be open",
          "You must be online for 24 hours",
          "You must use a plugin",
        ],
        correct: 1,
        audience: [7, 80, 7, 6],
        friend: "The desktop app needs to be open — B.",
      },
      {
        prize: "£20,000",
        question: "What does the guide suggest pairing a scheduled task with?",
        options: ["A second account", "A template you build once", "A new folder daily", "The Code tab"],
        correct: 1,
        audience: [6, 81, 7, 6],
        friend: "Pair it with a reusable template — B.",
      },
    ],
  },
  {
    id: "automate",
    number: "09",
    title: "10 things to automate this week",
    subtitle: "Real jobs, with what to ask and what you get back. Start with one.",
    readMins: 4,
    content: [
      {
        type: "paragraph",
        text: "Pick one real job, not a toy demo. You learn more from one real task than from ten tests. Here are ten proven starting points.",
      },
      {
        type: "list",
        items: [
          "Tidy a chaotic folder — rename everything clearly and sort into subfolders.",
          "Triage your inbox after time off — categorise threads and draft two-line replies for the urgent ones.",
          "Prep for a meeting — pull email, Slack, docs and notes into a one-page brief.",
          "Draft a recurring weekly report — fill your template from real sources.",
          "Compare options across documents — head-to-head spreadsheet plus a recommendation.",
          "Turn a research folder into a brief — a two-page brief with citations.",
          "Build a project plan from kickoff notes — milestones, owners, timeline, risks.",
          "Get a daily morning brief — calendar + inbox digest sent to your notes app.",
          "Turn statements into a spending dashboard — local, interactive, with flagged subscriptions.",
          "Make a brand book, then a brand skill — reusable one-command branding.",
        ],
      },
      {
        type: "tip",
        label: "Pro tip",
        text: "When comparing documents, Cowork builds a spreadsheet with one row per option and one column per criterion, and flags where a proposal was silent on a point.",
      },
    ],
    questions: [
      {
        prize: "£1,000",
        question: "What is the guide's advice for your very first Cowork job?",
        options: [
          "Pick a toy demo to be safe",
          "Pick one real job you were about to do yourself",
          "Run it on 345 files at once",
          "Start with coding",
        ],
        correct: 1,
        audience: [8, 79, 6, 7],
        friend: "One real job beats ten test demos — B.",
      },
      {
        prize: "£5,000",
        question: "When comparing vendor PDFs, what does Cowork helpfully flag?",
        options: [
          "Where a proposal was silent on a criterion",
          "The file sizes",
          "Your calendar conflicts",
          "Spelling only",
        ],
        correct: 0,
        audience: [78, 9, 6, 7],
        friend: "It flags gaps — where a proposal said nothing on a point. A.",
      },
      {
        prize: "£20,000",
        question: "The spending dashboard example highlights which advantage over chat?",
        options: [
          "It needs no folder",
          "It works locally, far past the 20-file upload limit",
          "It runs only on Opus",
          "It emails your bank",
        ],
        correct: 1,
        audience: [6, 80, 7, 7],
        friend: "Local processing beyond the 20-file cap — B.",
      },
    ],
  },
  {
    id: "prompting",
    number: "10",
    title: "Prompting like a pro",
    subtitle: "The people who get incredible results front-load context and are specific about output.",
    readMins: 3,
    content: [
      {
        type: "paragraph",
        text: "Compare a vague prompt with a specific one. ‘Summarise what is happening with the pricing project’ leaves Claude guessing. A strong version names the sources, the timeframe and the output: ‘Read my Pricing 2026 folder and 2 weeks of #pricing-wg. Where have we landed, what is open? Skip anything before 1 April.’",
      },
      { type: "heading", text: "Four habits worth keeping" },
      {
        type: "list",
        items: [
          "Be specific about the output — state format, length, audience and tone.",
          "Iterate in place — if a draft is 80% right, tell Claude what to change; it edits faster than it regenerates.",
          "Work step by step on tricky jobs — give feedback as you go, even a screenshot of what looks wrong.",
          "Know when to hand off — Cowork for file-and-context work, Code for heavy coding, Chat for a quick fact.",
        ],
      },
      {
        type: "prompt",
        label: "Effective prompt",
        text: "Draft a Q2 board update using my Q1 template. Pull metrics from my Q2 KPIs sheet. One page, no jargon.",
      },
    ],
    questions: [
      {
        prize: "£1,000",
        question: "What separates an effective prompt from a weak one?",
        options: [
          "It is shorter",
          "It front-loads context and specifies the output",
          "It uses more emoji",
          "It avoids naming sources",
        ],
        correct: 1,
        audience: [6, 81, 6, 7],
        friend: "Context up front + specific output — B.",
      },
      {
        prize: "£5,000",
        question: "If a draft is about 80% right, what should you do?",
        options: [
          "Regenerate it from scratch",
          "Iterate in place — tell Claude what to change",
          "Give up and do it yourself",
          "Switch to Code",
        ],
        correct: 1,
        audience: [7, 80, 7, 6],
        friend: "Edit in place — it's faster than regenerating. B.",
      },
      {
        prize: "£20,000",
        question: "Which four things should a strong output spec state?",
        options: [
          "Format, length, audience and tone",
          "Colour, font, size and speed",
          "Price, date, name and place",
          "Model, plan, folder and tab",
        ],
        correct: 0,
        audience: [80, 7, 6, 7],
        friend: "Format, length, audience, tone — A.",
      },
    ],
  },
  {
    id: "safe",
    number: "11",
    title: "Staying safe and in control",
    subtitle: "Cowork accelerates your work. It does not replace your judgement.",
    readMins: 3,
    content: [
      { type: "heading", text: "The permission model" },
      {
        type: "paragraph",
        text: "Every connector action is always allow, needs approval, or blocked. A sensible default: let read-only actions run freely and require approval for anything that writes, sends, deletes or shares.",
      },
      { type: "heading", text: "Review before you ship" },
      {
        type: "paragraph",
        text: "Read what Claude produces before sending or publishing, especially anything with numbers, names, citations or money attached.",
      },
      { type: "heading", text: "Memory across sessions" },
      {
        type: "paragraph",
        text: "A single task does not automatically remember previous, separate sessions. Use a Cowork project (which keeps memory), or ask Claude to keep a running log file in your folder that it updates each session.",
      },
      {
        type: "warn",
        label: "Usage and limits",
        text: "Limits are per session and Opus uses them faster than Sonnet. Stay on Sonnet for everyday work and test on a small batch before a heavy run.",
      },
    ],
    questions: [
      {
        prize: "£1,000",
        question: "What are the three states for any connector action?",
        options: [
          "Always allow, needs approval, or blocked",
          "On, off, or paused",
          "Free, paid, or trial",
          "Read, write, delete",
        ],
        correct: 0,
        audience: [80, 7, 6, 7],
        friend: "Always allow / needs approval / blocked — A.",
      },
      {
        prize: "£5,000",
        question: "How do you give a task memory across separate sessions?",
        options: [
          "It always remembers automatically",
          "Use a Cowork project, or keep a running log file in the folder",
          "Reinstall the app each time",
          "Switch to Chat",
        ],
        correct: 1,
        audience: [7, 80, 6, 7],
        friend: "A Cowork project keeps memory, or use a log file — B.",
      },
      {
        prize: "£20,000",
        question: "What should you always review most carefully before shipping?",
        options: [
          "Font choices",
          "Anything with numbers, names, citations or money",
          "The file names",
          "The folder colour",
        ],
        correct: 1,
        audience: [6, 81, 6, 7],
        friend: "Numbers, names, citations, money — always check those. B.",
      },
    ],
  },
  {
    id: "mistakes",
    number: "12",
    title: "Common mistakes to avoid",
    subtitle: "Learn these the easy way, from a guide, rather than the hard way.",
    readMins: 2,
    content: [
      { type: "heading", text: "Do" },
      {
        type: "list",
        items: [
          "Work in a duplicated or fresh folder while you learn.",
          "Hand it a job you were about to do yourself.",
          "Name the reader, the decision, the format, the sources.",
          "Stay on Sonnet; reach for Opus only when needed.",
          "Review every output, especially numbers and money.",
        ],
      },
      { type: "heading", text: "Do not" },
      {
        type: "list",
        items: [
          "Point it at your only copy of important files.",
          "Start with a toy demo instead of a real task.",
          "Be vague — ‘do some marketing’ makes Claude guess.",
          "Default to Opus and exhaust your session.",
          "Send or publish without reading it first.",
        ],
      },
      {
        type: "tip",
        label: "Your first ten minutes",
        text: "Close this guide. Open the desktop app, switch to Cowork, connect one folder, and hand it one real job. Watch the checklist tick along in the top-right. That single real task teaches you more than another page of reading.",
      },
    ],
    questions: [
      {
        prize: "£1,000",
        question: "Which of these is a mistake to avoid?",
        options: [
          "Working in a duplicated folder",
          "Pointing Cowork at your only copy of important files",
          "Naming the sources",
          "Reviewing every output",
        ],
        correct: 1,
        audience: [6, 80, 7, 7],
        friend: "Never point it at your only copy — B.",
      },
      {
        prize: "£5,000",
        question: "What is the cure for a vague prompt like 'do some marketing'?",
        options: [
          "Use Opus",
          "Name the reader, the decision, the format and the sources",
          "Add more files",
          "Use the Code tab",
        ],
        correct: 1,
        audience: [7, 80, 6, 7],
        friend: "Be specific — reader, decision, format, sources. B.",
      },
      {
        prize: "£20,000",
        question: "What does the guide recommend for your first ten minutes?",
        options: [
          "Read three more chapters",
          "Connect one folder and hand Cowork one real job",
          "Upgrade to Opus",
          "Build five skills first",
        ],
        correct: 1,
        audience: [6, 81, 6, 7],
        friend: "Stop reading, do one real task — B.",
      },
    ],
  },
]
