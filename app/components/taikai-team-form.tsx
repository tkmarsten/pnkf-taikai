import { useState, type ChangeEvent, type SubmitEvent } from "react";
import Field from "./field";

const colors = {
  surface: "#F5F5F5",
  ink: "#111111",
  line: "#D6D6D6",
  red: "#B3261E",
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const AGE_PATTERN = /^\d{1,2}$/;

interface FormState {
  firstName: string;
  lastName: string;
  age: string;
  rank: string;
  gender: string;
  email: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  age?: string;
  rank?: string;
  gender?: string;
  email?: string;
}

const EMPTY_FORM: FormState = {
  firstName: "",
  lastName: "",
  age: "",
  rank: "",
  gender: "",
  email: "",
};

function inputStyleFor(hasError: boolean): React.CSSProperties {
  return {
    width: "100%",
    background: colors.surface,
    border: `1px solid ${hasError ? colors.red : colors.line}`,
    color: colors.ink,
    borderRadius: 6,
    padding: "10px 12px",
    fontSize: 14,
  };
}

function ErrorText({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs mt-1 font-semibold text-pnkf-red">{message}</p>;
}

export default function TaikaiTeamForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  function updateField<K extends keyof FormState>(field: K, value: string) {
    setForm({ ...form, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
    if (submitted) setSubmitted(false);
  }

  function validate(values: FormState): FormErrors {
    const next: FormErrors = {};

    const email = values.email.trim();
    if (!email) {
      next.email = "Email is required.";
    } else if (!EMAIL_PATTERN.test(email)) {
      next.email = "Please enter a valid email address.";
    }

    if (!values.firstName.trim()) next.firstName = "First name is required.";
    if (!values.lastName.trim()) next.lastName = "Last name is required.";

    const age = values.age.trim();
    if (!age) {
      next.age = "Age is required.";
    } else if (!AGE_PATTERN.test(age) || Number(age) < 1 || Number(age) > 99) {
      next.age = "Enter a valid age.";
    }

    if (!values.rank) next.rank = "Rank is required.";
    if (!values.gender) next.gender = "Please select a gender.";

    return next;
  }

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
  }

  var maxMembers = 5;

  return (
    <div className="mt-5 max-w-4xl mx-auto text-ink">
      <div className="rounded-lg p-6 bg-panel border border-solid border-pnkf-gold">
        <h2 className="mb-1 text-2xl tracking-wider">
          Taikai Team Registration
        </h2>
        <p className="text-sm mb-4 text-ink-dim">
          Please complete this form to register for the taikai. You may only
          register a team if you have the majority of members already
          determined. For three (3) person teams, you need at least two (2)
          members. For five (5) person teams, you need at least three (3)
          members. If you do not have enough or are registering only for
          yourself, please use the free agent form.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="gap-3">
            <Field label="Email">
              <input
                type="email"
                style={inputStyleFor(!!errors.email)}
                placeholder="me@example.com"
                value={form.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updateField("email", e.target.value)
                }
              />
              <ErrorText message={errors.email} />
            </Field>
            <Field label="Division">
              <select>
                <option>Division</option>
                <option value="11U">11 years and younger</option>
                <option value="15U">15 years and younger</option>
                <option value="Mudansha">Mudansha</option>
                <option value="Women">Women</option>
                <option value="Open">Open</option>
              </select>
            </Field>
            <Field label="First name">
              <input
                type="text"
                style={inputStyleFor(!!errors.firstName)}
                placeholder="Short text answer"
                maxLength={40}
                value={form.firstName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updateField("firstName", e.target.value)
                }
              />
              <ErrorText message={errors.firstName} />
            </Field>
            <Field label="Last name">
              <input
                type="text"
                style={inputStyleFor(!!errors.lastName)}
                placeholder="Short text answer"
                maxLength={40}
                value={form.lastName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updateField("lastName", e.target.value)
                }
              />
              <ErrorText message={errors.lastName} />
            </Field>
            <Field label="Age">
              <input
                type="text"
                inputMode="numeric"
                style={inputStyleFor(!!errors.age)}
                placeholder="Number"
                maxLength={2}
                value={form.age}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updateField("age", e.target.value)
                }
              />
              <ErrorText message={errors.age} />
            </Field>
            <Field label="Rank">
              <select
                style={inputStyleFor(!!errors.rank)}
                value={form.rank}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  updateField("rank", e.target.value)
                }
              >
                <option value="">Rank</option>
                <option value="0K">Unranked</option>
                <option value="6K">6 kyu</option>
                <option value="5K">5 kyu</option>
                <option value="4K">4 kyu</option>
                <option value="3K">3 kyu</option>
                <option value="2K">2 kyu</option>
                <option value="1K">1 kyu</option>
                <option value="1D">1 dan</option>
                <option value="2D">2 dan</option>
                <option value="3D">3 dan</option>
                <option value="4D">4 dan</option>
                <option value="5D">5 dan</option>
                <option value="6D">6 dan</option>
                <option value="7D">7 dan</option>
              </select>
              <ErrorText message={errors.rank} />
            </Field>
            <Field label="Gender">
              <select
                style={inputStyleFor(!!errors.gender)}
                value={form.gender}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  updateField("gender", e.target.value)
                }
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <ErrorText message={errors.gender} />
            </Field>
          </div>

          <button
            type="submit"
            className="w-full rounded-md py-3 font-bold text-sm mt-1 transition bg-pnkf-red text-surface cursor-pointer"
          >
            Register
          </button>

          {submitted && (
            <p className="text-sm mt-2.5 font-semibold">
              Looks good — all fields are valid.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
