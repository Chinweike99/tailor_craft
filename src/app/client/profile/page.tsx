
// "use client";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { useRef, useState } from "react";
// // import { useToast } from "@/src/_components/ui/use-toast";
// import { Loader2 } from "lucide-react";
// import { useAuthStore } from "@/store/authstore";
// import { useGet, usePatch } from "@/_utils/useApi";
// import { Button } from "@/components/ui/Button";
// import { Input } from "@/components/ui/components/input";
// import { Textarea } from "@/components/ui/_textarea";
// import { useToast } from "@/components/ui/components/use-toast";


// const profileFormSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   email: z.string().email("Invalid email address"),
//   phone: z.string().min(10, "Phone must be at least 10 characters"),
//   bio: z.string().optional(),
//   address: z.object({
//     street: z.string().min(2, "Street must be at least 2 characters"),
//     city: z.string().min(2, "City must be at least 2 characters"),
//     state: z.string().min(2, "State must be at least 2 characters"),
//     country: z.string().min(2, "Country must be at least 2 characters"),
//     postalCode: z.string().min(2, "Postal code must be at least 2 characters"),
//   }),
//   preferredPickupAddress: z.object({
//     street: z.string().min(2, "Street must be at least 2 characters"),
//     city: z.string().min(2, "City must be at least 2 characters"),
//     state: z.string().min(2, "State must be at least 2 characters"),
//     country: z.string().min(2, "Country must be at least 2 characters"),
//     postalCode: z.string().min(2, "Postal code must be at least 2 characters"),
//   }),
// });

// export default function ProfilePage() {
//   const { user, setUser } = useAuthStore();
//   const { toast } = useToast();
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isUploading, setIsUploading] = useState(false);

//   const { data: profile, isLoading } = useGet<any>(
//     ["profile"],
//     "/profile",
//     !!user
//   );

//   const { mutate: updateProfile, isPending } = usePatch<any, any>(
//     ["profile"],
//     "/profile"
//   );

//   const form = useForm<z.infer<typeof profileFormSchema>>({
//     resolver: zodResolver(profileFormSchema),
//     defaultValues: {
//       name: user?.name || "",
//       email: user?.email || "",
//       phone: user?.phone || "",
//       bio: profile?.bio || "",
//       address: {
//         street: profile?.address?.street || "",
//         city: profile?.address?.city || "",
//         state: profile?.address?.state || "",
//         country: profile?.address?.country || "",
//         postalCode: profile?.address?.postalCode || "",
//       },
//       preferredPickupAddress: {
//         street: profile?.preferredPickupAddress?.street || "",
//         city: profile?.preferredPickupAddress?.city || "",
//         state: profile?.preferredPickupAddress?.state || "",
//         country: profile?.preferredPickupAddress?.country || "",
//         postalCode: profile?.preferredPickupAddress?.postalCode || "",
//       },
//     },
//   });

//   const onSubmit = async (values: z.infer<typeof profileFormSchema>) => {
//     updateProfile(values, {
//       onSuccess: (data) => {
//         setUser(data);
//         toast({
//           title: "Profile updated",
//           description: "Your profile has been updated successfully",
//         });
//       },
//     });
//   };

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setIsUploading(true);
//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload?upload_preset=${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await response.json();
//       if (data.secure_url) {
//         // Update profile with new image URL
//         updateProfile({ profileImage: data.secure_url }, {
//           onSuccess: (updatedProfile) => {
//             setUser(updatedProfile);
//             toast({
//               title: "Profile image updated",
//               description: "Your profile image has been updated successfully",
//             });
//           },
//         });
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to upload image",
//         variant: "destructive",
//       });
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">Profile</h1>
//       </div>

//       <div className="flex flex-col md:flex-row gap-6">
//         <div className="w-full md:w-1/3 space-y-4">
//           <div className="flex flex-col items-center space-y-4">
//             <Avatar className="h-32 w-32">
//               <AvatarImage src={user?.profileImage} />
//               <AvatarFallback>
//                 {user?.name
//                   ?.split(" ")
//                   .map((n) => n[0])
//                   .join("")}
//               </AvatarFallback>
//             </Avatar>
//             <input
//               type="file"
//               ref={fileInputRef}
//               onChange={handleImageUpload}
//               accept="image/*"
//               className="hidden"
//             />
//             <Button
//               variant="outline"
//               onClick={() => fileInputRef.current?.click()}
//               disabled={isUploading}
//             >
//               {isUploading ? (
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               ) : null}
//               {isUploading ? "Uploading..." : "Change Photo"}
//             </Button>
//           </div>
//         </div>

