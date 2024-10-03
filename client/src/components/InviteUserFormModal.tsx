import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { serverBaseUrl } from '../config';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
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

interface InviteUserFormModalProps {
  closeModal: () => void;
  expenseGroupId: number | undefined;
}

export default function InviteUserFormModal({
  closeModal,
  expenseGroupId,
}: InviteUserFormModalProps) {
  const url = `${serverBaseUrl}/api/v1/expense-groups/invite-participant`;

  const { user } = useAuth();
  const { toast } = useToast();

  /*   expenseGroupId,
  sentBy,
  invitedEmail, */

  const FormSchema = z.object({
    expenseGroupId: z.number(),
    sentBy: z.number(),
    invitedEmail: z.string().email({
      message: 'Please provide a valid email',
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      expenseGroupId: 0,
      sentBy: 0,
      invitedEmail: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Convert amount and categoryId to number explicitly
    const formData = {
      ...data,
      sentBy: Number(data.expenseGroupId),
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
        closeModal(); // Close the modal
      })
      .catch((error) => {
        console.error('Failed to add user:', error);
        toast({
          title: 'Failed to add user with the following values:',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-red-600 text-white p-4">
              <code className="text-white">
                {JSON.stringify(error, null, 2)}
              </code>
            </pre>
          ),
        });
      });
  }

  // Update formData on mount to set createdBy to user.id and expenseGroupId to expenseGroupId
  useEffect(() => {
    if (user && user.id) {
      form.setValue('sentBy', Number(user.id));
    }
    if (expenseGroupId) {
      form.setValue('expenseGroupId', Number(expenseGroupId));
    }
  }, [user, form, expenseGroupId]);

  return (
    <div
      className="bg-black/80 z-30 flex justify-center items-center min-h-screen absolute top-0 left-0 w-full"
      onClick={closeModal}
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
                onClick={closeModal}
              />
            </div>

            {/* Expense Name */}
            <FormField
              control={form.control}
              name="invitedEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invite a user with email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@doe.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Email of the user you wish to invite
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="w-full"
              type="submit"
            >
              Invite user
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
