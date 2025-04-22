"use client";

import { BookingFormData, ServiceCategory } from "@/types/types";
import React, { useState } from "react";
import { Controller, useForm } from  'react-hook-form'
import { motion } from "framer-motion"
import { CalendarIcon, UploadIcon } from "lucide-react";
import { Button } from "./ui/Button";
// import Image from "next/image";


const serviceCategories: {value: ServiceCategory; label: string}[] = [
    {value: "native", label: "Native"},
    {value: "corporate", label: "Corporate"},
    {value: "casual", label: "Casual"},
    {value: "sportswear", label: "Sportswear"},
    {value: "custom", label: "Custom Orders"},
];


export const BookingForm = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);


    const {
        register,
        handleSubmit,
        control,
        formState: {errors},
        watch
    } = useForm<BookingFormData>();

    const selectedCategory = watch('serviceType');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file){
            const reader = new FileReader();
            reader.onload = (e) => {
                if(e.target?.result){
                    setImagePreview(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data: BookingFormData) => {
        setSubmitting(true);
        await new Promise(resolve => setTimeout (resolve, 5000));
        console.log("Form data", data);
        // With backend, api calls is made here
        setSubmitting(false);

        //Show success
        alert("Booking submission was successfull")
    };

    const formAnimation = {
        hidden: {opacity: 0, y:20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    }

    const itemAnimation = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      };
  
      
      return (
        <motion.div
          className="w-full max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={formAnimation}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={itemAnimation}>
              {/* Personal Information */}
              <div className="space-y-4">
                <label className="block text-sm font-medium">
                  Full Name
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 p-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </label>
                
                <label className="block text-sm font-medium">
                  Email
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 p-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your email address"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </label>
                
                <label className="block text-sm font-medium">
                  Phone Number
                  <input
                    type="tel"
                    {...register('phone', { required: 'Phone number is required' })}
                    className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 p-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </label>
              </div>
              
              {/* Order Information */}
              <div className="space-y-4">
                <label className="block text-sm font-medium">
                  Type of Wear
                  <Controller
                    name="serviceType"
                    control={control}
                    rules={{ required: 'Please select a category' }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 p-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select a category</option>
                        {serviceCategories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  {errors.serviceType && (
                    <p className="text-red-500 text-sm mt-1">{errors.serviceType.message}</p>
                  )}
                </label>
                
                {selectedCategory && (
                  <label className="block text-sm font-medium">
                    Specific Style
                    <input
                      type="text"
                      {...register('specificStyle')}
                      className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 p-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Describe the style you want"
                    />
                  </label>
                )}
                
                <label className="block text-sm font-medium">
                  Preferred Completion Date
                  <div className="mt-1 relative">
                    <input
                      type="date"
                      {...register('preferredDate', { required: 'Date is required' })}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-700 p-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary pl-10"
                    />
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                  {errors.preferredDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.preferredDate.message}</p>
                  )}
                </label>
              </div>
            </motion.div>
            
            <motion.div
              className="space-y-4"
              variants={itemAnimation}
            >
              <h3 className="text-lg font-medium">Measurements</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Please provide your measurements in inches. Leave blank if not applicable.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <label className="block text-sm font-medium">
                  Neck
                  <input
                    type="number"
                    step="0.1"
                    {...register('measurements.neck')}
                    className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 p-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </label>
                
                <label className="block text-sm font-medium">
                  Chest
                  <input
                    type="number"
                    step="0.1"
                    {...register('measurements.chest')}
                    className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 p-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </label>
                
                <label className="block text-sm font-medium">
                  Waist
                  <input
                    type="number"
                    step="0.1"
                    {...register('measurements.waist')}
                    className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 p-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </label>
                
                <label className="block text-sm font-medium">
                  Hip
                  <input
                    type="number"
                    step="0.1"
                    {...register('measurements.hip')}
                    className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 p-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </label>
                
                <label className="block text-sm font-medium">
                  Shoulder
                  <input
                    type="number"
                    step="0.1"
                    {...register('measurements.shoulder')}
                    className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 p-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </label>
                
                <label className="block text-sm font-medium">
                  Sleeve
                  <input
                    type="number"
                    step="0.1"
                    {...register('measurements.sleeve')}
                    className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 p-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </label>
                
                <label className="block text-sm font-medium">
                  Inseam
                  <input
                    type="number"
                    step="0.1"
                    {...register('measurements.inseam')}
                    className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 p-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </label>
                
                <label className="block text-sm font-medium">
                  Height
                  <input
                    type="number"
                    step="0.1"
                    {...register('measurements.height')}
                    className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 p-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </label>
              </div>
              
              <label className="block text-sm font-medium">
                Other Measurements or Notes
                <textarea
                  {...register('measurements.other')}
                  rows={3}
                  className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 p-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Any additional measurements or notes about your fit preferences"
                />
              </label>
            </motion.div>
            
            <motion.div variants={itemAnimation}>
              <label className="block text-sm font-medium">
                Upload Inspiration Photo (optional)
                <div className="mt-1 flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadIcon className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG or JPEG (MAX. 5MB)
                      </p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                
                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Preview:</p>
                    <div className="relative h-40 w-40">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={imagePreview}
                        alt="Inspiration preview" 
                        className="h-full w-full object-cover rounded-md"
                      />
                    </div>
                  </div>
                )}
              </label>
            </motion.div>
            
            <motion.div variants={itemAnimation}>
              <label className="block text-sm font-medium">
                Additional Information
                <textarea
                  {...register('message')}
                  rows={4}
                  className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 p-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Any additional details or special requests for your order"
                />
              </label>
            </motion.div>
            
            <motion.div variants={itemAnimation} className="pt-4">
              <Button
                type="submit"
                isLoading={isSubmitting}
                size="lg"
                fullWidth
              >
                Submit Booking Request
              </Button>
            </motion.div>
          </form>
        </motion.div>
      );



}





