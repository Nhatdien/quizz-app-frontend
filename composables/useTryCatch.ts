import { useToast } from "@/components/ui/toast/use-toast";

type ToastInfo = {
  title: string;
  description: string;
  variant: "success" | "destructive" | "warning" | "info" | "default";
};
export const useTryCatch = (toastInfo?: ToastInfo | undefined) => {
  const { toast } = useToast();

  const tryCatch = async (fn: () => Promise<any>) => {
    const response = null as Response | null;
    try {
      await fn();
      !toastInfo?.title
        ? toast({
            title: "Success",
            description: "Operation completed successfully",
            variant: "success",
          })
        : toast({
            title: toastInfo?.title,
            description: toastInfo?.description,
            variant: toastInfo?.variant,
          });
    } catch (error: any) {
      toast({
        title: `Error: ${error.message}`,
        description: "An error occurred",
        variant: "destructive",
      });

      console.error(error);
    }
  };

  return { tryCatch };
};
