<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from "vue-router"
import { useAuth } from "$src/components/useAuth"

const route = useRoute()
const router = useRouter()
const { isDoctor, isLoggedIn, logout } = useAuth()

const linkClasses = (path: string) => {
  const base = "flex items-center gap-2 transition"
  const active = "text-[#0f6bff] font-semibold hover:text-[#1d4ed8]"
  const inactive = "text-[#111827] hover:text-[#0f6bff]"

  return `${base} ${route.path === path ? active : inactive}`
}

const handleLogout = () => {
  logout()
  router.push("/")
}
</script>

<template>
  <header class="w-full bg-white border-b border-[#0f6bff] shadow-sm">
    <div class="w-full flex items-center justify-between px-10 py-4">

      <div class="flex items-center gap-12">
        <RouterLink to="/home" class="flex items-center gap-3">
          <div class="w-10 h-10">
            <img
              src="/src/assets/stetho.png"
              alt="LekMed logo"
              class="w-10 h-10 object-contain rounded-xl"
            />
          </div>

          <div class="flex flex-col leading-tight">
            <span class="font-semibold text-lg text-[#111827]">
              LekMed
            </span>
            <span class="text-sm text-[#6b7280]">
              Najnowocześniejsza przychodnia w Polsce
            </span>
          </div>
        </RouterLink>

        <nav class="flex items-center gap-10 text-base">
          <RouterLink to="/home" :class="linkClasses('/home')">
            <span class="text-xl">🏠</span>
            <span>Strona główna</span>
          </RouterLink>

          <RouterLink
            v-if="!isDoctor"
            to="/doctors"
            :class="linkClasses('/doctors')"
          >
            <span class="text-xl">👨‍⚕️</span>
            <span>Nasi lekarze</span>
          </RouterLink>

          <RouterLink
            v-if="!isDoctor"
            to="/visits"
            :class="linkClasses('/visits')"
          >
            <span class="text-xl">📅</span>
            <span>Twoje wizyty</span>
          </RouterLink>

          <RouterLink
            v-if="isDoctor"
            to="/doctor-visits"
            :class="linkClasses('/doctor-visits')"
          >
            <span class="text-xl">📋</span>
            <span>Wizyty pacjentów</span>
          </RouterLink>

          <RouterLink to="/services" :class="linkClasses('/services')">
            <span class="text-xl">🩺</span>
            <span>Usługi</span>
          </RouterLink>
        </nav>
      </div>

      <div class="flex items-center gap-4">
        <div class="flex flex-col items-end text-sm text-[#111827]">
          <div class="flex items-center gap-2">
            <span>📞</span>
            <span class="font-semibold">+48 111 222 333</span>
          </div>
          <div class="flex items-center gap-2 mt-1">
            <span>✉️</span>
            <span>dobraprzychodnia@kontakt.com</span>
          </div>
        </div>

        <button
        v-if="isLoggedIn"
        type="button"
        @click="handleLogout"
        class="ml-4 px-5 py-2.5 rounded-full bg-white text-[#0f6bff] border border-[#0f6bff] 
              font-semibold text-sm shadow-sm hover:bg-[#0f6bff] hover:text-white 
              hover:shadow-md transition flex items-center gap-2"
        >
      <span class="text-base">🔓</span>
      <span>Wyloguj się</span>
    </button>

      </div>
    </div>
  </header>
</template>
