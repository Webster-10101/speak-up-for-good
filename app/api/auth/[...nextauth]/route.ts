import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Simple password-based auth - you can customize this
        if (credentials?.password === process.env.ADMIN_PASSWORD) {
          return {
            id: 'admin',
            name: 'Admin',
            email: 'admin@speakupforgood.com'
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/admin/login'
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id as string
      return session
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
