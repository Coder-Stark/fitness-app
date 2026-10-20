import api from "../../../shared/api/axios";

export const fetchQuote = (slotStart) =>
  api.post("/pricing/quote", { slotStart }).then((res) => res.data.quote);