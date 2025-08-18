
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
import { useRouter, useSearchParams } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Upload, X, Package, CheckCircle } from "lucide-react";
import { format } from "date-fns";

import { useState, useEffect, useRef } from "react";
import { AxiosError } from "axios";
import { useGet, usePost } from "@/_utils/useApi";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/components/input";
import { Textarea } from "@/components/ui/_textarea";
import { cn } from "@/_utils/utils";
import { Calendar } from "@/components/ui/_calendar";
import { toast } from "react-toastify";
import TextArea from "@/components/ui/TextArea";
import Image from "next/image";
// import TextArea from "@/components/ui/TextArea";

const formSchema = z.object({
  designId: z.string().optional(),
  customDesign: z
    .object({
      title: z.string().min(2, "Title must be at least 2 characters"),
      description: z.string().min(10, "Description must be at least 10 characters"),
      images: z.array(z.string()).optional(),
    })
    .optional(),
  measurements: z.object({
    chest: z.string().min(1, "Chest measurement is required"),
    waist: z.string().min(1, "Waist measurement is required"),
    hips: z.string().min(1, "Hips measurement is required"),
    length: z.string().min(1, "Length measurement is required"),
  }),
  deliveryDate: z.date(
    "Delivery date is required",
  ),
  notes: z.string().nullish(),
}).refine((data) => {
  return data.designId || (data.customDesign && data.customDesign.title && data.customDesign.description);
}, {
  message: "Either select an existing design or provide custom design details",
  path: ["designId"],
});

type FormData = z.infer<typeof formSchema>;

interface Design {
  id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  priceRange: {
    min: number;
    max: number;
  };
  minimumDeliveryTime: number;
  isActive: boolean;
}

