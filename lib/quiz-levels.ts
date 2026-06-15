export type LevelQuestion = {
  question: string
  options: string[]
  correct: number
  why: string
}

export type QuizLevel = {
  id: "easy" | "medium" | "hard"
  label: string
  tagline: string
  pass: number
  total: number
  accent: string
  questions: LevelQuestion[]
}

const easy: LevelQuestion[] = [
  {
    question: "What is Claude Cowork best described as?",
    options: [
      "An AI agent that works on your computer and takes action",
      "A faster version of the chat box",
      "A web search engine",
      "A tool only developers can use",
    ],
    correct: 0,
    why: "Cowork is an agent that acts on your files and apps, not just a chatbot.",
  },
  {
    question: "Which Claude tab is for everyday conversation, research and drafting?",
    options: ["Cowork", "Code", "Canvas", "Chat"],
    correct: 3,
    why: "Chat is the regular thinking-partner chatbot.",
  },
  {
    question: "Before Cowork can work with your files, you must first...",
    options: ["Pay an extra fee", "Email Anthropic support", "Give it access to a folder", "Reinstall the app"],
    correct: 2,
    why: "Cowork sees no files until you connect a folder.",
  },
  {
    question: "Where does Claude Cowork run?",
    options: ["Any web browser", "Mobile only", "A command-line terminal only", "The Claude desktop app"],
    correct: 3,
    why: "Cowork lives in the macOS/Windows desktop app.",
  },
  {
    question: "Which plan lets you use Cowork?",
    options: ["The free plan only", "A paid plan: Pro, Max, Team or Enterprise", "A trial only", "No plan is needed"],
    correct: 1,
    why: "Cowork is a paid-plan feature.",
  },
  {
    question: "A connector lets Cowork...",
    options: [
      "Delete your hard drive",
      "Link to apps like Gmail, Drive and Slack",
      "Write its own code",
      "Change your password",
    ],
    correct: 1,
    why: "Connectors are integrations with your other apps.",
  },
  {
    question: "A skill is best described as...",
    options: [
      "A saved set of instructions for a repeatable task",
      "A paid add-on you must buy",
      "A type of image file",
      "Another word for a connector",
    ],
    correct: 0,
    why: "A skill teaches Claude to do a job your way, every time.",
  },
  {
    question: "A plugin bundles...",
    options: [
      "Only colours and fonts",
      "Your emails",
      "Several skills, connectors and commands for a job",
      "Nothing useful",
    ],
    correct: 2,
    why: "A plugin is the full cookbook for a role or workflow.",
  },
  {
    question: "Scheduled tasks let you...",
    options: [
      "Run a saved job on a regular cadence",
      "Speed up your laptop",
      "Permanently delete files",
      "Translate documents",
    ],
    correct: 0,
    why: "You save a job once and it runs on a schedule.",
  },
  {
    question: "Which model is recommended for most everyday tasks?",
    options: ["Opus", "No model at all", "Whichever is most expensive", "Sonnet"],
    correct: 3,
    why: "Sonnet with thinking on handles most work; Opus is for complex jobs.",
  },
  {
    question: "While a task runs, where do you watch progress?",
    options: [
      "A checklist in the top-right",
      "Bottom-left status bar",
      "Only in your email",
      "You cannot see progress",
    ],
    correct: 0,
    why: "Cowork shows a tick-list of steps top-right.",
  },
  {
    question: "Cowork can produce...",
    options: [
      "Only chat text",
      "Real files like documents and spreadsheets",
      "Only images",
      "Nothing you can keep",
    ],
    correct: 1,
    why: "It hands back real, openable deliverables.",
  },
  {
    question: "A safe habit when getting started is to...",
    options: [
      "Point it at your only copy of files",
      "Switch off all permissions",
      "Always use Opus",
      "Work in a duplicated or brand-new folder",
    ],
    correct: 3,
    why: "A copy keeps your originals safe if a task goes wrong.",
  },
  {
    question: "Which of these is NOT one of the three tabs?",
    options: ["Chat", "Cowork", "Cloud", "Code"],
    correct: 2,
    why: "The tabs are Chat, Cowork and Code.",
  },
  {
    question: "When Cowork is working, you can...",
    options: [
      "Only watch every second",
      "Not do anything else",
      "Only use it offline",
      "Step away and come back to finished work",
    ],
    correct: 3,
    why: "Long-running tasks run while you do other things.",
  },
  {
    question: "Sub-agents are used to...",
    options: [
      "Deliberately slow tasks down",
      "Send marketing emails",
      "Run parts of a big task in parallel",
      "Nothing in particular",
    ],
    correct: 2,
    why: "Cowork splits big jobs across parallel sub-agents.",
  },
  {
    question: "To let Cowork act on the web, you use...",
    options: ["A printer driver", "The Claude in Chrome extension", "A USB stick", "Nothing, it cannot browse"],
    correct: 1,
    why: "Claude in Chrome gives Cowork web access.",
  },
  {
    question: "Global instructions apply to...",
    options: ["Every Cowork session", "A single message", "Only emails", "Only the Opus model"],
    correct: 0,
    why: "Global instructions are standing context for all sessions.",
  },
  {
    question: "Cowork always asks your permission before...",
    options: [
      "Reading a file you connected",
      "Thinking about a task",
      "Deleting files and other sensitive actions",
      "Showing its checklist",
    ],
    correct: 2,
    why: "Deleting and sensitive actions need confirmation.",
  },
  {
    question: "The best first task to try is...",
    options: ["A trivial toy demo", "A real job you were about to do yourself", "Nothing at all", "A video game"],
    correct: 1,
    why: "You learn far more from one real task.",
  },
]

