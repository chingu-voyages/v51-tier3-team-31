interface ReceiptModalPropType {
  imgUrl: string;
  closeModal: () => void;
}

const ReceiptModal = ({ imgUrl, closeModal }: ReceiptModalPropType) => {
  return (
    <div
      className="bg-black/80 z-30 flex justify-center items-center min-h-screen absolute top-0 left-0 w-full"
      onClick={closeModal}
    >
      <div
        className="max-w-full max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imgUrl}
          className="mx-auto"
          alt="receipt-image"
        />
      </div>
    </div>
  );
};

export default ReceiptModal;
