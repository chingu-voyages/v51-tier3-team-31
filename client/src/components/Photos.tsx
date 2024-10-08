import { Image } from 'lucide-react';
import AddBtn from './AddBtn';

const Photos = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-5 min-h-[50vh]">
      <div className="relative">
        <Image
          className="opacity-50"
          size={50}
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">No receipts uploaded</h2>
        <p className="text-gray-500 max-w-xs">
          Upload photos of your receipts to keep track of your expenses and make
          splitting bills easier
        </p>
      </div>

      <AddBtn
        text="Add receipt"
        toggleModal={() => console.log('Toggle modal')}
      />
    </div>
  );
};

export default Photos;
