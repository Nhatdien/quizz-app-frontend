import { createApp } from "vue";
import BrainIcon from "~/assets/icons/brain.vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("loading", {
    mounted(el, binding) {
      const instance = createApp(BrainIcon).mount(
        document.createElement("div")
      );
      if (binding.modifiers.fullscreen) {
        instance.$el.style.position = "fixed";
        instance.$el.style.top = "50%";
        instance.$el.style.left = "50%";
        instance.$el.style.transform = "translate(-50%, -50%)";
        instance.$el.style.zIndex = "9999";
        instance.$el.style.backgroundColor = "rgba(255, 255, 255, 0.8)"; // Optional: Add a background color
      }
      else{
        instance.$el.style.position = "absolute";
        instance.$el.style.top = "50%";
        instance.$el.style.left = "50%";
        instance.$el.style.transform = "translate(-50%, -50%)";
        instance.$el.style.zIndex = "9999";
        instance.$el.style.backgroundColor = "rgba(255, 255, 255, 0.8)"; // Optional: Add a background color
      }
      el.appendChild(instance.$el);
      el._loadingInstance = instance;
      if (!binding.value) {
        instance.$el.style.display = "none";
      }
    },

    updated(el, binding) {
      const instance = el._loadingInstance;
      if (instance) {
        instance.$el.style.display = binding.value ? "block" : "none";
      }
    },
  });
});
