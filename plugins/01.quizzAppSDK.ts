import  QuizzAppSDK from "@/stores/quizzapp_sdk";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    const quizzAppSDK = QuizzAppSDK.getInstance({
        base_url: config.public.baseURL,
        ws_url: config.public.wsURL || "",
    });

    nuxtApp.provide('quizzAppSDK', QuizzAppSDK.getInstance());
    
});