export default function NewBookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preSelectedDesignId = searchParams.get('designId');
  
  const [selectedTab, setSelectedTab] = useState<"existing" | "custom">(
    preSelectedDesignId ? "existing" : "existing"
  );
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedDesignDetails, setSelectedDesignDetails] = useState<Design | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const redirectTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current);
      }
    };
  }, []);

  const { data: designResponse } = useGet<{
    status: string;
    response: {
      data: Design[];
      meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
    };
  }>(
    ["designs"],
    "/design"
  );

  const designs = designResponse?.response?.data || [];
  const activeDesigns = designs.filter((design: Design) => design.isActive);

  const { mutate: createBooking, isPending } = usePost<any, any>(
    ["bookings"],
    "/booking"
  );

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      designId: preSelectedDesignId || undefined,
      customDesign: {
        title: "",
        description: "",
        images: [],
      },
      measurements: {
        chest: "",
        waist: "",
        hips: "",
        length: "",
      },
      deliveryDate: undefined,
      notes: "",
    },
  });

  useEffect(() => {
    if (preSelectedDesignId && activeDesigns.length > 0) {
      const selectedDesign = activeDesigns.find((design: Design) => design.id === preSelectedDesignId);
      if (selectedDesign) {
        form.setValue("designId", preSelectedDesignId);
        setSelectedDesignDetails(selectedDesign);
        setSelectedTab("existing");
      }
    }
  }, [preSelectedDesignId, activeDesigns, form]);

  const watchedDesignId = form.watch("designId");
  useEffect(() => {
    if (watchedDesignId && activeDesigns.length > 0) {
      const selectedDesign = activeDesigns.find((design: Design) => design.id === watchedDesignId);
      setSelectedDesignDetails(selectedDesign || null);
    } else {
      setSelectedDesignDetails(null);
    }
  }, [watchedDesignId, activeDesigns]);


  const onSubmit = async (values: FormData) => {
  try {
    const payload: any = {
      deliveryDate: values.deliveryDate.toISOString(),
      // Fix: Send undefined instead of null, or empty string
      notes: values.notes || undefined, // or values.notes || ""
      measurements: {
        chest: parseFloat(values.measurements.chest),
        waist: parseFloat(values.measurements.waist),
        hips: parseFloat(values.measurements.hips),
        length: parseFloat(values.measurements.length),
      },
    };

    if (selectedTab === "existing" && values.designId) {
      payload.designId = values.designId;
    } else if (selectedTab === "custom" && values.customDesign) {
      payload.customDesign = {
        title: values.customDesign.title,
        description: values.customDesign.description,
        images: uploadedImages,
      };
    }

    createBooking(payload, {
      // onSuccess: (data) => {
      onSuccess: () => {
        setShowSuccessModal(true);
        redirectTimerRef.current = setTimeout(() => {
          setShowSuccessModal(false);
          router.push('/client/bookings/booking');
        }, 4000);
      },
      onError: (error) => {
        let errorMessage = "An unexpected error occurred";
        if (error instanceof AxiosError) {
          errorMessage = error.message;
        }
        form.setError("root", {
          message: errorMessage,
        });
      }
    });
    
  } catch (error) {
    console.error("Submit error:", error);
    form.setError("root", {
      message: "An unexpected error occurred",
    });
  }
};




  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        return URL.createObjectURL(file);
      });

      const imageUrls = await Promise.all(uploadPromises);
      setUploadedImages(prev => [...prev, ...imageUrls]);
      form.setValue('customDesign.images', [...uploadedImages, ...imageUrls]);
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Failed to upload images");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    form.setValue('customDesign.images', newImages);
  };

  const handleTabChange = (tab: "existing" | "custom") => {
    setSelectedTab(tab);
    if (tab === "existing") {
      form.setValue("customDesign", { title: "", description: "", images: [] });
      setUploadedImages([]);
    } else {
      form.setValue("designId", undefined);
      setSelectedDesignDetails(null);
    }
    form.clearErrors();
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4 text-center">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mt-4">Booking Successful!</h2>
            <p className="text-gray-600 mt-2">Your booking has been created successfully.</p>
            <p className="text-gray-600 mt-2">Redirecting to bookings in 4 seconds...</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">New Booking</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {form.formState.errors.root && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {form.formState.errors.root.message}
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Design Selection Section */}
            <div className="space-y-4">
              <div className="flex space-x-4 mb-6">
                <Button
                  onClick={() => router.push("/client/designs")}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 cursor-pointer text-white"
                >
                  Browse Designs
                </Button>
                <Button
                  type="button"
                  onClick={() => handleTabChange("custom")}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 cursor-pointer text-white"
                >
                  Custom Design
                </Button>
              </div>

              {selectedTab === "existing" ? (
                <div className="space-y-4">
                  {selectedDesignDetails && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                      <div className="flex items-start space-x-4">
                        {selectedDesignDetails.images && selectedDesignDetails.images.length > 0 ? (
                          <Image
                            src={selectedDesignDetails.images[0]}
                            alt={selectedDesignDetails.title}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Package className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{selectedDesignDetails.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{selectedDesignDetails.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm font-medium text-green-600">
                              {formatPrice(selectedDesignDetails.priceRange.min)} - {formatPrice(selectedDesignDetails.priceRange.max)}
                            </span>
                            <span className="text-sm text-gray-500">
                              {selectedDesignDetails.minimumDeliveryTime} days delivery
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
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
                            placeholder="Describe your custom design in detail"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <FormLabel>Design Images (Optional)</FormLabel>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
                      <input
                        type="file"
                        id="images"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={isUploading}
                      />
                      <label
                        htmlFor="images"
                        className="flex flex-col items-center justify-center cursor-pointer"
                      >
                        <Upload className="w-6 h-6 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-600">
                          {isUploading ? "Uploading..." : "Click to upload images"}
                        </span>
                      </label>
                    </div>
                    
                    {uploadedImages.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {uploadedImages.map((image, index) => (
                          <div key={index} className="relative">
                            <Image
                              src={image}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-20 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Measurements and Details Section */}
            <div className="space-y-4">
              <div>
                <FormLabel className="text-lg font-semibold">Measurements (in inches)</FormLabel>
                <p className="text-sm text-gray-600 mb-4">Please provide accurate measurements for the best fit</p>
                
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="measurements.chest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chest</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 40"
                            type="number"
                            step="0.5"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="measurements.waist"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Waist</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 32"
                            type="number"
                            step="0.5"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="measurements.hips"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hips</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 38"
                            type="number"
                            step="0.5"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="measurements.length"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Length</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 30"
                            type="number"
                            step="0.5"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

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
                            className={cn(
                              "w-full pl-3 text-left font-normal text-gray-700 bg-white hover:bg-gray-50 border rounded-md",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a delivery date</span>
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
                          disabled={(date: Date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            
                            if (selectedDesignDetails) {
                              const minDeliveryDate = new Date(today);
                              minDeliveryDate.setDate(today.getDate() + selectedDesignDetails.minimumDeliveryTime);
                              return date < minDeliveryDate;
                            }
                            
                            return date < today;
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {selectedDesignDetails && (
                      <p className="text-xs text-gray-600">
                        Minimum delivery time: {selectedDesignDetails.minimumDeliveryTime} days
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <TextArea
                          placeholder="Any special instructions or requirements?"
                          rows={3}
                          {...field}
                          value={field.value ?? ''}
                          label=""
                        />
                      
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button
              type="button"
              onClick={() => router.back()}
              disabled={isPending}
              className="bg-red-500 text-white hover:bg-red-600 cursor-pointer"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isPending || isUploading}
              className= "border bg-gray-50 cursor-pointer text-black hover:bg-gray-50"
            >
              {isPending ? "Creating Booking..." : "Create Booking"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}