<script setup lang="ts">
  import { RouterLink } from "vue-router"
  import { useAuth } from "$src/components/useAuth"
  
  const { isDoctor } = useAuth()
  </script>
  
  <template>
    <footer class="bg-[#021b3a] text-white text-xs mt-12">
      <div class="w-full px-10 py-8 grid md:grid-cols-4 gap-10">
  
        <!-- LOGO -->
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <img
                src="/src/assets/stetho.png"
                alt="LekMed logo"
                class="w-7 h-7 object-contain"
              />
            </div>
            <span class="font-semibold text-base">LekMed</span>
          </div>
  
          <p class="text-sm text-[#d1d5db] leading-relaxed">
            Profesjonalna opieka medyczna dla całej rodziny.
          </p>
        </div>
  
        <!-- QUICK LINKS -->
        <div>
          <h4 class="text-base font-semibold mb-3">Szybkie linki</h4>
          <ul class="space-y-2 text-sm text-[#d1d5db]">
            <li>
              <RouterLink to="/home" class="hover:text-white transition">
                Strona główna
              </RouterLink>
            </li>
  
            <!-- ❌ НЕ показываем доктору -->
            <li v-if="!isDoctor">
              <RouterLink to="/doctors" class="hover:text-white transition">
                Nasi lekarze
              </RouterLink>
            </li>
  
            <!-- ❌ НЕ показываем доктору -->
            <li v-if="!isDoctor">
              <RouterLink to="/services" class="hover:text-white transition">
                Usługi
              </RouterLink>
            </li>
          </ul>
        </div>
  
        <!-- SERVICES (ONLY PATIENT) -->
        <div v-if="!isDoctor">
          <h4 class="text-base font-semibold mb-3">Usługi</h4>
          <ul class="space-y-2 text-sm text-[#d1d5db]">
  
            <li>
              <RouterLink
                :to="{ path: '/doctors', query: { spec: 'Kardiolog' } }"
                class="hover:text-white transition"
              >
                Kardiologia
              </RouterLink>
            </li>
  
            <li>
              <RouterLink
                :to="{ path: '/doctors', query: { spec: 'Ortopeda' } }"
                class="hover:text-white transition"
              >
                Ortopedia
              </RouterLink>
            </li>
  
            <li>
              <RouterLink
                :to="{ path: '/doctors', query: { spec: 'Pediatra' } }"
                class="hover:text-white transition"
              >
                Pediatria
              </RouterLink>
            </li>
  
          </ul>
        </div>
  
        <div>
          <h4 class="text-base font-semibold mb-3">Kontakt</h4>
          <ul class="space-y-2 text-sm text-[#d1d5db]">
            <li>📞 +48 111 222 333</li>
            <li>✉️ dobraprzychodnia@kontakt.com</li>
            <li>📍 ul. Przykładowa 123, Warszawa</li>
          </ul>
        </div>
  
      </div>
    </footer>
  </template>
  