//         <div className="w-full md:w-2/3">
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//               <div className="grid gap-4 md:grid-cols-2">
//                 <FormField
//                   control={form.control}
//                   name="name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Full Name</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Your name" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email</FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="Your email"
//                           {...field}
//                           disabled
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="phone"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Phone</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Your phone" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="bio"
//                   render={({ field }) => (
//                     <FormItem className="md:col-span-2">
//                       <FormLabel>Bio</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           placeholder="Tell us about yourself"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <div className="space-y-4">
//                 <h3 className="text-lg font-medium">Residential Address</h3>
//                 <div className="grid gap-4 md:grid-cols-2">
//                   <FormField
//                     control={form.control}
//                     name="address.street"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Street</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Street address" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="address.city"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>City</FormLabel>
//                         <FormControl>
//                           <Input placeholder="City" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="address.state"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>State</FormLabel>
//                         <FormControl>
//                           <Input placeholder="State" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="address.country"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Country</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Country" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="address.postalCode"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Postal Code</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Postal code" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <h3 className="text-lg font-medium">Preferred Pickup Address</h3>
//                 <div className="grid gap-4 md:grid-cols-2">
//                   <FormField
//                     control={form.control}
//                     name="preferredPickupAddress.street"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Street</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Street address" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="preferredPickupAddress.city"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>City</FormLabel>
//                         <FormControl>
//                           <Input placeholder="City" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="preferredPickupAddress.state"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>State</FormLabel>
//                         <FormControl>
//                           <Input placeholder="State" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="preferredPickupAddress.country"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Country</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Country" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="preferredPickupAddress.postalCode"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Postal Code</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Postal code" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>

//               <div className="flex justify-end">
//                 <Button type="submit" disabled={isPending}>
//                   {isPending ? "Saving..." : "Save Changes"}
//                 </Button>
//               </div>
//             </form>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// }




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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/_card";
import { Badge } from "@/components/ui/badge";
import { useRef, useState, useEffect } from "react";
import { Loader2, Edit, Camera, MapPin, Phone, Mail, User, Home } from "lucide-react";
import { useAuthStore } from "@/store/authstore";
import { useGet, usePatch, useUploadFile } from "@/_utils/useApi";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/components/input";
import { Textarea } from "@/components/ui/_textarea";
import { useToast } from "@/components/ui/components/use-toast";
import { Separator } from "@/components/ui/separator";

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 characters"),
  bio: z.string().optional(),
  address: z.object({
    street: z.string().min(2, "Street must be at least 2 characters"),
    city: z.string().min(2, "City must be at least 2 characters"),
    state: z.string().min(2, "State must be at least 2 characters"),
    country: z.string().min(2, "Country must be at least 2 characters"),
    postalCode: z.string().min(2, "Postal code must be at least 2 characters"),
  }),
  preferredPickupAddress: z.object({
    street: z.string().min(2, "Street must be at least 2 characters"),
    city: z.string().min(2, "City must be at least 2 characters"),
    state: z.string().min(2, "State must be at least 2 characters"),
    country: z.string().min(2, "Country must be at least 2 characters"),
    postalCode: z.string().min(2, "Postal code must be at least 2 characters"),
  }),
});

