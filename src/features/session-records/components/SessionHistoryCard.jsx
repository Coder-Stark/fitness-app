import { useState } from "react";
import { formatSlotTime } from "../../../shared/utils/formatters";
import FeedbackForm from "./FeedbackForm";
import FeedbackView from "./FeedbackView";
import TrainerNotesView from "./TrainerNotesView";

export default function SessionHistoryCard({ session, onSaved }) {
  const [editing, setEditing] = useState(false);

  const notes = session.record?.trainerNotes;
  const feedback = session.record?.customerFeedback;
  const showForm = !feedback || editing;

  function handleSaved() {
    setEditing(false);
    onSaved("Thanks! Your feedback was saved.");
  }

  return (
    <li className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
      <div>
        <p className="font-medium">{formatSlotTime(session.startTime)}</p>
        <p className="text-sm text-gray-500">
          {session.trainer?.name ?? "Trainer"} · {session.durationMinutes} minutes · {session.mode}{" "}
          session
        </p>
      </div>

      <section>
        <h3 className="mb-2 text-sm font-medium">What you did</h3>
        {notes ? (
          <TrainerNotesView notes={notes} />
        ) : (
          <p className="text-sm text-gray-500">Your trainer hasn't added session notes yet.</p>
        )}
      </section>

      <section>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-medium">Your feedback</h3>
          {feedback && !editing && (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="text-sm text-gray-500 underline"
            >
              Edit
            </button>
          )}
        </div>

        {showForm ? (
          <FeedbackForm
            bookingId={session.bookingId}
            initial={feedback}
            onSaved={handleSaved}
            onCancel={editing ? () => setEditing(false) : null}
          />
        ) : (
          <FeedbackView feedback={feedback} />
        )}
      </section>
    </li>
  );
}