const medium: LevelQuestion[] = [
  {
    question: "The key difference between Chat and Cowork is that...",
    options: [
      "Chat answers while Cowork takes action",
      "Cowork is cheaper",
      "Chat takes action while Cowork only answers",
      "There is no real difference",
    ],
    correct: 0,
    why: "Chat is a thinking partner; Cowork is a work partner that acts.",
  },
  {
    question: "How is a Cowork project different from a chat project?",
    options: [
      "They are the same thing",
      "A Cowork project wraps a real folder with its own memory and connections",
      "A chat project can edit your files",
      "A Cowork project is just a folder of chats",
    ],
    correct: 1,
    why: "Cowork projects persist files, instructions and memory tied to a real folder.",
  },
  {
    question: "Which prompt is most effective?",
    options: [
      "“Summarise the pricing project”",
      "“Do pricing”",
      "“Read my Pricing 2026 folder and 2 weeks of #pricing-wg, say what has landed and what is open, skip anything before 1 April”",
      "“Help me”",
    ],
    correct: 2,
    why: "It names the sources, the question and the time window.",
  },
  {
    question: "Your scheduled 7am brief did not run overnight. The most likely reason is...",
    options: [
      "You picked the wrong model",
      "You have never had internet",
      "Cowork is broken",
      "The desktop app was closed at 7am",
    ],
    correct: 3,
    why: "Scheduled tasks need the app open; otherwise they run next time you open it.",
  },
  {
    question: "You want Claude to follow your team's exact way of doing a recurring task. Best tool?",
    options: ["A skill", "A one-off prompt", "A longer chat", "The Opus model"],
    correct: 0,
    why: "A skill captures the repeatable way of working.",
  },
  {
    question: "The right way to build a skill is to...",
    options: [
      "Write it blind before trying the task",
      "Do the task once, check it, then save it as a skill",
      "Buy one from a shop",
      "Copy a stranger's and hope",
    ],
    correct: 1,
    why: "Prove it works first, then save what worked.",
  },
  {
    question: "To compare five vendor PDFs into a spreadsheet, you should...",
    options: [
      "Upload them into the chat box",
      "Forward them by email",
      "Put them in a folder and ask Cowork for a comparison table plus a recommendation",
      "Use Claude Code",
    ],
    correct: 2,
    why: "Cowork reads the folder and builds the spreadsheet and rationale.",
  },
  {
    question: "A sensible default permission setup is...",
    options: [
      "Block every action",
      "Let read-only actions run, require approval for writing, sending, deleting or sharing",
      "Always-allow everything",
      "Approve nothing ever",
    ],
    correct: 1,
    why: "Read-only free, anything that changes things needs approval.",
  },
  {
    question: "Why duplicate a folder before pointing Cowork at it?",
    options: [
      "So your originals are safe if a task goes wrong",
      "It runs faster",
      "To save money",
      "Because it is mandatory",
    ],
    correct: 0,
    why: "A copy protects your real files.",
  },
  {
    question: "When should you reach for a plugin instead of just asking?",
    options: [
      "For one-off general-knowledge questions",
      "Never",
      "Only for making images",
      "When you keep re-explaining the same multi-tool workflow",
    ],
    correct: 3,
    why: "Plugins pay off for repeated, multi-tool, team-specific workflows.",
  },
  {
    question: "Compared with the chat window's ~20-file upload limit, Cowork...",
    options: [
      "Has the same limit",
      "Is capped at five files",
      "Reads a whole local folder with no such limit",
      "Cannot read files",
    ],
    correct: 2,
    why: "Local folder access removes the upload cap.",
  },
  {
    question: "To get citations in a research brief, you should...",
    options: [
      "Ask for them only at the very end",
      "Never bother",
      "Assume they always appear",
      "Ask for them from the start",
    ],
    correct: 3,
    why: "Retrofitting citations is painful; ask up front.",
  },
  {
    question: "If a first draft is about 80% right, you should...",
    options: [
      "Start again from scratch",
      "Tell Claude what to change and iterate in place",
      "Give up",
      "Switch to Opus",
    ],
    correct: 1,
    why: "It edits faster than it regenerates and remembers the thread.",
  },
  {
    question: "A connector gained new abilities but you do not see them. You should...",
    options: [
      "Reinstall Claude",
      "Click the three dots on the connector and choose 'refresh tools list'",
      "Wait a month",
      "Do nothing",
    ],
    correct: 1,
    why: "Refreshing the tools list pulls in new actions.",
  },
  {
    question: "Which job is better handed to Claude Code than to Cowork?",
    options: ["Inbox triage", "Meeting prep", "A weekly status report", "Refactoring a codebase and running its tests"],
    correct: 3,
    why: "Heavy coding inside a repo is Code's job.",
  },
  {
    question: "To make Cowork research five competitors at the same time, add to your prompt...",
    options: ['“be quick”', '“use Opus”', '“run these in parallel, one sub-agent each”', '“delete old files”'],
    correct: 2,
    why: "‘In parallel’ nudges it to spin up sub-agents.",
  },
  {
    question: "Folder instructions differ from global instructions because they...",
    options: [
      "Apply to every session everywhere",
      "Cannot be edited",
      "Cost extra",
      "Apply only to that folder or job",
    ],
    correct: 3,
    why: "Global = how I always work; folder = how this job works.",
  },
  {
    question: "When triaging your inbox, Cowork will...",
    options: [
      "Send replies automatically",
      "Delete emails to tidy up",
      "Draft replies and never send without your confirmation",
      "Ignore which are urgent",
    ],
    correct: 2,
    why: "It drafts; sending always needs your say-so.",
  },
  {
    question: "Opus compared with Sonnet is...",
    options: [
      "More thorough but slower and uses your limits faster",
      "Always better, so use it for everything",
      "Completely free",
      "For coding only",
    ],
    correct: 0,
    why: "Reserve Opus for genuinely complex tasks.",
  },
  {
    question: "To make a recurring weekly report effortless, combine...",
    options: ["A reusable template plus a scheduled task", "Opus plus a long chat", "Two laptops", "Nothing, just retype it"],
    correct: 0,
    why: "Template for structure, schedule so a draft is waiting.",
  },
]

