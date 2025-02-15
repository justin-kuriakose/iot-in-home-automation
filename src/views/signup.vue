<template>
    <div class="min-w-screen min-h-screen bg-sky-900 flex items-center justify-center px-5 py-5">
      <div class="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style="max-width:1000px">
        <div class="md:flex w-full">
          <div class="hidden md:block w-1/2 bg-sky-700 py-10 px-10">
          </div>
          <div class="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div class="text-center mb-10">
              <h1 class="font-bold text-4xl text-sky-900">REGISTER</h1>
              <p>Enter your information to register</p>
            </div>
            <form @submit.prevent="handleSubmit">
              <div>
                <div class="flex -mx-3">
                  <div class="w-full px-3 mb-5">
                    <label for="email" class="text-xs text-black font-semibold px-1">Email</label>
                    <div class="flex">
                      <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i class="mdi mdi-email-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="email"
                        id="email"
                        v-model="email"
                        class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                </div>
                <div class="flex -mx-3">
                  <div class="w-full px-3 mb-8">
                    <label for="password" class="text-xs text-black font-semibold px-1">Password</label>
                    <div class="flex">
                      <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i class="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="password"
                        id="password"
                        v-model="password"
                        class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                </div>
                <div class="flex -mx-3">
                  <div class="w-full px-3 mb-12">
                    <label for="repeatPassword" class="text-xs text-black font-semibold px-1">Repeat Password</label>
                    <div class="flex">
                      <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i class="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="password"
                        id="repeatPassword"
                        v-model="repeatPassword"
                        class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200  outline-none focus:border-indigo-500"
                        placeholder="Repeat password"
                      />
                    </div>
                  </div>
                </div>
                <div class="flex -mx-3">
                  <div class="w-full px-3 mb-5">
                    <button
                      type="submit"
                      class="block w-full max-w-xs mx-auto bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-3 py-3 font-semibold"
                    >
                      REGISTER NOW
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script setup>
  import { ref } from 'vue'
  import { auth } from '../config'
  import { createUserWithEmailAndPassword } from 'firebase/auth'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const email = ref('')
  const password = ref('')
  const repeatPassword = ref('')
  const error = ref('')
  
  const validateForm = () => {
      if (!email.value || !password.value || !repeatPassword.value) {
          error.value = 'All fields are required.'
          return false
      }
      if (password.value !== repeatPassword.value) {
          error.value = 'Passwords do not match.'
          return false
      }
      return true
  }
  
  const handleSubmit = async () => {
      error.value = '' // Clear previous errors
      if (!validateForm()) return

      console.log('Attempting registration...') // Debug log
      
      try {
          const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
          console.log('Registration successful:', userCredential.user) // Debug log
          router.push('/')
      } catch (err) {
          console.error('Registration error:', err) // Debug log
          switch (err.code) {
              case 'auth/email-already-in-use':
                  error.value = 'Email already registered'
                  break
              case 'auth/weak-password':
                  error.value = 'Password should be at least 6 characters'
                  break
              case 'auth/invalid-email':
                  error.value = 'Invalid email address'
                  break
              default:
                  error.value = 'Registration error: ' + err.message
          }
      }
  }
</script>

