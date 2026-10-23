import Stars from "./Stars";

export default function FeedbackView({ feedback }) {
  return (
    <div className="space-y-1 text-sm">
      <Stars value={feedback.rating} />
      {feedback.comment && <p className="text-gray-700">{feedback.comment}</p>}
    </div>
  );
}