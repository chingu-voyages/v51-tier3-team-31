import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { serverBaseUrl } from '../config';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface NewExpenseGroupFormModalProps {
  toggleModal: () => void;
}

export default function NewExpenseGroupFormModal({
  toggleModal,
}: NewExpenseGroupFormModalProps) {
  const { user } = useAuth();
  const { toast } = useToast();

  // Form validation schema
  const FormSchema = z.object({
    name: z.string().min(2, {
      message: 'Name must be at least 2 characters.',
    }),
    description: z.string().min(2, {
      message: 'Description must be at least 2 characters.',
    }),
    budget: z.number().min(0, { message: 'Budget must be at least 0' }),
    createdBy: z.number(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      description: '',
      budget: 0,
      createdBy: 0,
    },
  });

  const queryClient = useQueryClient();

  // Submit handler for the form
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const url = `${serverBaseUrl}/api/v1/expense-groups?user-id=${user?.id}`;
      await axios.post(url, data);
      toast({
        title: 'Success',
        description: 'Expense group created successfully!',
      });
      toggleModal();
    } catch (error) {
      console.error('Error creating expense group:', error);
      toast({
        title: 'Error',
        description: 'Failed to create the expense group. Try again later.',
      });
    }
  };

  // React Query mutation
  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof FormSchema>) => onSubmit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expense-groups'] });
    },
  });

  // Set createdBy field with user id when available
  useEffect(() => {
    if (user && user.id) {
      form.setValue('createdBy', Number(user.id));
    }
  }, [user, form]);

  return (
    <div
      className="bg-black/80 z-30 flex justify-center items-center min-h-screen fixed bottom-0 left-0 w-full"
      onClick={toggleModal}
    >
      <div
        className="bg-white p-5 md:p-7 relative max-w-md rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
            className="space-y-8"
          >
            <div className="absolute right-0 top-0 p-1 rounded-bl-md border-b-[1px] border-l-[1px]">
              <X
                className="cursor-pointer opacity-20"
                onClick={toggleModal}
              />
            </div>
            <h2 className="font-semibold text-center">
              Create a new expense group
            </h2>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Travel Rome"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Let's give a name to your expense group
                  </FormDescription>
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
                      placeholder="Epic Rome adventure, shared villa expenses, group gifts..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Add a fun description for your expense group
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem className='hidden' >
                  <FormLabel>Budget</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Add a budget to your expense group
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Creating...' : 'Create'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
