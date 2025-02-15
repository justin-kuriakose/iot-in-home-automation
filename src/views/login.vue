<template>
	<div class="min-h-screen bg-blue-900 py-6 flex flex-col justify-center sm:py-12">
		<div class="relative py-3 sm:max-w-xl sm:mx-auto">
			<div
				class="absolute inset-0 border border-gray-600 bg-gradient-to-r from-sky-600 to-sky-700 shadow-lg transform skew-y-12 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
			</div>
			<div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
				<div class="max-w-md mx-auto">
					<div>
						<h1 class="text-5xl font-bold text-sky-800 text-center">LOGIN</h1>
					</div>
					<div class="divide-y divide-gray-200">
						<form @submit.prevent="handleSubmit">
							<div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
								<div class="relative">
									<input  type="text" v-model="email"
										class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
										placeholder="Email address" />
									<label for="email"
										class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email
										Address</label>
								</div>
								<div class="relative">
									<input  type="password" v-model="password"
										class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
										placeholder="Password" />
									<label for="password"
										class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
								</div>
								<div class="relative">
									<button type="submit"
										class="bg-sky-800 text-white hover:bg-sky-700 ml-16 rounded-md px-2 py-1 mt-4">Submit</button>
								</div>
							</div>
						</form>
						<div>
							
							<div class="text-1xl">Create an account <button
									class="text-sm text-sky-900 hover:text-sky-700 font-bold"
									onclick="document.location='signup.vue'">Signup</button></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { ref } from 'vue'
import { auth } from '../config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
export default {
	name: "login-page",
	components: {

	},
setup() {
		const email = ref('')
		const password = ref('')
		const error = ref('')
		const router = useRouter()

		const handleSubmit = async () => {
			try {
				console.log(email.value);
				console.log(password.value);
				await signInWithEmailAndPassword(auth, email.value, password.value);
				router.push('/admin');
			} catch (err) {
				switch (err.code) {
					case 'auth/invalid-credential':
						error.value = 'Invalid email or password'
						break
					case 'auth/user-not-found':
						error.value = 'No account found with this email'
						break
					case 'auth/wrong-password':
						error.value = 'Incorrect password'
						break
					default:
						error.value = 'Something went wrong'
				}
			}
		}
		return {email,password,error,handleSubmit};
	}
}
</script>
