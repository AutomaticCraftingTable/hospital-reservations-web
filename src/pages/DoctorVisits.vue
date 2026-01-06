<script setup lang="ts">
  import { ref, computed, onMounted } from "vue"
  import AppHeader from "$src/components/AppHeader.vue"
  import AppFooter from "$src/components/AppFooter.vue"
  import { useAppointments } from "$src/components/useAppointments"
  
  const {
    appointments,
    fetchMine,
    loading,
    remove,
    removingId,
  } = useAppointments()
  
  type SortMode = "upcoming" | "newest" | "oldest"
  const sortMode = ref<SortMode>("upcoming")
  
  onMounted(() => {
    fetchMine()
  })
  
  const sortedAppointments = computed(() => {
    const list = [...appointments.value]
  
    if (sortMode.value === "newest") {
      return list.sort((a, b) =>
        b.created_at.localeCompare(a.created_at)
      )
    }
  
    if (sortMode.value === "oldest") {
      return list.sort((a, b) =>
        a.created_at.localeCompare(b.created_at)
      )
    }
  
    return list.sort((a, b) =>
      `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`)
    )
  })
  
  const formatDate = (iso: string) => {
    const [y, m, d] = iso.split("-")
    return `${d}.${m}.${y}`
  }
  
  const confirmDelete = async (id: number) => {
    const ok = confirm("Czy na pewno chcesz anulować wizytę?")
    if (!ok) return
  
    await remove(id)
  }
  </script>
  
  <template>
    <div class="min-h-screen bg-[#f5f7fb] flex flex-col">
      <AppHeader />
  
      <main class="flex-1">
        <div class="w-full px-10 py-6 max-w-3xl mx-auto">
          <div class="flex items-center justify-between mb-4">
            <h1 class="text-lg font-semibold text-[#111827]">
              Wizyty pacjentów
            </h1>
  
            <select
              v-model="sortMode"
              class="rounded-full border border-[#d1d5db] bg-white px-3 py-1.5 text-sm text-[#111827] outline-none focus:ring-2 focus:ring-[#0f6bff]"
            >
              <option value="upcoming">Najbliższe wizyty</option>
              <option value="newest">Od najnowszych</option>
              <option value="oldest">Od najstarszych</option>
            </select>
          </div>
  
          <div class="flex flex-col gap-3">
            <div
              v-if="!loading && sortedAppointments.length === 0"
              class="text-sm text-[#6b7280] bg-white border border-dashed border-[#d1d5db] rounded-2xl px-6 py-4 text-center"
            >
              Brak umówionych wizyt pacjentów.
            </div>
  
            <div
              v-for="visit in sortedAppointments"
              :key="visit.id"
              class="bg-white border border-[#cdd9ff] rounded-2xl px-6 py-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow"
            >
              <div class="flex items-center justify-between gap-4">
                <div class="text-left">
                  <p class="text-base font-semibold text-[#111827]">
                    {{ visit.displayName }}
                  </p>
  
                  <p
                    v-if="visit.specialization"
                    class="text-xs text-[#6b7280] mt-0.5"
                  >
                    {{ visit.specialization }}
                  </p>
                </div>
  
                <div class="flex flex-col items-end text-xs text-[#111827]">
                  <span class="px-3 py-1 rounded-full bg-[#e0ebff] font-medium">
                    {{ formatDate(visit.date) }}
                  </span>
                  <span class="mt-1 px-3 py-1 rounded-full bg-[#eef2ff]">
                    {{ visit.time }}
                  </span>
                </div>
              </div>
  
              <div class="flex justify-end mt-2">
                <button
                  @click="confirmDelete(visit.id)"
                  :disabled="removingId === visit.id"
                  class="text-xs font-medium transition"
                  :class="removingId === visit.id
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-red-500 hover:text-red-700'"
                >
                  {{ removingId === visit.id
                    ? "Anulowanie..."
                    : "Anuluj wizytę" }}
                </button>
              </div>
  
              <div class="mt-2 h-px bg-gradient-to-r from-[#e5edff] via-[#c3d4ff] to-[#e5edff]" />
            </div>
          </div>
        </div>
      </main>
  
      <AppFooter />
    </div>
  </template>
  