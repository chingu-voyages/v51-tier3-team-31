import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { serverBaseUrl } from '../config';

interface NewExpenseGroupFormModalProps {
  getExpenseGroups: () => void;
  toggleModal: () => void;
}

export default function NewExpenseGroupFormModal({
  getExpenseGroups,
  toggleModal,
}: NewExpenseGroupFormModalProps) {
  const url = `${serverBaseUrl}/api/v1/expense-groups`;

  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    budget: 0,
    createdBy: 0,
  });

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    axios
      .post(url, formData)
      .then((res) => {
        console.log('Success!', res);

        // clear input fields
        setFormData({
          name: '',
          description: '',
          budget: 0,
          createdBy: 0,
        });

        getExpenseGroups();
        toggleModal();
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  // Update formData on mount to set createdBy to user.id
  useEffect(() => {
    if (user?.id) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        createdBy: Number(user.id),
      }));
    }
  }, [user?.id]);

  return (
    <div
      className="bg-black/80 flex justify-center items-center min-h-screen fixed bottom-0 left-0 w-full"
      onClick={toggleModal}
    >
      <div
        className="bg-gray-300 h-[200px] w-[290px] border border-indigo-900 shadow-md shadow-gray-600 relative cursor-pointer"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={handleSubmit}
          className="p-3 flex flex-col"
        >
          <label htmlFor="name">Expense group name</label>
          <input
            type="text"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            name="name"
            id="name"
          />
          <label htmlFor="isFriendly">Description</label>
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            name="description"
            id="description"
          />
          <button className="bg-indigo-900 text-gray-50 mt-2">Add</button>
        </form>
      </div>
    </div>
  );
}
