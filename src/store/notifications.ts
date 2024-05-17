import { defineStore } from "pinia";

export const useNotificationsStore = defineStore("notifications", {
  state: () => ({
    messages: [] as any[],
  }),
  actions: {
    addMessage(msg: any) {
      this.messages.push(msg);
    },
    addSuccess(text: string) {
      this.messages.push({ color: "success", text });
    },
    addWarning(text: string) {
      this.messages.push({ color: "warning", text });
    },
    addError(text: string) {
      this.messages.push({ color: "error", text });
    },
    addInfo(text: string) {
      this.messages.push({ color: "info", text });
    },
  },
});
