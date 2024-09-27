import { CirclePlus } from 'lucide-react';

interface AddBtnProps {
  toggleModal: () => void;
  text: string;
}

export default function AddBtn({ toggleModal, text }: AddBtnProps) {
  return (
    <div
      onClick={toggleModal}
      className="flex flex-col items-center"
    >
      <CirclePlus
        size={42}
        className="cursor-pointer text-neutral-800 hover:text-black"
      />
      <p className="text-neutral-800">{text}</p>
    </div>
  );
}
