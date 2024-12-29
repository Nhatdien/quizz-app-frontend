export const useUpload = (uploadImage: File | null) => {
  const { $quizzAppSDK } = useNuxtApp();
  const submitUploadFile = async () => {
    if (uploadImage) {
      const res = (await $quizzAppSDK.uploadFile(
        uploadImage,
        "/upload/image"
      )) as Response;
      if (!res.body) {
        throw new Error("Response body is null");
      }
      const reader = res.body.getReader();
      const stream = new ReadableStream({
        async start(controller) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            controller.enqueue(value);
          }
          controller.close();
        },
      });
      const responseText = await new Response(stream).text();
      return responseText ? responseText : null;
    }
  };

    return { submitUploadFile };
};
