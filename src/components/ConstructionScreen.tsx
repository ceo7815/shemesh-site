import Image from "next/image";
import { site } from "@/lib/site";

export function ConstructionScreen() {
  return (
    <main className="const-screen" aria-label="האתר בשיפוצים">
      <div className="const-sun" aria-hidden="true" />
      <div className="const-dust" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="const-tape const-tape-top" aria-hidden="true">
        <span>בשיפוצים · עד להודעה חדשה · בשיפוצים · עד להודעה חדשה · </span>
        <span>בשיפוצים · עד להודעה חדשה · בשיפוצים · עד להודעה חדשה · </span>
      </div>

      <div className="const-card">
        <span className="const-badge">עד להודעה חדשה</span>
        <div className="const-logo">
          <Image
            src="/logo-solid.png"
            alt={site.name}
            width={220}
            height={286}
            priority
          />
        </div>
        <h1>האתר בשיפוצים</h1>
        <p>אנחנו משדרגים את החוויה כרגע. נשוב לפעילות בהקדם — תודה על הסבלנות.</p>
        <span className="const-line" aria-hidden="true" />
        <p className="const-brand">{site.shortName} מימוש זכויות</p>
      </div>

      <div className="const-tape const-tape-bottom" aria-hidden="true">
        <span>בשיפוצים · עד להודעה חדשה · בשיפוצים · עד להודעה חדשה · </span>
        <span>בשיפוצים · עד להודעה חדשה · בשיפוצים · עד להודעה חדשה · </span>
      </div>
    </main>
  );
}
