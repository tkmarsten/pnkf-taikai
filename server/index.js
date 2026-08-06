import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { Links, Meta, NavLink, Outlet, Scripts, ScrollRestoration, ServerRouter, UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsx, jsxs } from "react/jsx-runtime";
import { Calendar, MapPin } from "lucide-react";
import { useState } from "react";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/@react-router/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = /* @__PURE__ */ __exportAll({
	default: () => handleRequest,
	streamTimeout: () => streamTimeout
});
var streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
	if (request.method.toUpperCase() === "HEAD") return new Response(null, {
		status: responseStatusCode,
		headers: responseHeaders
	});
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		let userAgent = request.headers.get("user-agent");
		let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
		let timeoutId = setTimeout(() => abort(), 6e3);
		const { pipe, abort } = renderToPipeableStream(/* @__PURE__ */ jsx(ServerRouter, {
			context: routerContext,
			url: request.url
		}), {
			[readyOption]() {
				shellRendered = true;
				const body = new PassThrough({ final(callback) {
					clearTimeout(timeoutId);
					timeoutId = void 0;
					callback();
				} });
				const stream = createReadableStreamFromReadable(body);
				responseHeaders.set("Content-Type", "text/html");
				pipe(body);
				resolve(new Response(stream, {
					headers: responseHeaders,
					status: responseStatusCode
				}));
			},
			onShellError(error) {
				reject(error);
			},
			onError(error) {
				responseStatusCode = 500;
				if (shellRendered) console.error(error);
			}
		});
	});
}
//#endregion
//#region app/components/nav.tsx
function Nav() {
	return /* @__PURE__ */ jsxs("nav", { children: [/* @__PURE__ */ jsx(NavLink, {
		to: "/",
		end: true,
		children: "Home"
	}), /* @__PURE__ */ jsx(NavLink, {
		to: "/tournament",
		end: true,
		children: "Tournament"
	})] });
}
//#endregion
//#region app/root.tsx
var root_exports = /* @__PURE__ */ __exportAll({
	ErrorBoundary: () => ErrorBoundary,
	Layout: () => Layout,
	default: () => root_default,
	links: () => links
});
var links = () => [
	{
		rel: "preconnect",
		href: "https://fonts.googleapis.com"
	},
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous"
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
	}
];
function Layout({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
			/* @__PURE__ */ jsx("meta", {
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			}),
			/* @__PURE__ */ jsx(Meta, {}),
			/* @__PURE__ */ jsx(Links, {})
		] }), /* @__PURE__ */ jsxs("body", { children: [
			/* @__PURE__ */ jsx(Nav, {}),
			children,
			/* @__PURE__ */ jsx(ScrollRestoration, {}),
			/* @__PURE__ */ jsx(Scripts, {})
		] })]
	});
}
var root_default = UNSAFE_withComponentProps(function App() {
	return /* @__PURE__ */ jsx(Outlet, {});
});
var ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary({ error }) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack;
	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
	}
	return /* @__PURE__ */ jsxs("main", {
		className: "pt-16 p-4 container mx-auto",
		children: [
			/* @__PURE__ */ jsx("h1", { children: message }),
			/* @__PURE__ */ jsx("p", { children: details }),
			stack
		]
	});
});
//#endregion
//#region app/components/field.tsx
function Field({ label, children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "mb-3.5",
		children: [/* @__PURE__ */ jsxs("label", {
			className: "block text-xs uppercase font-semibold mb-1.5",
			style: {
				letterSpacing: "0.5px",
				color: "#6B6B6B"
			},
			children: [
				label,
				" ",
				/* @__PURE__ */ jsx("span", {
					style: { color: "#B3261E" },
					children: "*"
				})
			]
		}), children]
	});
}
//#endregion
//#region app/components/seminar-form.tsx
var colors$2 = {
	surface: "#F5F5F5",
	ink: "#111111",
	line: "#D6D6D6",
	red: "#B3261E"
};
var EMAIL_PATTERN$2 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var AGE_PATTERN$2 = /^\d{1,2}$/;
var EMPTY_FORM$2 = {
	firstName: "",
	lastName: "",
	age: "",
	rank: "",
	gender: "",
	email: ""
};
function inputStyleFor$2(hasError) {
	return {
		width: "100%",
		background: colors$2.surface,
		border: `1px solid ${hasError ? colors$2.red : colors$2.line}`,
		color: colors$2.ink,
		borderRadius: 6,
		padding: "10px 12px",
		fontSize: 14
	};
}
function ErrorText$2({ message }) {
	if (!message) return null;
	return /* @__PURE__ */ jsx("p", {
		className: "text-xs mt-1 font-semibold text-pnkf-red",
		children: message
	});
}
function SeminarForm() {
	const [form, setForm] = useState(EMPTY_FORM$2);
	const [errors, setErrors] = useState({});
	const [submitted, setSubmitted] = useState(false);
	function updateField(field, value) {
		setForm({
			...form,
			[field]: value
		});
		if (errors[field]) setErrors({
			...errors,
			[field]: void 0
		});
		if (submitted) setSubmitted(false);
	}
	function validate(values) {
		const next = {};
		const email = values.email.trim();
		if (!email) next.email = "Email is required.";
		else if (!EMAIL_PATTERN$2.test(email)) next.email = "Please enter a valid email address.";
		if (!values.firstName.trim()) next.firstName = "First name is required.";
		if (!values.lastName.trim()) next.lastName = "Last name is required.";
		const age = values.age.trim();
		if (!age) next.age = "Age is required.";
		else if (!AGE_PATTERN$2.test(age) || Number(age) < 1 || Number(age) > 99) next.age = "Enter a valid age.";
		if (!values.rank) next.rank = "Rank is required.";
		if (!values.gender) next.gender = "Please select a gender.";
		return next;
	}
	function handleSubmit(e) {
		e.preventDefault();
		const nextErrors = validate(form);
		setErrors(nextErrors);
		setSubmitted(Object.keys(nextErrors).length === 0);
	}
	return /* @__PURE__ */ jsx("div", {
		className: "mt-5 max-w-4xl mx-auto",
		children: /* @__PURE__ */ jsxs("div", {
			className: "rounded-lg p-6 bg-panel border border-solid border-pnkf-gold",
			children: [
				/* @__PURE__ */ jsx("h2", {
					className: "mb-1 text-2xl tracking-wider",
					children: "Seminar Registration"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-sm mb-4 text-ink-dim",
					children: "Please complete this form to register for the seminar."
				}),
				/* @__PURE__ */ jsxs("form", {
					onSubmit: handleSubmit,
					noValidate: true,
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "gap-3",
							children: [
								/* @__PURE__ */ jsxs(Field, {
									label: "Email",
									children: [/* @__PURE__ */ jsx("input", {
										type: "email",
										style: inputStyleFor$2(!!errors.email),
										placeholder: "me@example.com",
										value: form.email,
										onChange: (e) => updateField("email", e.target.value)
									}), /* @__PURE__ */ jsx(ErrorText$2, { message: errors.email })]
								}),
								/* @__PURE__ */ jsxs(Field, {
									label: "First name",
									children: [/* @__PURE__ */ jsx("input", {
										type: "text",
										style: inputStyleFor$2(!!errors.firstName),
										placeholder: "Short text answer",
										maxLength: 40,
										value: form.firstName,
										onChange: (e) => updateField("firstName", e.target.value)
									}), /* @__PURE__ */ jsx(ErrorText$2, { message: errors.firstName })]
								}),
								/* @__PURE__ */ jsxs(Field, {
									label: "Last name",
									children: [/* @__PURE__ */ jsx("input", {
										type: "text",
										style: inputStyleFor$2(!!errors.lastName),
										placeholder: "Short text answer",
										maxLength: 40,
										value: form.lastName,
										onChange: (e) => updateField("lastName", e.target.value)
									}), /* @__PURE__ */ jsx(ErrorText$2, { message: errors.lastName })]
								}),
								/* @__PURE__ */ jsxs(Field, {
									label: "Age",
									children: [/* @__PURE__ */ jsx("input", {
										type: "text",
										inputMode: "numeric",
										style: inputStyleFor$2(!!errors.age),
										placeholder: "Number",
										maxLength: 2,
										value: form.age,
										onChange: (e) => updateField("age", e.target.value)
									}), /* @__PURE__ */ jsx(ErrorText$2, { message: errors.age })]
								}),
								/* @__PURE__ */ jsxs(Field, {
									label: "Rank",
									children: [/* @__PURE__ */ jsxs("select", {
										style: inputStyleFor$2(!!errors.rank),
										value: form.rank,
										onChange: (e) => updateField("rank", e.target.value),
										children: [
											/* @__PURE__ */ jsx("option", {
												value: "",
												children: "Rank"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "6K",
												children: "6 kyu"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "5K",
												children: "5 kyu"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "4K",
												children: "4 kyu"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "3K",
												children: "3 kyu"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "2K",
												children: "2 kyu"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "1K",
												children: "1 kyu"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "1D",
												children: "1 dan"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "2D",
												children: "2 dan"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "3D",
												children: "3 dan"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "4D",
												children: "4 dan"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "5D",
												children: "5 dan"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "6D",
												children: "6 dan"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "7D",
												children: "7 dan"
											})
										]
									}), /* @__PURE__ */ jsx(ErrorText$2, { message: errors.rank })]
								}),
								/* @__PURE__ */ jsxs(Field, {
									label: "Gender",
									children: [/* @__PURE__ */ jsxs("select", {
										style: inputStyleFor$2(!!errors.gender),
										value: form.gender,
										onChange: (e) => updateField("gender", e.target.value),
										children: [
											/* @__PURE__ */ jsx("option", {
												value: "",
												children: "Gender"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "Male",
												children: "Male"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "Female",
												children: "Female"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "Other",
												children: "Other"
											})
										]
									}), /* @__PURE__ */ jsx(ErrorText$2, { message: errors.gender })]
								})
							]
						}),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							className: "w-full rounded-md py-3 font-bold text-sm mt-1 transition bg-pnkf-red text-surface cursor-pointer",
							children: "Register"
						}),
						submitted && /* @__PURE__ */ jsx("p", {
							className: "text-sm mt-2.5 font-semibold",
							children: "Looks good — all fields are valid."
						})
					]
				})
			]
		})
	});
}
//#endregion
//#region app/routes/home.tsx
function Home() {
	return /* @__PURE__ */ jsx("div", {
		className: "min-h-screen w-full px-5 py-8 pb-20 bg-background text-ink",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-4xl mx-auto",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "relative overflow-hidden rounded-lg p-7 bg-panel border border-solid border-pnkf-gold border-t-32 border-t-pnkf-gold",
				children: [
					/* @__PURE__ */ jsx("img", {
						src: "/pnkf.png",
						className: "w-50 m-auto"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "my-2.5 leading-none tracking-wide text-[clamp(36px,7vw,60px)] text-center",
						children: "Pacific Northwest Kendo Federation Kendo Seminar"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-2 text-base text-ink",
						children: [
							/* @__PURE__ */ jsxs("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ jsx(Calendar, { size: 16 }), /* @__PURE__ */ jsx("strong", {
									className: "font-semibold text-inherit",
									children: "October 31, 2026 (Saturday)"
								})]
							}),
							/* @__PURE__ */ jsxs("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ jsx(MapPin, { size: 16 }), /* @__PURE__ */ jsx("strong", {
									className: "font-semibold text-inherit",
									children: "Kent Commons Community Center"
								})]
							}),
							/* @__PURE__ */ jsx("p", { children: "This seminar will be led by Hiroshi Arima sensei (Kyoshi 8 Dan) and Ritsuko Yoshikawa sensei (7 Dan) from Kanagawa prefecture." })
						]
					})
				]
			}), /* @__PURE__ */ jsx(SeminarForm, {})]
		})
	});
}
//#endregion
//#region app/routes/app.tsx
var app_exports = /* @__PURE__ */ __exportAll({
	default: () => app_default,
	meta: () => meta
});
function meta({}) {
	return [{ title: "PNKF Taikai and Seminar" }, {
		name: "description",
		content: "Registration page for PNKF kendo taikai and seminar."
	}];
}
var app_default = UNSAFE_withComponentProps(function App() {
	return /* @__PURE__ */ jsx(Home, {});
});
//#endregion
//#region app/components/taikai-team-form.tsx
var colors$1 = {
	surface: "#F5F5F5",
	ink: "#111111",
	line: "#D6D6D6",
	red: "#B3261E"
};
var EMAIL_PATTERN$1 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var AGE_PATTERN$1 = /^\d{1,2}$/;
var EMPTY_FORM$1 = {
	firstName: "",
	lastName: "",
	age: "",
	rank: "",
	gender: "",
	email: ""
};
function inputStyleFor$1(hasError) {
	return {
		width: "100%",
		background: colors$1.surface,
		border: `1px solid ${hasError ? colors$1.red : colors$1.line}`,
		color: colors$1.ink,
		borderRadius: 6,
		padding: "10px 12px",
		fontSize: 14
	};
}
function ErrorText$1({ message }) {
	if (!message) return null;
	return /* @__PURE__ */ jsx("p", {
		className: "text-xs mt-1 font-semibold text-pnkf-red",
		children: message
	});
}
function TaikaiTeamForm$1() {
	const [form, setForm] = useState(EMPTY_FORM$1);
	const [errors, setErrors] = useState({});
	const [submitted, setSubmitted] = useState(false);
	function updateField(field, value) {
		setForm({
			...form,
			[field]: value
		});
		if (errors[field]) setErrors({
			...errors,
			[field]: void 0
		});
		if (submitted) setSubmitted(false);
	}
	function validate(values) {
		const next = {};
		const email = values.email.trim();
		if (!email) next.email = "Email is required.";
		else if (!EMAIL_PATTERN$1.test(email)) next.email = "Please enter a valid email address.";
		if (!values.firstName.trim()) next.firstName = "First name is required.";
		if (!values.lastName.trim()) next.lastName = "Last name is required.";
		const age = values.age.trim();
		if (!age) next.age = "Age is required.";
		else if (!AGE_PATTERN$1.test(age) || Number(age) < 1 || Number(age) > 99) next.age = "Enter a valid age.";
		if (!values.rank) next.rank = "Rank is required.";
		if (!values.gender) next.gender = "Please select a gender.";
		return next;
	}
	function handleSubmit(e) {
		e.preventDefault();
		const nextErrors = validate(form);
		setErrors(nextErrors);
		setSubmitted(Object.keys(nextErrors).length === 0);
	}
	return /* @__PURE__ */ jsx("div", {
		className: "mt-5 max-w-4xl mx-auto text-ink",
		children: /* @__PURE__ */ jsxs("div", {
			className: "rounded-lg p-6 bg-panel border border-solid border-pnkf-gold",
			children: [
				/* @__PURE__ */ jsx("h2", {
					className: "mb-1 text-2xl tracking-wider",
					children: "Taikai Team Registration"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-sm mb-4 text-ink-dim",
					children: "Please complete this form to register for the taikai. You may only register a team if you have the majority of members already determined. For three (3) person teams, you need at least two (2) members. For five (5) person teams, you need at least three (3) members. If you do not have enough or are registering only for yourself, please use the free agent form."
				}),
				/* @__PURE__ */ jsxs("form", {
					onSubmit: handleSubmit,
					noValidate: true,
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "gap-3",
							children: [
								/* @__PURE__ */ jsxs(Field, {
									label: "Email",
									children: [/* @__PURE__ */ jsx("input", {
										type: "email",
										style: inputStyleFor$1(!!errors.email),
										placeholder: "me@example.com",
										value: form.email,
										onChange: (e) => updateField("email", e.target.value)
									}), /* @__PURE__ */ jsx(ErrorText$1, { message: errors.email })]
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Division",
									children: /* @__PURE__ */ jsxs("select", { children: [
										/* @__PURE__ */ jsx("option", { children: "Division" }),
										/* @__PURE__ */ jsx("option", {
											value: "11U",
											children: "11 years and younger"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "15U",
											children: "15 years and younger"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "Mudansha",
											children: "Mudansha"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "Women",
											children: "Women"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "Open",
											children: "Open"
										})
									] })
								}),
								/* @__PURE__ */ jsxs(Field, {
									label: "First name",
									children: [/* @__PURE__ */ jsx("input", {
										type: "text",
										style: inputStyleFor$1(!!errors.firstName),
										placeholder: "Short text answer",
										maxLength: 40,
										value: form.firstName,
										onChange: (e) => updateField("firstName", e.target.value)
									}), /* @__PURE__ */ jsx(ErrorText$1, { message: errors.firstName })]
								}),
								/* @__PURE__ */ jsxs(Field, {
									label: "Last name",
									children: [/* @__PURE__ */ jsx("input", {
										type: "text",
										style: inputStyleFor$1(!!errors.lastName),
										placeholder: "Short text answer",
										maxLength: 40,
										value: form.lastName,
										onChange: (e) => updateField("lastName", e.target.value)
									}), /* @__PURE__ */ jsx(ErrorText$1, { message: errors.lastName })]
								}),
								/* @__PURE__ */ jsxs(Field, {
									label: "Age",
									children: [/* @__PURE__ */ jsx("input", {
										type: "text",
										inputMode: "numeric",
										style: inputStyleFor$1(!!errors.age),
										placeholder: "Number",
										maxLength: 2,
										value: form.age,
										onChange: (e) => updateField("age", e.target.value)
									}), /* @__PURE__ */ jsx(ErrorText$1, { message: errors.age })]
								}),
								/* @__PURE__ */ jsxs(Field, {
									label: "Rank",
									children: [/* @__PURE__ */ jsxs("select", {
										style: inputStyleFor$1(!!errors.rank),
										value: form.rank,
										onChange: (e) => updateField("rank", e.target.value),
										children: [
											/* @__PURE__ */ jsx("option", {
												value: "",
												children: "Rank"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "0K",
												children: "Unranked"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "6K",
												children: "6 kyu"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "5K",
												children: "5 kyu"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "4K",
												children: "4 kyu"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "3K",
												children: "3 kyu"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "2K",
												children: "2 kyu"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "1K",
												children: "1 kyu"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "1D",
												children: "1 dan"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "2D",
												children: "2 dan"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "3D",
												children: "3 dan"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "4D",
												children: "4 dan"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "5D",
												children: "5 dan"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "6D",
												children: "6 dan"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "7D",
												children: "7 dan"
											})
										]
									}), /* @__PURE__ */ jsx(ErrorText$1, { message: errors.rank })]
								}),
								/* @__PURE__ */ jsxs(Field, {
									label: "Gender",
									children: [/* @__PURE__ */ jsxs("select", {
										style: inputStyleFor$1(!!errors.gender),
										value: form.gender,
										onChange: (e) => updateField("gender", e.target.value),
										children: [
											/* @__PURE__ */ jsx("option", {
												value: "",
												children: "Gender"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "Male",
												children: "Male"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "Female",
												children: "Female"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "Other",
												children: "Other"
											})
										]
									}), /* @__PURE__ */ jsx(ErrorText$1, { message: errors.gender })]
								})
							]
						}),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							className: "w-full rounded-md py-3 font-bold text-sm mt-1 transition bg-pnkf-red text-surface cursor-pointer",
							children: "Register"
						}),
						submitted && /* @__PURE__ */ jsx("p", {
							className: "text-sm mt-2.5 font-semibold",
							children: "Looks good — all fields are valid."
						})
					]
				})
			]
		})
	});
}
//#endregion
//#region app/components/taikai-fa-form.tsx
var colors = {
	surface: "#F5F5F5",
	ink: "#111111",
	line: "#D6D6D6",
	red: "#B3261E"
};
var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var AGE_PATTERN = /^\d{1,2}$/;
var EMPTY_FORM = {
	firstName: "",
	lastName: "",
	age: "",
	rank: "",
	gender: "",
	email: ""
};
function inputStyleFor(hasError) {
	return {
		width: "100%",
		background: colors.surface,
		border: `1px solid ${hasError ? colors.red : colors.line}`,
		color: colors.ink,
		borderRadius: 6,
		padding: "10px 12px",
		fontSize: 14
	};
}
function ErrorText({ message }) {
	if (!message) return null;
	return /* @__PURE__ */ jsx("p", {
		className: "text-xs mt-1 font-semibold text-pnkf-red",
		children: message
	});
}
function TaikaiTeamForm() {
	const [form, setForm] = useState(EMPTY_FORM);
	const [errors, setErrors] = useState({});
	const [submitted, setSubmitted] = useState(false);
	function updateField(field, value) {
		setForm({
			...form,
			[field]: value
		});
		if (errors[field]) setErrors({
			...errors,
			[field]: void 0
		});
		if (submitted) setSubmitted(false);
	}
	function validate(values) {
		const next = {};
		const email = values.email.trim();
		if (!email) next.email = "Email is required.";
		else if (!EMAIL_PATTERN.test(email)) next.email = "Please enter a valid email address.";
		if (!values.firstName.trim()) next.firstName = "First name is required.";
		if (!values.lastName.trim()) next.lastName = "Last name is required.";
		const age = values.age.trim();
		if (!age) next.age = "Age is required.";
		else if (!AGE_PATTERN.test(age) || Number(age) < 1 || Number(age) > 99) next.age = "Enter a valid age.";
		if (!values.rank) next.rank = "Rank is required.";
		if (!values.gender) next.gender = "Please select a gender.";
		return next;
	}
	function handleSubmit(e) {
		e.preventDefault();
		const nextErrors = validate(form);
		setErrors(nextErrors);
		setSubmitted(Object.keys(nextErrors).length === 0);
	}
	return /* @__PURE__ */ jsx("div", {
		className: "mt-5 max-w-4xl mx-auto text-ink",
		children: /* @__PURE__ */ jsxs("div", {
			className: "rounded-lg p-6 bg-panel border border-solid border-pnkf-gold",
			children: [
				/* @__PURE__ */ jsx("h2", {
					className: "mb-1 text-2xl tracking-wider",
					children: "Taikai Team Registration"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-sm mb-4 text-ink-dim",
					children: "Don't have a team? No problem! You may still enter the taikai as a free agent and we will prioritize filling in empty spots in existing teams or create a new team of free agents for you. If you have another free agent that you would like to participate with, please indicate their name on the form and we will do our best to put you on the same team."
				}),
				/* @__PURE__ */ jsxs("form", {
					onSubmit: handleSubmit,
					noValidate: true,
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "gap-3",
							children: [
								/* @__PURE__ */ jsxs(Field, {
									label: "Email",
									children: [/* @__PURE__ */ jsx("input", {
										type: "email",
										style: inputStyleFor(!!errors.email),
										placeholder: "me@example.com",
										value: form.email,
										onChange: (e) => updateField("email", e.target.value)
									}), /* @__PURE__ */ jsx(ErrorText, { message: errors.email })]
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Division",
									children: /* @__PURE__ */ jsxs("select", { children: [
										/* @__PURE__ */ jsx("option", { children: "Division" }),
										/* @__PURE__ */ jsx("option", {
											value: "11U",
											children: "11 years and younger"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "15U",
											children: "15 years and younger"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "Mudansha",
											children: "Mudansha"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "Women",
											children: "Women"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "Open",
											children: "Open"
										})
									] })
								}),
								/* @__PURE__ */ jsxs(Field, {
									label: "First name",
									children: [/* @__PURE__ */ jsx("input", {
										type: "text",
										style: inputStyleFor(!!errors.firstName),
										placeholder: "Short text answer",
										maxLength: 40,
										value: form.firstName,
										onChange: (e) => updateField("firstName", e.target.value)
									}), /* @__PURE__ */ jsx(ErrorText, { message: errors.firstName })]
								}),
								/* @__PURE__ */ jsxs(Field, {
									label: "Last name",
									children: [/* @__PURE__ */ jsx("input", {
										type: "text",
										style: inputStyleFor(!!errors.lastName),
										placeholder: "Short text answer",
										maxLength: 40,
										value: form.lastName,
										onChange: (e) => updateField("lastName", e.target.value)
									}), /* @__PURE__ */ jsx(ErrorText, { message: errors.lastName })]
								}),
								/* @__PURE__ */ jsxs(Field, {
									label: "Age",
									children: [/* @__PURE__ */ jsx("input", {
										type: "text",
										inputMode: "numeric",
										style: inputStyleFor(!!errors.age),
										placeholder: "Number",
										maxLength: 2,
										value: form.age,
										onChange: (e) => updateField("age", e.target.value)
									}), /* @__PURE__ */ jsx(ErrorText, { message: errors.age })]
								}),
								/* @__PURE__ */ jsxs(Field, {
									label: "Rank",
									children: [/* @__PURE__ */ jsxs("select", {
										style: inputStyleFor(!!errors.rank),
										value: form.rank,
										onChange: (e) => updateField("rank", e.target.value),
										children: [
											/* @__PURE__ */ jsx("option", {
												value: "",
												children: "Rank"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "0K",
												children: "Unranked"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "6K",
												children: "6 kyu"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "5K",
												children: "5 kyu"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "4K",
												children: "4 kyu"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "3K",
												children: "3 kyu"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "2K",
												children: "2 kyu"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "1K",
												children: "1 kyu"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "1D",
												children: "1 dan"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "2D",
												children: "2 dan"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "3D",
												children: "3 dan"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "4D",
												children: "4 dan"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "5D",
												children: "5 dan"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "6D",
												children: "6 dan"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "7D",
												children: "7 dan"
											})
										]
									}), /* @__PURE__ */ jsx(ErrorText, { message: errors.rank })]
								}),
								/* @__PURE__ */ jsxs(Field, {
									label: "Gender",
									children: [/* @__PURE__ */ jsxs("select", {
										style: inputStyleFor(!!errors.gender),
										value: form.gender,
										onChange: (e) => updateField("gender", e.target.value),
										children: [
											/* @__PURE__ */ jsx("option", {
												value: "",
												children: "Gender"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "Male",
												children: "Male"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "Female",
												children: "Female"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "Other",
												children: "Other"
											})
										]
									}), /* @__PURE__ */ jsx(ErrorText, { message: errors.gender })]
								})
							]
						}),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							className: "w-full rounded-md py-3 font-bold text-sm mt-1 transition bg-pnkf-red text-surface cursor-pointer",
							children: "Register"
						}),
						submitted && /* @__PURE__ */ jsx("p", {
							className: "text-sm mt-2.5 font-semibold",
							children: "Looks good — all fields are valid."
						})
					]
				})
			]
		})
	});
}
//#endregion
//#region app/routes/tournament.tsx
var tournament_exports = /* @__PURE__ */ __exportAll({ default: () => tournament_default });
var tournament_default = UNSAFE_withComponentProps(function Tournament() {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(TaikaiTeamForm$1, {}), /* @__PURE__ */ jsx(TaikaiTeamForm, {})] });
});
//#endregion
//#region \0virtual:react-router/server-manifest
var server_manifest_default = {
	"entry": {
		"module": "/assets/entry.client-CV1xagaf.js",
		"imports": ["/assets/jsx-runtime-glcrDxxs.js", "/assets/errorBoundaries-CcViQ8r3.js"],
		"css": []
	},
	"routes": {
		"root": {
			"id": "root",
			"parentId": void 0,
			"path": "",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": true,
			"module": "/assets/root-V5KdLiX3.js",
			"imports": ["/assets/jsx-runtime-glcrDxxs.js", "/assets/errorBoundaries-CcViQ8r3.js"],
			"css": ["/assets/root-J90muBdY.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/app": {
			"id": "routes/app",
			"parentId": "root",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/app-DOO2xllf.js",
			"imports": ["/assets/jsx-runtime-glcrDxxs.js", "/assets/field-CilW1Vu5.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/tournament": {
			"id": "routes/tournament",
			"parentId": "root",
			"path": "tournament",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/tournament-BTAtcHEb.js",
			"imports": ["/assets/jsx-runtime-glcrDxxs.js", "/assets/field-CilW1Vu5.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		}
	},
	"url": "/assets/manifest-ce1c9bc7.js",
	"version": "ce1c9bc7",
	"sri": void 0
};
//#endregion
//#region \0virtual:react-router/server-build
var assetsBuildDirectory = "build/client";
var basename = "/";
var future = {
	"unstable_enableNodeReadableStream": false,
	"unstable_optimizeDeps": false
};
var ssr = true;
var isSpaMode = false;
var prerender = [];
var routeDiscovery = {
	"mode": "lazy",
	"manifestPath": "/__manifest"
};
var publicPath = "/";
var entry = { module: entry_server_node_exports };
var routes = {
	"root": {
		id: "root",
		parentId: void 0,
		path: "",
		index: void 0,
		caseSensitive: void 0,
		module: root_exports
	},
	"routes/app": {
		id: "routes/app",
		parentId: "root",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: app_exports
	},
	"routes/tournament": {
		id: "routes/tournament",
		parentId: "root",
		path: "tournament",
		index: void 0,
		caseSensitive: void 0,
		module: tournament_exports
	}
};
var allowedActionOrigins = false;
//#endregion
export { allowedActionOrigins, server_manifest_default as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };
