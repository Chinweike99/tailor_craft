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
import { Input } from "@/components/ui/_input";
import { useRouter } from "next/navigation";
// import { usePost } from "@/src/_hooks/useApi";
// import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/_select";
// import { DESIGN_CATEGORIES } from "@/src/config/constants";
import { useState } from "react";
import { Plus, X } from "lucide-react";
// import { useToast } from "@/src/_components/ui/use-toast";
import { AxiosError } from "axios";
import { useToast } from "@/components/ui/components/use-toast";
import { usePost } from "@/_utils/useApi";
import { Textarea } from "@/components/ui/_textarea";
import { DESIGN_CATEGORIES } from "@/_utils/constants";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.enum(["NATIVE", "CASUAL", "FORMAL"]),
  priceRange: z.object({
    min: z.number().min(0, "Minimum price must be at least 0"),
    max: z.number().min(0, "Maximum price must be at least 0"),
  }),
  minimumDeliveryTime: z.number().min(1, "Delivery time must be at least 1 day"),
  requiredMaterials: z.array(z.string()).min(1, "At least one material is required"),
  isActive: z.boolean(),
});

export default function NewDesignPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [images, setImages] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [newMaterial, setNewMaterial] = useState("");

  const { mutate: createDesign, isPending } = usePost<any, any>(
    ["designs"],
    "/design"
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "NATIVE",
      priceRange: {
        min: 0,
        max: 0,
      },
      minimumDeliveryTime: 7,
      requiredMaterials: [],
      isActive: true,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = {
      ...values,
      images,
      requiredMaterials: materials,
    };

    createDesign(payload, {
      onSuccess: () => {
        toast({
          title: "Design created",
          description: "The design has been created successfully",
        });
        router.push("/admin/designs");
      },
      // onError: (error: AxiosError) => {
      //         const message = (error.response?.data as { message?: string })?.message;
      //         form.setError("root", {
      //           message: message || "Login failed",
      //         });
      //       },
      onError: (error: AxiosError) => {
        toast({
          title: "Error",
          description:  "Design creation failed",
          variant: "destructive",
        });
      },
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload?upload_preset=${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        setImages((prev) => [...prev, data.secure_url]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    }
  };

  const addMaterial = () => {
    if (newMaterial.trim() && !materials.includes(newMaterial.trim())) {
      setMaterials((prev) => [...prev, newMaterial.trim()]);
      setNewMaterial("");
    }
  };

  const removeMaterial = (material: string) => {
    setMaterials((prev) => prev.filter((m) => m !== material));
  };

  const removeImage = (image: string) => {
    setImages((prev) => prev.filter((i) => i !== image));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">New Design</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Design title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(DESIGN_CATEGORIES).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the design..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <FormLabel>Price Range</FormLabel>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="priceRange.min"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Min price"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="priceRange.max"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Max price"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
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
              name="minimumDeliveryTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Delivery Time (days)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Delivery time"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <FormLabel>Images</FormLabel>
            <div className="flex flex-wrap gap-4">
              {images.map((image) => (
                <div key={image} className="relative">
                  <img
                    src={image}
                    alt="Design"
                    className="h-32 w-32 rounded-md object-cover"
                  />
                  <Button
                    type="button"
                    // variants="destructive"
                    // size="icon"
                    className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                    onClick={() => removeImage(image)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <label className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
                <Plus className="h-8 w-8 text-gray-500" />
                <span className="mt-2 text-sm text-gray-500">Add Image</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <FormLabel>Required Materials</FormLabel>
            <div className="flex flex-wrap gap-2">
              {materials.map((material) => (
                <div
                  key={material}
                  className="flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm"
                >
                  {material}
                  <button
                    type="button"
                    onClick={() => removeMaterial(material)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                placeholder="Add material"
                value={newMaterial}
                onChange={(e) => setNewMaterial(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addMaterial();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={addMaterial}>
                Add
              </Button>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Design"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}