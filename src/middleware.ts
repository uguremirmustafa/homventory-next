import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// export default auth((req) => {
//   // req.auth
//   console.log(req.auth);
// });

// This function can be marked `async` if using `await` inside
export default async function middleware(request: NextRequest) {
  // const session = await auth();
  const response = NextResponse.next();

  return response;
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
