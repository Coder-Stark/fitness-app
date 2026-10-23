import Spinner from "../../../shared/components/ui/Spinner";
import { useSessionRecord } from "../hooks/useSessionRecord";
import AssessmentCard from "./AssessmentCard";
import FeedbackView from "./FeedbackView";
import TrainerNotesForm from "./TrainerNotesForm";

export default function TrainerSessionPanel({ bookingId }) {
  const { data, error, setRecord } = useSessionRecord(bookingId);

  if (error) {
    return (
      <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
        {error}
      </p>
    );
  }
  if (!data) return <Spinner />;

  const { record, customerProfile, canSubmit } = data;

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
      {customerProfile !== undefined && <AssessmentCard profile={customerProfile} />}

      {record?.customerFeedback && (
        <div className="space-y-1">
          <h4 className="text-sm font-medium">Customer feedback</h4>
          <FeedbackView feedback={record.customerFeedback} />
        </div>
      )}

      {canSubmit ? (
        <TrainerNotesForm
          bookingId={bookingId}
          notes={record?.trainerNotes ?? null}
          onSaved={setRecord}
        />
      ) : (
        <p className="text-xs text-gray-500">
          You can add session notes once the session is complete.
        </p>
      )}
    </div>
  );
}