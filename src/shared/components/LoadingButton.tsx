export function LoadingButton({
  loading,
  children = "",
}: {
  loading: boolean;
  children: any;
}) {
  const LoadingComponent = () => {
    return (
      <>
        <span className="flex items-center">
          <span className="w-[10px] h-[10px] bg-[#3498db] rounded-full mx-2 animate-pulse-first delay-75"></span>
          <span className="w-[10px] h-[10px] bg-[#3498db] rounded-full mx-2 animate-pulse-second delay-75"></span>
          <span className="w-[10px] h-[10px] bg-[#3498db] rounded-full mx-2 animate-pulse-first delay-75"></span>
        </span>
      </>
    );
  };
  return (
    <span className="loading">{loading ? LoadingComponent() : children}</span>
  );
}
