import { api } from "./client";

export interface SavingsMilestone {
  id: number;
  title: string;
  target_amount: number;
  reached: boolean;
  reached_at: string | null;
}

export interface SavingsGoal {
  id: number;
  name: string;
  target_amount: number;
  current_amount: number;
  currency: string;
  deadline: string | null;
  status: "ACTIVE" | "COMPLETED" | "PAUSED";
  created_at: string;
  milestones?: SavingsMilestone[];
}

export const savings = {
  list: () => api<SavingsGoal[]>("GET", "/savings"),

  get: (goalId: number) =>
    api<SavingsGoal>("GET", `/savings/${goalId}`),

  create: (data: {
    name: string;
    target_amount: number;
    currency?: string;
    deadline?: string;
    current_amount?: number;
  }) => api<{ id: number }>("POST", "/savings", { body: data }),

  update: (
    goalId: number,
    data: Partial<Omit<SavingsGoal, "id" | "created_at">>
  ) => api<{ message: string }>("PATCH", `/savings/${goalId}`, { body: data }),

  contribute: (goalId: number, amount: number) =>
    api<{ message: string; current_amount: number; status: string }>(
      "POST",
      `/savings/${goalId}/contribute`,
      { body: { amount } }
    ),

  delete: (goalId: number) =>
    api<{ message: string }>("DELETE", `/savings/${goalId}`),

  listMilestones: (goalId: number) =>
    api<SavingsMilestone[]>("GET", `/savings/${goalId}/milestones`),

  addMilestone: (
    goalId: number,
    data: { title: string; target_amount: number }
  ) =>
    api<{ id: number }>("POST", `/savings/${goalId}/milestones`, { body: data }),

  updateMilestone: (
    goalId: number,
    milestoneId: number,
    data: Partial<Pick<SavingsMilestone, "title" | "target_amount">>
  ) =>
    api<{ message: string }>(
      "PATCH",
      `/savings/${goalId}/milestones/${milestoneId}`,
      { body: data }
    ),

  deleteMilestone: (goalId: number, milestoneId: number) =>
    api<{ message: string }>(
      "DELETE",
      `/savings/${goalId}/milestones/${milestoneId}`
    ),
};
