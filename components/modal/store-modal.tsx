"use client";

import { Modal } from "@/components/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Store name must be at least 3 characters long" }),
  
});

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
try {
setIsLoading(true)
const response = await axios.post("/api/stores", values)
toast.success("Store created");
window.location.assign(`/${response.data.id}`);
// console.log(response)
} catch (error) {
  // console.log(error)
toast.error("Something went wrong");
  
} finally{
  setIsLoading(false)
} };

  return (
    <Modal
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
      title="Create a new store"
      description="Add a new store to manage product and categories"
    >
      <div className="">
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        {...field}
                        placeholder="Store name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            

              <div className="pt-6 space-x-2 flex justify-end w-full">
                <Button
                  type="button"
                  disabled={isLoading}
                  variant={"outline"}
                  size={"sm"}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} size={"sm"}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
