import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { serverBaseUrl } from '../config';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Textarea } from '@/components/ui/textarea';
import { CircleCheck, X } from 'lucide-react';

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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Cloudinary } from '@cloudinary/url-gen';
import CloudinaryUploadWidget from './CloudinaryUploadWidget';

interface NewExpenseFormModalProps {
  toggleModal: () => void;
  expenseGroupId: number | undefined;
  categories: Category[];
}

export default function NewExpenseFormModal({
  toggleModal,
  expenseGroupId,
  categories,
}: NewExpenseFormModalProps) {
  const url = `${serverBaseUrl}/api/v1/expenses`;

  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [publicId, setPublicId] = useState('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [thumbnailURL, setThumbnailURL] = useState<string>('');
  const [imageUploadResponse, setImageUploadResponse] = useState<
    null | 'success'
  >(null);
  const [cloudName] = useState('djhmtvmzq');
  const [uploadPreset] = useState('z5g8jtym');

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    cropping: true, //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    // sources: [ "local", "url"], // restrict the upload sources to URL and local files
    // multiple: false,  //restrict upload to a single file
    folder: 'splitit_images', //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    // clientAllowedFormats: ['.png', 'jpg', 'jpeg', 'webp'],//restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
  });

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'djhmtvmzq',
    },
  });

  const myImage = cld.image(publicId);

  useEffect(() => {
    console.log('myImage: ', myImage);
    console.log('publicId: ', publicId);
  }, [myImage, publicId]);

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
    receiptURL: z.string(),
    receiptThumbnailURL: z.string(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      description: '',
      createdBy: 0,
      amount: '0',
      categoryId: '',
      expenseGroupId: 0,
      receiptURL: '',
      receiptThumbnailURL: '',
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    mutation.mutate(data);
  };

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof FormSchema>) => {
      const formData = {
        ...data,
        amount: Number(data.amount),
        categoryId: Number(data.categoryId),
      };

      return axios.post(url, formData);
    },
    onSuccess: () => {
      toggleModal();
      queryClient.invalidateQueries({ queryKey: ['expense-group'] });
    },
    onError: (error) => {
      console.error('Failed to create expense:', error);
    },
  });

  // Update formData on mount to set createdBy to user.id and expenseGroupId to expenseGroupId
  useEffect(() => {
    if (user && user.id) {
      form.setValue('createdBy', Number(user.id));
    }
    if (expenseGroupId) {
      form.setValue('expenseGroupId', Number(expenseGroupId));
    }
    if (categories[0].id) {
      const categoryIdNumber = categories[0].id;
      form.setValue('categoryId', categoryIdNumber.toString());
    }
  }, [user, form, expenseGroupId]);

  useEffect(() => {
    if (imageUrl || thumbnailURL) {
      form.setValue('receiptURL', imageUrl);
      form.setValue('receiptThumbnailURL', thumbnailURL);
    }
  }, [imageUrl, thumbnailURL]);

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
            <div className="flex items-center gap-3">
              <CloudinaryUploadWidget
                setImageUrl={setImageUrl}
                setThumbnailURL={setThumbnailURL}
                setResponse={setImageUploadResponse}
                uwConfig={uwConfig}
                setPublicId={setPublicId}
              />
              <div className="div text-green-600">
                {imageUploadResponse === 'success' && <CircleCheck size={28} />}
              </div>
            </div>

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
