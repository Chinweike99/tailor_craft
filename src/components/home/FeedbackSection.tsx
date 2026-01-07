'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import apiClient from '@/_utils/api';
import { toast } from 'react-toastify';
import { FeedbackFormData } from '@/types/types';
import { MessageSquare } from 'lucide-react';
import { SuccessModal } from '@/components/ui/Successmodal';

export default function FeedbackSection() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FeedbackFormData>();

    const onSubmit = async (data: FeedbackFormData) => {
        setIsSubmitting(true);
        try {
            await apiClient.post('/feedback', data);
            setIsSuccessModalOpen(true);
            reset();
        } catch (error: any) {
            console.error('Error sending feedback:', error);
            toast.error('Failed to send feedback. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex justify-center mb-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                            <MessageSquare className="h-6 w-6 text-primary" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold mb-3">We Value Your Feedback</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Share your thoughts, suggest features, or let us know how we can improve your experience.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8"
                >
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className='md:col-span-2'>
                                <Input
                                    label="Email"
                                    id="feedback-email"
                                    type="email"
                                    placeholder="your@email.com"
                                    error={errors.email}
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address',
                                        },
                                    })}
                                />
                            </div>
                        </div>

                        <div>
                            <TextArea
                                label="Your Feedback"
                                id="feedback-message"
                                placeholder="Tell us what you think..."
                                rows={4}
                                error={errors.message}
                                {...register('message', { required: 'Message is required' })}
                            />
                        </div>

                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full md:w-auto"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </div>
            <SuccessModal
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                title="Thank You!"
                message="We appreciate your feedback. It helps us improve our services for you."
            />
        </section>
    );
}
