export const LoadingSpinner = ({ label }: { label: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full w-full min-h-[200px] bg-[var(--background)]">
      <div className="relative w-20 h-20">
        <div className="absolute w-full h-full border-4 rounded-full animate-pulse border-[var(--primary)] opacity-20"></div>
        <div className="absolute w-full h-full border-4 rounded-full animate-spin border-[var(--primary)] border-t-transparent"></div>
      </div>
      <div className="flex gap-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-3 w-3 rounded-full animate-bounce bg-[var(--primary)]"
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>
      <p className="text-lg font-medium text-[var(--muted-foreground)]">Loading {label}...</p>
    </div>
  );
};
