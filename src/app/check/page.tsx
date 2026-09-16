import { CheckLanding } from "@/components/check/CheckLanding";
import { CHECK_LANDING_ENABLED } from "@/lib/checkLanding";

export default function CheckPage() {
  if (!CHECK_LANDING_ENABLED) {
    return (
      <>
        <meta httpEquiv="refresh" content="0;url=/" />
        <p className="sr-only">
          <a href="/">חזרה לדף הבית</a>
        </p>
      </>
    );
  }

  return <CheckLanding />;
}
