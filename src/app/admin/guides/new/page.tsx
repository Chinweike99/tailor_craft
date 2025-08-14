"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/_textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/_select";
import { AxiosError } from "axios";
import { useToast } from "@/components/ui/components/use-toast";
import { Input } from "@/components/ui/components/input";
import { usePost } from "@/_utils/useApi";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  type: z.string().min(2, "Type must be at least 2 characters"),
  resourceUrl: z.string().url("Invalid URL"),
});

export default function NewGuidePage() {
  const router = useRouter();
  const { toast } = useToast();

  const { mutate: createGuide, isPending } = usePost<any, any>(
    ["guides"],
    "/guide"
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "VIDEO",
      resourceUrl: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    createGuide(values, {
      onSuccess: () => {
        toast({
          title: "Guide created",
          description: "The guide has been created successfully",
        });
        router.push("/admin/guides");
      },
      onError: (error: AxiosError) => {
        return toast({
          title: "Error",
          description: "Guide creation failed",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">New Measurement Guide</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Guide title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the guide..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="VIDEO">Video</SelectItem>
                      <SelectItem value="DOCUMENT">Document</SelectItem>
                      <SelectItem value="IMAGE">Image</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="resourceUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resource URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/resource" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Guide"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}