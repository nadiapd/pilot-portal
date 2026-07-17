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
  <div class="login-page">
    <div class="login-hero">
      <img
        src="/images/DSC_2714.jpg"
        class="login-hero__bg"
        alt="Susi Air Aircraft"
      >
      <div class="login-hero__overlay" />

      <div class="login-hero__content">
        <img
          src="https://susiair.com/images/susiair-logo.png"
          alt="Susi Air Logo"
          class="login-hero__logo"
        >
        <h1 class="login-hero__title">
          Pilot Portal
        </h1>
        <p class="login-hero__subtitle">
          Your logbook and schedule companion
        </p>
      </div>
    </div>

    <div class="login-form-container">
      <div class="login-card">
        <div class="login-header">
          <img
            src="https://susiair.com/images/susiair-logo.png"
            alt="Susi Air"
            class="login-header__mobile-logo"
          >

          <div class="login-header__avatar">
            <svg
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
          <h2 class="login-header__title">
            Welcome back, Pilot!
          </h2>
          <p class="login-header__subtitle">
            Sign in to continue to your dashboard
          </p>
        </div>

        <form
          class="login-form"
          novalidate
          @submit.prevent="onSubmit"
        >
          <div class="form-group">
            <label
              for="username"
              class="form-label"
            >Username</label>
            <div class="input-wrapper">
              <input
                id="username"
                v-model="state.username"
                type="text"
                placeholder="Enter your username"
                class="form-input"
                :class="{ 'has-error': errors.username }"
                @input="errors.username = ''"
              >
            </div>
            <p
              v-if="errors.username"
              class="error-message"
            >
              {{ errors.username }}
            </p>
          </div>

          <div class="form-group">
            <label
              for="password"
              class="form-label"
            >Password</label>
            <div class="input-wrapper">
              <input
                id="password"
                v-model="state.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                class="form-input"
                :class="{ 'has-error': errors.password }"
                @input="errors.password = ''"
              >
              <button
                type="button"
                class="password-toggle"
                @click="showPassword = !showPassword"
              >
                <svg
                  v-if="!showPassword"
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
              class="error-message"
            >
              {{ errors.password }}
            </p>
          </div>

          <div class="form-actions-alt">
            <a
              href="#"
              class="help-link"
            >Need help? Contact CRD</a>
          </div>

          <BaseButton
            type="submit"
            class="btn-submit"
          >
            <span>Sign In</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              class="icon-arrow"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </BaseButton>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~/assets/scss/_variables.scss';

.login-page {
  display: flex;
  min-height: 100vh;
  font-family: $font-family-base;
  background-color: $white;
}

.login-hero {
  display: none;
  position: relative;
  width: 50%;
  background-color: #111;
  overflow: hidden;

  @media (min-width: $bp-lg) {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 3rem;
  }

  &__bg {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.4;
    z-index: 0;
  }

  &__overlay {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(to top, rgba($susi-navy, 0.8), transparent);
    z-index: 0;
  }

  &__content {
    position: relative;
    z-index: 10;
  }

  &__logo {
    height: 2.5rem;
    margin-bottom: 1.5rem;
    filter: brightness(0) invert(1);
  }

  &__title {
    font-size: 2.25rem;
    font-weight: 700;
    color: $white;
    margin-bottom: 0.5rem;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }

  &__subtitle {
    font-size: 1.125rem;
    color: #E5E7EB;
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  }
}

.login-form-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background-color: $white;

  @media (min-width: $bp-lg) {
    width: 50%;
    padding: 3rem;
  }
}

.login-card {
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;

  @media (min-width: $bp-lg) {
    text-align: left;
  }

  &__mobile-logo {
    height: 2rem;
    margin: 0 auto 1.5rem;

    @media (min-width: $bp-lg) {
      display: none;
    }
  }

  &__avatar {
    width: 4rem;
    height: 4rem;
    background-color: $susi-bg;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid $border-light;
    margin: 0 auto 1rem;

    @media (min-width: $bp-lg) {
      margin-left: 0;
    }

    svg {
      width: 2rem;
      height: 2rem;
      color: $susi-navy;
    }
  }

  &__title {
    font-size: 1.5rem;
    font-weight: 700;
    color: $text-primary;
  }

  &__subtitle {
    font-size: 0.875rem;
    color: $text-secondary;
    margin-top: 0.25rem;
  }
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: 0.375rem;
}

.input-wrapper {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: $white;
  border: 1px solid $border-light;
  border-radius: 1.5rem;
  font-size: 0.875rem;
  color: $text-primary;
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    border-color: $susi-navy;
    box-shadow: 0 0 0 2px rgba($susi-navy, 0.1);
  }

  &.has-error {
    border-color: $text-error;
    &:focus {
      box-shadow: 0 0 0 2px rgba($text-error, 0.1);
    }
  }
}

.password-toggle {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #9CA3AF;
  display: flex;
  align-items: center;
  padding: 0;

  &:hover {
    color: $susi-navy;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
}

.error-message {
  font-size: 0.875rem;
  color: $text-error;
  font-weight: 500;
  margin-top: 0.375rem;
}

.form-actions-alt {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.25rem;
  margin-bottom: 1rem;
}

.help-link {
  font-size: 0.875rem;
  font-weight: 600;
  color: $susi-red;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.btn-submit {
  .icon-arrow {
    position: absolute;
    right: 1.5rem;
    width: 1.25rem;
    height: 1.25rem;
  }
}
</style>
