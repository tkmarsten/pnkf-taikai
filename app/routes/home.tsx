import { Calendar, MapPin } from "lucide-react";
import SeminarForm from "../components/seminar-form";

export default function Home() {
  return (
    <div className="min-h-screen w-full px-5 py-8 pb-20 bg-background text-ink">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="relative overflow-hidden rounded-lg p-7 bg-panel border border-solid border-pnkf-gold border-t-32 border-t-pnkf-gold">
          <img src="/pnkf.png" className="w-50 m-auto" />
          <h1 className="my-2.5 leading-none tracking-wide text-[clamp(36px,7vw,60px)] text-center">
            Pacific Northwest Kendo Federation Kendo Seminar
          </h1>
          <div className="flex flex-col gap-2 text-base text-ink">
            <span className="flex items-center gap-1.5">
              <Calendar size={16} />
              <strong className="font-semibold text-inherit">
                October 31, 2026 (Saturday)
              </strong>
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={16} />
              <strong className="font-semibold text-inherit">
                Kent Commons Community Center
              </strong>
            </span>
            <p>
              This seminar will be led by Hiroshi Arima sensei (Kyoshi 8 Dan)
              and Ritsuko Yoshikawa sensei (7 Dan) from Kanagawa prefecture.
            </p>
          </div>
        </div>

        <SeminarForm />
      </div>
    </div>
  );
}
