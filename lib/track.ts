// Sends quiz activity to the tracking endpoint on claudecofounder.com, which
// forwards each event to George's Google Sheet via an Apps Script webhook.
// Tracking must never block or break the quiz for the learner, so failures are
// logged to the console rather than thrown.

export type QuizTrackEvent = {
  email: string
  name: string
  event: "quiz_started" | "quiz_passed" | "quiz_failed"
  level: string
  score?: number
  total?: number
}

const TRACK_ENDPOINT = "/api/quiz-track"

export function trackQuizEvent(payload: QuizTrackEvent): void {
  const body = JSON.stringify({ ...payload, page: window.location.href })
  fetch(TRACK_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  })
    .then(async (res) => {
      if (!res.ok) {
        const text = await res.text().catch(() => "")
        console.error(`quiz-track failed: HTTP ${res.status} ${text}`)
      }
    })
    .catch((err) => {
      console.error("quiz-track failed:", err)
    })
}
