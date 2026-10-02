import { useState } from "react";

import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  LockKeyhole,
  Mail,
  Phone,
  User,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa6";


const domains = [
  "Frontend Development",
  "Backend Development",
  "AI / Machine Learning",
  "App Development",
  "DevOps",
  "UI / UX Design",
];

const branches = [
  "Computer Science and Engineering",
  "Computer Science",
  "Information Technology",
  "CSE - AI/ML",
  "CSE - Data Science",
  "Electronics and Communication",
  "Electrical and Electronics",
  "Mechanical Engineering",
  "Civil Engineering",
  "Other",
];

const initialFormData = {
  fullName: "",
  email: "",
  phone: "",
  branch: "",
  year: "",
  domain: "",
  skills: "",
  linkedin: "",
  github: "",
  motivation: "",
  agreement: false,
};

function RegistrationForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Registration data:", formData);

    setIsSubmitted(true);
    setFormData(initialFormData);
  };

  if (isSubmitted) {
    return (
      <section
        id="registration-form"
        className="relative bg-[#010611] px-5 py-24 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-3xl rounded-[32px] border border-green-400/20 bg-green-400/[0.05] px-7 py-16 text-center shadow-[0_30px_100px_rgba(0,0,0,0.4)] sm:px-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-green-400/30 bg-green-400/10 text-green-400">
            <CheckCircle2 size={40} />
          </div>

          <p className="mt-7 text-sm font-black uppercase tracking-[0.22em] text-green-400">
            Application Received
          </p>

          <h2 className="mt-4 text-4xl font-black text-white sm:text-5xl">
            Welcome to the journey.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-400">
            Your application has been submitted successfully. The AWS Cloud
            Club team will review your information and contact you regarding
            the next stage.
          </p>

          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="mt-8 rounded-full bg-[#ff9900] px-7 py-3.5 font-black text-black transition hover:-translate-y-1 hover:bg-[#ffad32]"
          >
            Submit Another Application
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="registration-form"
      className="relative overflow-hidden bg-[#010611] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff9900]/[0.045] blur-[170px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-[#ff9900]/30 bg-[#ff9900]/10 px-5 py-2.5">
            <GraduationCap size={19} className="text-[#ff9900]" />

            <span className="text-xs font-black uppercase tracking-[0.22em] text-[#ffad32]">
              Registration Form
            </span>
          </div>

          <h2 className="mt-6 text-4xl font-black text-white sm:text-6xl">
            Join the <span className="text-[#ff9900]">Club</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-400">
            Fill in your details carefully to apply for AWS Cloud Club AKGEC.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="registration-form-panel mt-14 rounded-[32px] border border-[#ff9900]/30 bg-[#050b15]/95 p-6 shadow-[0_40px_120px_rgba(0,0,0,0.48)] sm:p-10 lg:p-12"
        >
          <div className="grid gap-7 md:grid-cols-2">
            <FormInput
              label="Full Name"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              icon={User}
              required
            />

            <FormInput
              label="College Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="yourname@akgec.ac.in"
              icon={Mail}
              required
            />

            <FormInput
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              icon={Phone}
              required
            />

            <FormSelect
              label="Branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              options={branches}
              placeholder="Select your branch"
              icon={GraduationCap}
              required
            />

            <FormSelect
              label="Current Year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              options={["1st Year", "2nd Year", "3rd Year", "4th Year"]}
              placeholder="Select your year"
              icon={CalendarDays}
              required
            />

            <FormSelect
              label="Preferred Domain"
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              options={domains}
              placeholder="Select your preferred domain"
              icon={GraduationCap}
              required
            />
          </div>

          <div className="mt-7">
            <FormInput
              label="Skills"
              name="skills"
              type="text"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Example: JavaScript, React, Python, AWS, Docker"
              icon={GraduationCap}
            />
          </div>

          <div className="mt-7 grid gap-7 md:grid-cols-2">
            <FormInput
              label="LinkedIn Profile"
              name="linkedin"
              type="url"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/your-profile"
              icon={FaLinkedinIn}
            />

            <FormInput
               label="GitHub Profile"
               name="github"
               type="url"
               value={formData.github}
               onChange={handleChange}
               placeholder="https://github.com/your-username"
               icon={FaGithub}
             />
          </div>

          <div className="mt-7">
            <label
              htmlFor="motivation"
              className="mb-3 block text-sm font-bold text-slate-200"
            >
              Why do you want to join AWS Cloud Club?
              <span className="ml-1 text-[#ff9900]">*</span>
            </label>

            <div className="registration-field min-h-[160px] items-start py-4">
              <User
                size={19}
                className="mt-1 shrink-0 text-slate-500"
              />

              <textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                maxLength={500}
                rows={5}
                required
                placeholder="Share your motivation, interests and what you hope to learn and contribute..."
                className="min-h-[120px] w-full resize-none bg-transparent text-sm leading-7 text-white outline-none placeholder:text-slate-600"
              />

              <span className="self-end whitespace-nowrap text-xs text-slate-600">
                {formData.motivation.length}/500
              </span>
            </div>
          </div>

          <label className="mt-7 flex cursor-pointer items-start gap-4">
            <input
              type="checkbox"
              name="agreement"
              checked={formData.agreement}
              onChange={handleChange}
              required
              className="mt-1 h-5 w-5 shrink-0 accent-[#ff9900]"
            />

            <span className="text-sm leading-6 text-slate-400">
              I confirm that the information provided is correct and agree to
              follow the AWS Cloud Club guidelines and code of conduct.
            </span>
          </label>

          <button
            type="submit"
            className="registration-submit group mt-9 flex w-full items-center justify-center gap-4 rounded-2xl bg-gradient-to-r from-[#f0441d] via-[#ff6b16] to-[#ffb000] px-8 py-5 text-lg font-black text-white shadow-[0_18px_50px_rgba(255,107,22,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(255,153,0,0.4)]"
          >
            Submit Application

            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50">
              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </button>

          <div className="mt-5 flex items-center justify-center gap-2 text-sm text-slate-500">
            <LockKeyhole size={16} />
            Your information is secure and will be kept confidential.
          </div>
        </form>
      </div>
    </section>
  );
}

function FormInput({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  icon: Icon,
  required = false,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-3 block text-sm font-bold text-slate-200"
      >
        {label}
        {required && <span className="ml-1 text-[#ff9900]">*</span>}
      </label>

      <div className="registration-field">
        <Icon size={19} className="shrink-0 text-slate-500" />

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
        />
      </div>
    </div>
  );
}

function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  icon: Icon,
  required = false,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-3 block text-sm font-bold text-slate-200"
      >
        {label}
        {required && <span className="ml-1 text-[#ff9900]">*</span>}
      </label>

      <div className="registration-field">
        <Icon size={19} className="shrink-0 text-slate-500" />

        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full cursor-pointer bg-transparent text-sm text-white outline-none"
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((option) => (
            <option key={option} value={option} className="bg-[#07101e]">
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default RegistrationForm;