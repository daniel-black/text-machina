import { SignUp } from "@clerk/nextjs/app-beta";

export default function SignUpPage() {
  return <SignUp afterSignUpUrl="/" signInUrl="/sign-in" />;
}