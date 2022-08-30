export function FieldLabel({
  label,
  required = false,
}: {
  label: string;
  required?: boolean;
}) {
  return (
    <label className="label flex justify-start">
      {label}
      {required && <span className="text-red-600 pl-1">*</span>}
    </label>
  );
}
