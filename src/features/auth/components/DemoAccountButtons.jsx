import Button from "../../../shared/components/ui/Button";

const DEMO_PASSWORD = "Demo@1234";

const DEMO_ACCOUNTS = [
  { label: "Customer", email: "customer@demo.com" },
  { label: "Trainer", email: "trainer@demo.com" },
  { label: "Admin", email: "admin@demo.com" },
];

export default function DemoAccountButtons({ onSelect, disabled }) {
  return (
    <div className="mt-6">
      <p className="mb-2 text-center text-sm text-gray-500">Or try a demo account</p>
      <div className="grid grid-cols-3 gap-2">
        {DEMO_ACCOUNTS.map((account) => (
          <Button
            key={account.email}
            variant="secondary"
            disabled={disabled}
            onClick={() => onSelect({ email: account.email, password: DEMO_PASSWORD })}
          >
            {account.label}
          </Button>
        ))}
      </div>
    </div>
  );
}