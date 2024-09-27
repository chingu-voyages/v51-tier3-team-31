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

interface NewExpenseGroupFormModalProps {
  getExpenseGroups: () => void;
  toggleModal: () => void;
}

export default function NewExpenseGroupFormModal({
  toggleModal,
  getExpenseGroups,
}: NewExpenseGroupFormModalProps) {
  const url = `${serverBaseUrl}/api/v1/expense-groups`;

  const { user } = useAuth();
  const { toast } = useToast();

  const FormSchema = z.object({
    name: z.string().min(2, {
      message: 'Name must be at least 2 characters.',
    }),
    description: z.string().min(2, {
      message: 'Description must be at least 2 characters.',
    }),
    budget: z.number({
      message: 'Description must be at least 2 characters.',
    }),
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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    axios
      .post(url, data)
      .then(() => {
        toast({
          title: 'You have succesfully submitted the following values:',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          ),
        });
        getExpenseGroups(); // Refresh expense groups after creation
        toggleModal(); // Close the modal
      })
      .catch((error) => {
        console.error('Failed to create expense group:', error);
      });
  }

  // Update formData on mount to set createdBy to user.id
  useEffect(() => {
    if (user && user.id) {
      form.setValue('createdBy', Number(user.id));
    }
  }, [user, form]);

  return (
    <div
      className="bg-black/80 flex justify-center items-center min-h-screen fixed bottom-0 left-0 w-full"
      onClick={toggleModal}
    >
      <div
        className="bg-white p-5 md:p-7 relative max-w-md rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
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
                <FormItem className="hidden">
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
            >
              Create
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
