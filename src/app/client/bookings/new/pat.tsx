"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/_select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { useState } from "react";
import { AxiosError } from "axios";
import { useGet, usePost } from "@/_utils/useApi";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/components/input";
import { Textarea } from "@/components/ui/_textarea";
import { cn } from "@/_utils/utils";
import { Calendar } from "@/components/ui/_calendar";

const formSchema = z.object({
  designId: z.string().optional(),
  customDesign: z
    .object({
      title: z.string().min(2, "Title must be at least 2 characters"),
      description: z.string().min(10, "Description must be at least 10 characters"),
    })
    .optional(),
  measurements: z.record(z.string(), z.string()).refine(
    (data) => {
      return Object.keys(data).length > 0;
    },
    {
      message: "At least one measurement is required",
    }
  ),
  deliveryDate: z.date({
    error: "Delivery date is required",
  }),
  notes: z.string().optional(),
});

export default function NewBookingPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<"existing" | "custom">("existing");
  const [measurements, setMeasurements] = useState<Record<string, string>>({});

  const { data: designs, isLoading: isLoadingDesigns } = useGet<any[]>(
    ["designs"],
    "/design"
  );

  const { mutate: createBooking, isPending } = usePost<any, any>(
    ["bookings"],
    "/booking"
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      designId: "",
      customDesign: {
        title: "",
        description: "",
      },
      measurements: {},
      notes: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = {
      ...values,
      measurements: measurements,
    };

    createBooking(payload, {
      onSuccess: () => {
        router.push("/client/bookings");
      },
      onError: (error: AxiosError) => {
        const message = (error.response?.data as { message?: string })?.message;
        form.setError("root", {
          message: message || "Login failed",
        });
      },
    });
  };

  const addMeasurement = () => {
    setMeasurements((prev) => ({
      ...prev,
      [`measurement_${Object.keys(prev).length + 1}`]: "",
    }));
  };

  const updateMeasurement = (key: string, value: string) => {
    setMeasurements((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const removeMeasurement = (key: string) => {
    const newMeasurements = { ...measurements };
    delete newMeasurements[key];
    setMeasurements(newMeasurements);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">New Booking</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {form.formState.errors.root && (
            <div className="text-red-500 text-sm">
              {form.formState.errors.root.message}
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button
                  type="button"
                  // variant={selectedTab === "existing" ? "default" : "outline"}
                  onClick={() => setSelectedTab("existing")}
                >
                  Choose Existing Design
                </Button>
                <Button
                  type="button"
                  // variants={selectedTab === "custom" ? "default" : "outline"}
                  onClick={() => setSelectedTab("custom")}
                >
                  Custom Design
                </Button>
              </div>

              {selectedTab === "existing" ? (
                <FormField
                  control={form.control}
                  name="designId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Design</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a design" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {isLoadingDesigns ? (
                            <div className="p-2 text-center">Loading...</div>
                          ) : designs && designs.length > 0 ? (
                            designs.map((design) => (
                              <SelectItem key={design.id} value={design.id}>
                                {design.title}
                              </SelectItem>
                            ))
                          ) : (
                            <div className="p-2 text-center">No designs found</div>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <>
                  <FormField
                    control={form.control}
                    name="customDesign.title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Design Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter design title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="customDesign.description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Design Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your custom design"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel>Measurements</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addMeasurement}
                >
                  Add Measurement
                </Button>
              </div>

              {Object.keys(measurements).length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  No measurements added yet
                </div>
              ) : (
                <div className="space-y-2">
                  {Object.entries(measurements).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Input
                        placeholder="Measurement name"
                        value={key}
                        onChange={(e) => {
                          const newMeasurements = { ...measurements };
                          delete newMeasurements[key];
                          newMeasurements[e.target.value] = value;
                          setMeasurements(newMeasurements);
                        }}
                      />
                      <Input
                        placeholder="Value"
                        value={value}
                        onChange={(e) =>
                          updateMeasurement(key, e.target.value)
                        }
                      />
                      <Button
                        type="button"
                        // variant="destructive"
                        size="sm"
                        onClick={() => removeMeasurement(key)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="deliveryDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Delivery Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: Date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any special instructions?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Booking"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}