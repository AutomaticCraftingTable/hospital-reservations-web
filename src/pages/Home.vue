<script setup lang="ts">
import { RouterLink } from "vue-router"
import AppHeader from "$src/components/AppHeader.vue"
import AppFooter from "$src/components/AppFooter.vue"
</script>

<template>
  <div class="min-h-screen bg-[#f5f7fb] flex flex-col">
    <AppHeader />

    <main class="flex-1">
      <div class="w-full px-10 py-10">

        <section
          class="rounded-3xl border border-[#c3d4ff] bg-gradient-to-r from-[#2563eb] to-[#4f46e5] text-white p-10 mb-10 relative overflow-hidden"
        >
          <div
            class="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_#ffffff,_transparent_60%)]"
          />

          <div class="relative max-w-3xl">
            <h1 class="text-4xl font-bold mb-4 leading-snug">
              Zapisując się do naszych lekarzy, trafiasz w dobre ręce
            </h1>

            <p class="text-lg text-blue-100 mb-8 leading-relaxed">
              Profesjonalna opieka medyczna z wykorzystaniem najnowocześniejszych
              technologii i wieloletnim doświadczeniem naszych specjalistów.
            </p>

            <div class="flex flex-wrap gap-4">
              <RouterLink
                to="/doctors"
                class="px-6 py-2.5 rounded-full bg-white text-[#2563eb] text-base font-semibold shadow hover:bg-blue-50 transition inline-flex items-center justify-center"
              >
                Umów wizytę online
              </RouterLink>
            </div>
          </div>
        </section>

        <section class="grid md:grid-cols-3 gap-6 text-[#111827]">

          <div class="bg-white rounded-2xl border border-[#e5edff] p-6 shadow-sm">
            <h3 class="font-semibold text-lg mb-2">Pediatria</h3>
            <p class="text-sm text-[#6b7280] mb-4 leading-relaxed">
              Opieka nad dziećmi od urodzenia. Bilanse zdrowia, szczepienia, konsultacje.
            </p>
            <RouterLink
              :to="{ path: '/doctors', query: { spec: 'Pediatra' } }"
              class="text-[#2563eb] text-sm font-semibold hover:underline"
            >
              Umów wizytę →
            </RouterLink>
          </div>

          <div class="bg-white rounded-2xl border border-[#e5edff] p-6 shadow-sm">
            <h3 class="font-semibold text-lg mb-2">Kardiologia</h3>
            <p class="text-sm text-[#6b7280] mb-4 leading-relaxed">
              Diagnostyka i leczenie chorób układu sercowo-naczyniowego. Badania EKG, holter, echo serca.
            </p>
            <RouterLink
              :to="{ path: '/doctors', query: { spec: 'Kardiolog' } }"
              class="text-[#2563eb] text-sm font-semibold hover:underline"
            >
              Umów wizytę →
            </RouterLink>
          </div>

          <div class="bg-white rounded-2xl border border-[#e5edff] p-6 shadow-sm">
            <h3 class="font-semibold text-lg mb-2">Ginekologia</h3>
            <p class="text-sm text-[#6b7280] mb-4 leading-relaxed">
              Kompleksowa opieka ginekologiczna. USG, cytologia, konsultacje.
            </p>
            <RouterLink
              :to="{ path: '/doctors', query: { spec: 'Ginekolog' } }"
              class="text-[#2563eb] text-sm font-semibold hover:underline"
            >
              Umów wizytę →
            </RouterLink>
          </div>

          <div class="bg-white rounded-2xl border border-[#e5edff] p-6 shadow-sm">
            <h3 class="font-semibold text-lg mb-2">Dermatologia</h3>
            <p class="text-sm text-[#6b7280] mb-4 leading-relaxed">
              Diagnostyka i leczenie chorób skóry. Dermatoskopia, usuwanie zmian skórnych.
            </p>
            <RouterLink
              :to="{ path: '/doctors', query: { spec: 'Dermatolog' } }"
              class="text-[#2563eb] text-sm font-semibold hover:underline"
            >
              Umów wizytę →
            </RouterLink>
          </div>

          <div class="bg-white rounded-2xl border border-[#e5edff] p-6 shadow-sm">
            <h3 class="font-semibold text-lg mb-2">Neurologia</h3>
            <p class="text-sm text-[#6b7280] mb-4 leading-relaxed">
              Diagnostyka i leczenie chorób układu nerwowego, EEG, konsultacje neurologiczne.
            </p>
            <RouterLink
              :to="{ path: '/doctors', query: { spec: 'Neurolog' } }"
              class="text-[#2563eb] text-sm font-semibold hover:underline"
            >
              Umów wizytę →
            </RouterLink>
          </div>

          <div class="bg-white rounded-2xl border border-[#e5edff] p-6 shadow-sm">
            <h3 class="font-semibold text-lg mb-2">Ortopedia</h3>
            <p class="text-sm text-[#6b7280] mb-4 leading-relaxed">
              Leczenie schorzeń narządu ruchu. Rehabilitacja, USG stawów, iniekcje.
            </p>
            <RouterLink
              :to="{ path: '/doctors', query: { spec: 'Ortopeda' } }"
              class="text-[#2563eb] text-sm font-semibold hover:underline"
            >
              Umów wizytę →
            </RouterLink>
          </div>

        </section>

      </div>
    </main>

    <AppFooter />
  </div>
</template>
