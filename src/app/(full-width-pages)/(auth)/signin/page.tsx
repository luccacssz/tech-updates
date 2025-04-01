import SignInForm from '@/components/auth/SignInForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tech Updates',
  description: 'Tech updates',
}


export default function SignIn() {
  return <SignInForm />
}
