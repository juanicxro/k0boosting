import Link from "next/link";

export function SupportCard() {
  return (
    <div className="bg-card p-6 rounded-lg border border-border">
      <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
      <p className="text-muted-foreground mb-4">
        Our customer support team is available 24/7 to assist you with your
        order.
      </p>
      <Link
        href="#"
        className="inline-block bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded transition-colors"
      >
        Contact Support
      </Link>
    </div>
  );
}
