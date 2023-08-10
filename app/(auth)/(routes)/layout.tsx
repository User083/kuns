const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <article className="flex items-center justify-center h-full">
      {children}
    </article>
  );
};

export default AuthLayout;
