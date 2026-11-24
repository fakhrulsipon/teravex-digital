"use client";

import { useSearchParams } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

type Errors = Partial<Record<keyof FormValues, string>>;

const NOT_SURE = "not-sure";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s-]{6,20}$/;

function validate(v: FormValues): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.phone.trim() && !PHONE_RE.test(v.phone.trim())) e.phone = "Please enter a valid phone number.";
  if (!v.service) e.service = "Please choose a service.";
  if (v.message.trim().length < 10) e.message = "Please write a few words about your project.";
  else if (v.message.length > 2000) e.message = "Please keep your message under 2000 characters.";
  return e;
}

function initialService(param: string | null): string {
  return param && services.some((s) => s.slug === param) ? param : "";
}

const fieldClass =
  "h-12 rounded-xl border-input bg-white px-4 text-base shadow-none focus-visible:border-brand-500 focus-visible:ring-brand-500/20 md:text-sm";

/**
 * Front-end only contact form: validates input and shows a success state.
 * There is no backend — connect `onSubmit` to an email service / API later (see blog.md).
 */
export function ContactForm() {
  const searchParams = useSearchParams();
  const uid = useId();
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: initialService(searchParams.get("service")),
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const set = (key: keyof FormValues, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key]) setErrors(validate(next));
  };
  const blur = (key: keyof FormValues) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(values));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, phone: true, service: true, message: true });
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      toast.error("Please check the fields marked in red.");
      return;
    }
    setStatus("submitting");
    // Simulated request — replace with a real API / form service integration.
    await new Promise((r) => setTimeout(r, 1100));
    setStatus("success");
    toast.success("Thank you! We got your message.");
  }

  function reset() {
    setValues({ name: "", email: "", phone: "", company: "", service: "", message: "" });
    setErrors({});
    setTouched({});
    setStatus("idle");
  }

  const err = (k: keyof FormValues) => (touched[k] ? errors[k] : undefined);
  const describedBy = (k: keyof FormValues) => (err(k) ? `${uid}-${k}-error` : undefined);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-white p-6 shadow-lift sm:p-9">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[28rem] flex-col items-center justify-center text-center"
            role="status"
          >
            <span className="grid size-18 place-items-center rounded-full bg-linear-to-br from-brand-600 to-cyan-500 text-white shadow-glow">
              <CheckCircle2 className="size-9" aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-2xl font-extrabold text-navy-950">Thank you, {values.name.split(" ")[0]}!</h3>
            <p className="mt-3 max-w-sm text-slate-600">
              We got your message and will reply soon at{" "}
              <span className="font-semibold text-navy-950">{values.email}</span>.
            </p>
            <Button variant="soft" size="xl" className="mt-8" onClick={reset}>
              Send another message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            noValidate
            aria-describedby={`${uid}-required-note`}
          >
            <h2 className="text-2xl font-extrabold text-navy-950 sm:text-3xl">Tell us about your project</h2>
            <p id={`${uid}-required-note`} className="mt-2 text-sm text-muted-foreground">
              Fields marked <span className="text-destructive">*</span> are required.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field id={`${uid}-name`} label="Full name" required error={err("name")}>
                <Input
                  id={`${uid}-name`}
                  name="name"
                  autoComplete="name"
                  placeholder="Your name"
                  value={values.name}
                  onChange={(e) => set("name", e.target.value)}
                  onBlur={() => blur("name")}
                  aria-invalid={Boolean(err("name"))}
                  aria-describedby={describedBy("name")}
                  className={fieldClass}
                />
              </Field>
              <Field id={`${uid}-email`} label="Email address" required error={err("email")}>
                <Input
                  id={`${uid}-email`}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={values.email}
                  onChange={(e) => set("email", e.target.value)}
                  onBlur={() => blur("email")}
                  aria-invalid={Boolean(err("email"))}
                  aria-describedby={describedBy("email")}
                  className={fieldClass}
                />
              </Field>
              <Field id={`${uid}-phone`} label="Phone / WhatsApp" hint="Optional" error={err("phone")}>
                <Input
                  id={`${uid}-phone`}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+974 …"
                  value={values.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  onBlur={() => blur("phone")}
                  aria-invalid={Boolean(err("phone"))}
                  aria-describedby={describedBy("phone")}
                  className={fieldClass}
                />
              </Field>
              <Field id={`${uid}-company`} label="Company" hint="Optional">
                <Input
                  id={`${uid}-company`}
                  name="company"
                  autoComplete="organization"
                  placeholder="Business name"
                  value={values.company}
                  onChange={(e) => set("company", e.target.value)}
                  className={fieldClass}
                />
              </Field>
              <Field id={`${uid}-service`} label="What do you need?" required error={err("service")} className="sm:col-span-2">
                <Select
                  value={values.service}
                  onValueChange={(v) => {
                    set("service", v);
                    setTouched((t) => ({ ...t, service: true }));
                    setErrors(validate({ ...values, service: v }));
                  }}
                >
                  <SelectTrigger
                    id={`${uid}-service`}
                    aria-invalid={Boolean(err("service"))}
                    aria-describedby={describedBy("service")}
                    className={cn(fieldClass, "w-full data-[size=default]:h-12")}
                  >
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="max-h-72">
                    {services.map((s) => (
                      <SelectItem key={s.slug} value={s.slug} className="min-h-10">
                        {s.name}
                      </SelectItem>
                    ))}
                    <SelectItem value={NOT_SURE} className="min-h-10">
                      Not sure yet — help me choose
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field id={`${uid}-message`} label="About your project" required error={err("message")} className="sm:col-span-2">
                <Textarea
                  id={`${uid}-message`}
                  name="message"
                  rows={5}
                  placeholder="For example: I need a website for my restaurant in Doha…"
                  value={values.message}
                  onChange={(e) => set("message", e.target.value)}
                  onBlur={() => blur("message")}
                  aria-invalid={Boolean(err("message"))}
                  aria-describedby={describedBy("message")}
                  className={cn(fieldClass, "h-auto min-h-36 resize-y py-3")}
                />
                <span className="mt-1 block text-right text-xs text-muted-foreground">
                  {values.message.length} / 2000
                </span>
              </Field>
            </div>

            <Button
              type="submit"
              variant="brand"
              size="xl"
              className="mt-6 w-full sm:w-auto"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="animate-spin" aria-hidden="true" /> Sending…
                </>
              ) : (
                <>
                  Send Message <Send data-icon="inline-end" />
                </>
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  id,
  label,
  required,
  hint,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id} className="text-sm font-semibold text-navy-950">
        {label}
        {required ? <span className="text-destructive" aria-hidden="true">*</span> : null}
        {hint ? <span className="font-normal text-muted-foreground">({hint})</span> : null}
      </Label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm font-medium text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
