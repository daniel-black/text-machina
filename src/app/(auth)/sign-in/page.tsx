import { SignIn } from "@clerk/nextjs/app-beta";

export default function SignInPage() {
  return <SignIn afterSignInUrl="/" signUpUrl="/sign-up" />;
}