export default function ProfilePage() {
  const { user, setUser } = useAuthStore();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: profileData, isLoading, refetch } = useGet<any>(
    ["profile"],
    "/profile",
    !!user
  );

  // console.log("User Profile", profile)
  const profile = profileData?.response
  const { mutate: updateProfile, isPending } = usePatch<any, any>(
    ["profile"],
    "/profile"
  );

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      bio: "",
      address: {
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
      },
      preferredPickupAddress: {
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
      },
    },
  });

  // Update form values when profile data changes
  useEffect(() => {
    if (profile || user) {
      const currentData = {
        // Prioritize profile data over user data, but fallback to user data
        name: user?.name || profile?.name || "",
        email: user?.email || profile?.email || "",
        phone: profile?.phone || user?.phone || "",
        bio: profile?.bio || "",
        address: {
          street: profile?.address?.street || "",
          city: profile?.address?.city || "",
          state: profile?.address?.state || "",
          country: profile?.address?.country || "",
          postalCode: profile?.address?.postalCode || "",
        },
        preferredPickupAddress: {
          street: profile?.preferredPickupAddress?.street || "",
          city: profile?.preferredPickupAddress?.city || "",
          state: profile?.preferredPickupAddress?.state || "",
          country: profile?.preferredPickupAddress?.country || "",
          postalCode: profile?.preferredPickupAddress?.postalCode || "",
        },
      };
      
      form.reset(currentData);
    }
  }, [profile, user, form]);

  const onSubmit = async (values: z.infer<typeof profileFormSchema>) => {
    updateProfile(values, {
      onSuccess: (data) => {
        // Update both user store and refetch profile data
        setUser({ ...user, ...data });
        refetch(); // Refetch to ensure we have the latest data
        setIsModalOpen(false);
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Update failed",
          description: error?.response?.data?.message || "Failed to update profile",
          variant: "destructive",
        });
      },
    });
  };

 const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    toast({
      title: "File too large",
      description: "Please select an image smaller than 5MB",
      variant: "destructive",
    });
    return;
  }

  if (!file.type.startsWith('image/')) {
    toast({
      title: "Invalid file type",
      description: "Please select a valid image file",
      variant: "destructive",
    });
    return;
  }

  if (!user) {
    toast({
      title: "Authentication Error",
      description: "Please log in to upload profile image",
      variant: "destructive",
    });
    return;
  }

  setIsUploading(true);
  
  try {
    const formData = new FormData();
    formData.append("image", file);

    const { token } = useAuthStore.getState();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1"}/profile/upload`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        // Don't set Content-Type - let browser set it for FormData
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();    
    if (data.profileImage) {      
      const updatedUser = { 
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isVerified: user.isVerified,
        profileImage: data.profileImage
      };
      
      setUser(updatedUser);
      refetch();
      
      toast({
        title: "Profile image updated",
        description: "Your profile image has been updated successfully",
      });
    } else {
      throw new Error('No profile image URL returned from server');
    }
    
  } catch (error: any) {    
    let errorMessage = "Failed to upload image. Please try again.";
    if (error.message) {
      errorMessage = error.message;
    }
    
    toast({
      title: "Upload failed",
      description: errorMessage,
      variant: "destructive",
    });
  } finally {
    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }
}

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Merge user and profile data, prioritizing the most recent/complete data
  const displayProfile = {
    ...user,
    ...profile,
    // Ensure profileImage comes from the most recent source
    profileImage: profile?.profileImage || user?.profileImage,
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account information</p>
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 cursor-pointer text-white">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Update your profile information below. All changes will be saved to your account.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your email address"
                            {...field}
                            disabled
                            className="bg-gray-50"
                          />
                        </FormControl>
                        <FormMessage />
                        <p className="text-xs text-gray-500">Email cannot be changed</p>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about yourself (optional)"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Home className="w-5 h-5 mr-2" />
                    Residential Address *
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="address.street"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your street address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter city" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State/Province</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter state" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter country" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter postal code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Preferred Pickup Address *
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="preferredPickupAddress.street"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter pickup street address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="preferredPickupAddress.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter pickup city" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="preferredPickupAddress.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State/Province</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter pickup state" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="preferredPickupAddress.country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter pickup country" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="preferredPickupAddress.postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter pickup postal code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <DialogFooter className="gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    className="text-white hover:text-gray-700 hover:bg-gray-100 bg-red-500"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isPending} className="bg-white border text-black hover:bg-gray-50">
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Overview Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center pb-4">
            <div className="relative mx-auto">
              <Avatar className="h-32 w-32 mx-auto border-4 border-white shadow-lg">
                <AvatarImage src={displayProfile?.profileImage} alt={displayProfile?.name} />
                <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {displayProfile?.name
                    ?.split(" ")
                    .map((n: any) => n[0])
                    .join("") || "U"}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-2 rounded-full shadow-lg transition-colors"
                title="Change profile picture"
              >
                {isUploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Camera className="h-4 w-4" />
                )}
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/jpeg,image/png,image/gif,image/webp"
                className="hidden"
              />
            </div>
            <CardTitle className="mt-4">{displayProfile?.name || "No Name"}</CardTitle>
            <CardDescription className="text-sm">
              {displayProfile?.bio || "No bio available"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3 text-sm">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="truncate">{displayProfile?.email || "No email"}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>{displayProfile?.phone || "No phone"}</span>
            </div>
          </CardContent>
        </Card>

        {/* Address Information Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Residential Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Home className="w-5 h-5 mr-2 text-blue-600" />
                Residential Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              {displayProfile?.address?.street ? (
                <div className="space-y-2 text-sm">
                  <p className="font-medium">{displayProfile.address.street}</p>
                  <p>{displayProfile.address.city}, {displayProfile.address.state}</p>
                  <p>{displayProfile.address.country} - {displayProfile.address.postalCode}</p>
                </div>
              ) : (
                <p className="text-gray-500 italic">No residential address provided</p>
              )}
            </CardContent>
          </Card>

          {/* Preferred Pickup Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-green-600" />
                Preferred Pickup Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              {displayProfile?.preferredPickupAddress?.street ? (
                <div className="space-y-2 text-sm">
                  <p className="font-medium">{displayProfile.preferredPickupAddress.street}</p>
                  <p>{displayProfile.preferredPickupAddress.city}, {displayProfile.preferredPickupAddress.state}</p>
                  <p>{displayProfile.preferredPickupAddress.country} - {displayProfile.preferredPickupAddress.postalCode}</p>
                </div>
              ) : (
                <p className="text-gray-500 italic">No pickup address provided</p>
              )}
            </CardContent>
          </Card>

          {/* Account Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-purple-600" />
                Account Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Active
                </Badge>
                <Badge variant="outline">
                  Member since {new Date().getFullYear()}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function setImages(arg0: (prev: any) => any[]) {
  throw new Error("Function not implemented.");
}
