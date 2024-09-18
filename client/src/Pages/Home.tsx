// src/Pages/Home.tsx

const Home = () => {


  return (
    <div className="flex min-h-screen items-center flex-col">
      <h1 className="text-2xl font-bold">Home page Page </h1>
      <span className="text-red-600"> protected </span>
      <h1>Your HARCODED expense groups</h1>
      <div className="flex flex-col gap-3 w-full justify-center items-center p-3">
        <div className="h-11 w-1/2 cursor-pointer text-white bg-black flex justify-center items-center">
          Comida
        </div>
        <div className="h-11 w-1/2 cursor-pointer text-white bg-black flex justify-center items-center">
          Travel
        </div>
      </div>
    </div>
  );
};

export default Home;
