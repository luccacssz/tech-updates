import SignUpForm from '@/components/auth/SignUpForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tech Updates',
  description: 'Tech updates',
}

export default function SignUp() {
  return <SignUpForm />
}