const hard: LevelQuestion[] = [
  {
    question:
      "Cowork does not automatically carry memory across separate sessions. A good workaround is to...",
    options: [
      "Re-explain everything each time",
      "Always use Opus",
      "Ask Claude to keep and update a running log file in the folder, or use a Cowork project",
      "Screenshot every result",
    ],
    correct: 2,
    why: "A log file (or a Cowork project) preserves context between sessions.",
  },
  {
    question: "Even in the most permissive mode, which action still needs explicit confirmation?",
    options: [
      "Reading a file you connected",
      "Drafting text",
      "Showing its plan",
      "Sending an email, making a purchase or deleting files",
    ],
    correct: 3,
    why: "Sensitive actions are always gated, even in act-without-asking.",
  },
  {
    question: "The smartest way to run a 345-file job is to...",
    options: [
      "Send all 345 straight away",
      "Use the chat window instead",
      "Test on about 10 first, then run the full set",
      "Avoid folders entirely",
    ],
    correct: 2,
    why: "A small test catches misunderstandings cheaply.",
  },
  {
    question: "Which prompt best prevents Cowork from inventing detail in a plan?",
    options: [
      "“Make a plan”",
      "“Be creative with it”",
      "“Turn these notes into a plan and flag anything you had to guess”",
      "“Use Opus”",
    ],
    correct: 2,
    why: "Asking it to flag guesses surfaces ambiguity instead of fabrication.",
  },
  {
    question: "A teammate shares a plugin from an unknown GitHub repo. The right call is to...",
    options: [
      "Install it immediately",
      "Never use any plugin",
      "Email Anthropic for approval",
      "Only install from reputable sources and vet the author first",
    ],
    correct: 3,
    why: "Plugins carry instructions and connections, so trust the source.",
  },
  {
    question: "You want one consistent brand look applied to everything you build. Best approach?",
    options: [
      "Re-describe the brand each time",
      "Add a connector",
      "Switch to Claude Code",
      "Build it once, verify, save it as a skill, then invoke that skill",
    ],
    correct: 3,
    why: "A saved brand skill applies the look in one command.",
  },
  {
    question:
      "Why is “Write a one-page summary for our VP that leads with the recommendation” stronger than “Write a summary”?",
    options: [
      "It names the audience, the length and what to lead with",
      "It is simply longer",
      "It forces Opus",
      "There is no real difference",
    ],
    correct: 0,
    why: "Specifying output, audience and emphasis removes guesswork.",
  },
  {
    question: "Cowork keeps pulling the wrong Gmail messages. The best way to fix it is to...",
    options: [
      "Give up on the task",
      "Delete your inbox",
      "Switch to the Chat tab",
      "Work step by step, giving feedback and screenshots until it is right",
    ],
    correct: 3,
    why: "Iterating with real examples is how you debug behaviour.",
  },
  {
    question: "Which statement about projects is correct?",
    options: [
      "Cowork projects persist instructions, memory, files and connections across sessions",
      "Chat projects can run tasks on your files",
      "The two are identical",
      "Projects cannot hold instructions",
    ],
    correct: 0,
    why: "Persistence across sessions is the Cowork project's defining trait.",
  },
  {
    question: "You hit a usage limit mid heavy task on Pro. The likely contributor and fix are...",
    options: [
      "Sonnet caused it; switch to Opus",
      "The internet; reboot the router",
      "Nothing can help",
      "Opus burns limits faster; use Sonnet and test on a small batch first",
    ],
    correct: 3,
    why: "Opus is heavier on limits; Sonnet plus small tests conserves them.",
  },
  {
    question: "The single most overlooked setup step that makes it feel like 'nothing happens' is...",
    options: ["Not choosing a model", "Not paying the bill", "Not granting folder access", "Not using Chrome"],
    correct: 2,
    why: "Without a connected folder, the file features do nothing.",
  },
  {
    question: "The best use of a sub-agent inside a skill is to...",
    options: [
      "Slow the skill down",
      "Run independent parts of the work in parallel, each with its own context",
      "Send email on your behalf",
      "Store your files",
    ],
    correct: 1,
    why: "Sub-agents parallelise independent chunks in isolated context.",
  },
  {
    question: "When is plain Chat the better tool than Cowork?",
    options: [
      "Cross-app work on your files",
      "A quick factual question or pure thinking",
      "Building a deck from a folder",
      "Inbox triage across 72 hours",
    ],
    correct: 1,
    why: "For a quick answer with no files to touch, Chat is lighter.",
  },
  {
    question: "To let Cowork act on web pages, the correct enablement is...",
    options: [
      "The Claude in Chrome extension, toggled on",
      "Nothing is needed",
      "A printer driver",
      "Upgrading to Opus",
    ],
    correct: 0,
    why: "Web actions run through the Chrome extension.",
  },
  {
    question: 'A colleague says "Cowork cannot see my files, it is broken." The most likely truth is...',
    options: [
      "A genuine bug",
      "The wrong model is selected",
      "No folder has been connected yet",
      "They are on the free plan",
    ],
    correct: 2,
    why: "Almost always it is the missing folder connection.",
  },
  {
    question: "The best reason to keep reviewing Cowork's output is that...",
    options: [
      "It is slow",
      "It accelerates your work but does not replace your judgement, especially on numbers, names and money",
      "It is always wrong",
      "It wastes time otherwise",
    ],
    correct: 1,
    why: "You stay accountable for anything sent, published or acted on.",
  },
  {
    question: "A good habit for sharpening a long, fiddly Cowork prompt is to...",
    options: [
      "Shorten it at random",
      "Draft it in Chat, ask Claude to format it for Cowork, then paste it across",
      "Switch to Opus",
      "Add emojis",
    ],
    correct: 1,
    why: "Chat and Cowork pair well: think in one, do in the other.",
  },
  {
    question: "After turning 'apply our brand' into a skill, the next time you need it you...",
    options: [
      "Invoke one command to apply your colours and fonts",
      "Re-upload all the brand assets",
      "Email a designer",
      "Start the brand book again",
    ],
    correct: 0,
    why: "The skill replays the whole brand application on demand.",
  },
  {
    question: "Which permission state should a 'send email' action almost always sit in?",
    options: ["Always allow", "Needs approval", "Blocked forever", "Hidden from view"],
    correct: 1,
    why: "Outbound sends should require a human yes.",
  },
  {
    question: "The compounding payoff of Cowork is best described as...",
    options: [
      "Recurring gathering work moving into the background, so your focus goes to the work that needs you",
      "A one-off speed boost",
      "Cheaper licences",
      "Having fewer apps installed",
    ],
    correct: 0,
    why: "The habit compounds: routine prep happens for you over time.",
  },
]

export const quizLevels: QuizLevel[] = [
  {
    id: "easy",
    label: "Easy",
    tagline: "The essentials — what Cowork is and how to switch it on.",
    pass: 16,
    total: 20,
    accent: "#5fae8c",
    questions: easy,
  },
  {
    id: "medium",
    label: "Medium",
    tagline: "Real situations — prompts, permissions, skills and projects.",
    pass: 15,
    total: 20,
    accent: "#d99757",
    questions: medium,
  },
  {
    id: "hard",
    label: "Hard",
    tagline: "Judgement calls — edge cases, safety and compounding habits.",
    pass: 14,
    total: 20,
    accent: "#c96f4a",
    questions: hard,
  },
]

export function getLevel(id: string): QuizLevel | undefined {
  return quizLevels.find((l) => l.id === id)
}
