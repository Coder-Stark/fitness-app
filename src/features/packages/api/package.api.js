import api from "../../../shared/api/axios";

export const fetchPlans = () => api.get("/packages/plans").then((res) => res.data.plans);

export const fetchMyPackages = () => api.get("/packages/mine").then((res) => res.data);

export const purchasePackage = (planCode, idempotencyKey) =>
  api
    .post("/packages/purchase", { planCode }, { headers: { "Idempotency-Key": idempotencyKey } })
    .then((res) => res.data);