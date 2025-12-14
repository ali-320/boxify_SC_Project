import { redirect } from 'next/navigation';

export default function QuotePage() {
  // This page now simply redirects to the first step of the form.
  redirect('/quote/dimensions');
}
