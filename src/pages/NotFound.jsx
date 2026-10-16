import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="px-6 py-24 md:px-12">
      <h1 className="text-5xl font-semibold">404 — Page not found</h1>
      <Link to="/" className="mt-6 inline-block text-[#D6FF63]">
        Back to home ↗
      </Link>
    </main>
  );
}
