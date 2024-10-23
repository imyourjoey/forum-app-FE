import IllusLoading from "../../assets/Illustrations/IllusLoading";
function Loading() {
  return (
    <>
      <div className="flex-grow flex flex-col items-center justify-center mt-20 md:mt-0">
        <IllusLoading width="50%" height="50%" />
        <div className="text-4xl font-bold ogg">Loading...</div>
      </div>
    </>
  );
}
export default Loading;
