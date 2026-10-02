import {
  CheckCircle2,
  ClipboardList,
  MessageSquareText,
  Users,
} from "lucide-react";

const processSteps = [
  {
    number: "01",
    title: "Apply",
    description: "Fill out and submit the registration form carefully.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Shortlisting",
    description: "The club team reviews all submitted applications.",
    icon: Users,
  },
  {
    number: "03",
    title: "Interaction",
    description: "Shortlisted students may be invited for an interaction.",
    icon: MessageSquareText,
  },
  {
    number: "04",
    title: "Onboarding",
    description: "Selected applicants become part of AWS Cloud Club AKGEC.",
    icon: CheckCircle2,
  },
];

function SelectionProcess() {
  return (
    <section className="relative bg-[#010611] px-5 pb-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="text-center">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#ff9900]">
            What Happens Next?
          </p>

          <h2 className="mt-4 text-4xl font-black text-white sm:text-5xl">
            Our Selection Process
          </h2>
        </div>

        <div className="relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-[12%] right-[12%] top-12 hidden border-t border-dashed border-[#ff9900]/30 lg:block" />

          {processSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.title}
                className="group relative z-10 rounded-[24px] border border-white/10 bg-white/[0.025] p-7 transition duration-300 hover:-translate-y-2 hover:border-[#ff9900]/35"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#ff9900]/35 bg-[#ff9900]/10 text-[#ff9900] shadow-[0_0_24px_rgba(255,153,0,0.12)]">
                    <Icon size={27} />
                  </div>

                  <span className="text-sm font-black text-slate-600">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-black text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {step.description}
                </p>

                {index < processSteps.length - 1 && (
                  <span className="absolute -right-4 top-11 hidden text-[#ff9900] lg:block">
                    →
                  </span>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SelectionProcess;