type AdminPageShellProps = {
  title: string;
  description?: string;
};

const AdminPageShell = ({ title, description }: AdminPageShellProps) => {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground">
        {description ?? "Страница в разработке."}
      </p>
    </div>
  );
};

export default AdminPageShell;
