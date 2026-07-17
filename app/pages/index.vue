<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { z } from 'zod'

const title = 'Login'
const description = 'Authentication page for Susi Air Pilot Portal'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

definePageMeta({
  layout: false
})

const router = useRouter()
const showPassword = ref(false)

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required').trim(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  remember: z.boolean().optional()
})

const state = reactive({
  username: '',
  password: '',
  remember: false
})

const errors = reactive({
  username: '',
  password: ''
})

const onSubmit = () => {
  errors.username = ''
  errors.password = ''

  const result = loginSchema.safeParse(state)

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof typeof errors
      if (errors[field] !== undefined) {
        errors[field] = issue.message
      }
    })
    return
  }

  router.push('/dashboard')
}
</script>

<template>
  <div class="flex min-h-screen font-sans bg-white">
    <div class="hidden relative w-1/2 bg-[#111] overflow-hidden lg:flex lg:flex-col lg:justify-end lg:p-12">
      <img
        src="/images/DSC_2714.jpg"
        class="absolute inset-0 w-full h-full object-cover opacity-40 z-0"
        alt="Susi Air Aircraft"
      >
      <div class="absolute inset-0 bg-linear-to-t from-susi-navy/80 to-transparent z-0" />

      <div class="relative z-10">
        <img
          src="https://susiair.com/images/susiair-logo.png"
          alt="Susi Air Logo"
          class="inline h-10 mb-6 brightness-0 invert"
        >
        <h1 class="text-4xl font-bold text-white mt-[0.67em] mb-2 [text-shadow:0_2px_4px_rgba(0,0,0,0.3)]">
          Pilot Portal
        </h1>
        <p class="text-lg text-border-light my-[1em] [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
          Your logbook and schedule companion
        </p>
      </div>
    </div>

    <div class="w-full flex items-center justify-center p-6 bg-white lg:w-1/2 lg:p-12">
      <div class="w-full max-w-100">
        <div class="text-center mb-8 lg:text-left">
          <img
            src="https://susiair.com/images/susiair-logo.png"
            alt="Susi Air"
            class="h-8 mx-auto mb-6 lg:hidden"
          >

          <div class="w-16 h-16 bg-susi-bg rounded-full flex items-center justify-center border border-border-light mx-auto mb-4 lg:ml-0">
            <svg
              class="w-8 h-8 text-susi-navy"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-susi-navy mt-[0.83em] mb-[0.83em]">
            Welcome back, Pilot!
          </h2>
          <p class="text-sm text-text-secondary mt-1 mb-[1em]">
            Sign in to continue to your dashboard
          </p>
        </div>

        <form
          class="flex flex-col gap-5"
          novalidate
          @submit.prevent="onSubmit"
        >
          <div class="flex flex-col">
            <label
              for="username"
              class="text-sm font-semibold text-susi-navy mb-1.5"
            >Username</label>
            <div class="relative">
              <input
                id="username"
                v-model="state.username"
                type="text"
                placeholder="Enter your username"
                class="w-full py-3 px-4 bg-white border rounded-3xl text-sm text-susi-navy outline-none transition-all duration-200 ease-[ease] placeholder:text-[#9CA3AF] focus:border-susi-navy focus:shadow-[0_0_0_2px_rgba(14,33,56,0.1)]"
                :class="errors.username ? 'border-susi-red focus:border-susi-red focus:shadow-[0_0_0_2px_rgba(230,55,87,0.1)]' : 'border-border-light'"
                @input="errors.username = ''"
              >
            </div>
            <p
              v-if="errors.username"
              class="text-sm text-susi-red font-medium mt-1.5 mb-[1em]"
            >
              {{ errors.username }}
            </p>
          </div>

          <div class="flex flex-col">
            <label
              for="password"
              class="text-sm font-semibold text-susi-navy mb-1.5"
            >Password</label>
            <div class="relative">
              <input
                id="password"
                v-model="state.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                class="w-full py-3 px-4 bg-white border rounded-3xl text-sm text-susi-navy outline-none transition-all duration-200 ease-[ease] placeholder:text-[#9CA3AF] focus:border-susi-navy focus:shadow-[0_0_0_2px_rgba(14,33,56,0.1)]"
                :class="errors.password ? 'border-susi-red focus:border-susi-red focus:shadow-[0_0_0_2px_rgba(230,55,87,0.1)]' : 'border-border-light'"
                @input="errors.password = ''"
              >
              <button
                type="button"
                class="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[#9CA3AF] flex items-center p-0 hover:text-susi-navy"
                @click="showPassword = !showPassword"
              >
                <svg
                  v-if="!showPassword"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <svg
                  v-else
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              </button>
            </div>
            <p
              v-if="errors.password"
              class="text-sm text-susi-red font-medium mt-1.5 mb-[1em]"
            >
              {{ errors.password }}
            </p>
          </div>

          <div class="flex justify-end mt-1 mb-4">
            <a
              href="#"
              class="text-sm font-semibold text-susi-red no-underline hover:underline"
            >Need help? Contact CRD</a>
          </div>

          <base-button type="submit">
            <span>Sign In</span>
            <svg
              class="absolute right-6 w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </base-button>
        </form>
      </div>
    </div>
  </div>
</template>
