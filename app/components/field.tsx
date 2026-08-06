export default function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-3.5">
      <label
        className="block text-xs uppercase font-semibold mb-1.5"
        style={{ letterSpacing: "0.5px", color: "#6B6B6B" }}
      >
        {label} <span style={{ color: "#B3261E" }}>*</span>
      </label>
      {children}
    </div>
  );
}
