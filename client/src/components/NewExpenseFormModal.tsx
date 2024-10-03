import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { serverBaseUrl } from '../config';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';

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
import { Category } from '@/types/category';

interface NewExpenseFormModalProps {
  getExpenses: () => void;
  toggleModal: () => void;
  expenseGroupId: number | undefined;
  categories: Category[];
}

export default function NewExpenseFormModal({
  toggleModal,
  getExpenses,
  expenseGroupId,
  categories,
}: NewExpenseFormModalProps) {
  const url = `${serverBaseUrl}/api/v1/expenses`;

  const { user } = useAuth();
  const { toast } = useToast();

  const FormSchema = z.object({
    expenseGroupId: z.number(),
    name: z.string().min(2, {
      message: 'Name must be at least 2 characters.',
    }),
    description: z.string().min(2, {
      message: 'Description must be at least 2 characters.',
    }),
    categoryId: z.string(),
    amount: z.string(),
    createdBy: z.number(),
    receiptURL: z.string().min(2),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      description: '',
      createdBy: 0,
      amount: '0',
      categoryId: '1',
      expenseGroupId: 0,
      receiptURL: 'htps://test.test/test001',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Convert amount and categoryId to number explicitly
    const formData = {
      ...data,
      amount: Number(data.amount),
      categoryId: Number(data.categoryId),
    };

    axios
      .post(url, formData)
      .then(() => {
        toast({
          title: 'You have successfully submitted the following values:',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(formData, null, 2)}
              </code>
            </pre>
          ),
        });
        getExpenses(); // Refresh expenses after creation
        toggleModal(); // Close the modal
      })
      .catch((error) => {
        console.error('Failed to create expense:', error);
      });
  }

  // Update formData on mount to set createdBy to user.id and expenseGroupId to expenseGroupId
  useEffect(() => {
    if (user && user.id) {
      form.setValue('createdBy', Number(user.id));
    }
    if (expenseGroupId) {
      form.setValue('expenseGroupId', Number(expenseGroupId));
    }
  }, [user, form, expenseGroupId]);

  return (
    <div
      className="bg-black/80 z-30 flex justify-center items-center min-h-screen absolute top-0 left-0 w-full"
      onClick={toggleModal}
    >
      <div
        className="bg-white p-5 md:p-7 relative rounded-md w-full md:w-1/3 my-10 min-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="absolute right-0 top-0 p-1 rounded-bl-md border-b-[1px] border-l-[1px]">
              <X
                className="cursor-pointer opacity-20 "
                onClick={toggleModal}
              />
            </div>
            <h2 className="font-semibold text-center">Add Expense</h2>

            {/* Expense Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Expense Name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a name for this expense.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Expense Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description of the expense..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Add a brief description for this expense.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amount */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (Eur)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Expense amount"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the amount for the expense.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                      className="border rounded px-2 py-1 w-full"
                    >
                      <option
                        value=""
                        disabled
                      >
                        Select a category
                      </option>
                      {categories.map((category) => (
                        <option
                          key={category.id}
                          value={category.id}
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormDescription>
                    Specify the category for this expense.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Receipt URL */}
            <FormField
              control={form.control}
              name="receiptURL"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receipt URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="http://example.com/receipt"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Add a URL link to the receipt if available.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="w-full"
              type="submit"
            >
              Add Expense
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
