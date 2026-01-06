<script setup lang="ts">
  import { useRoute } from "vue-router"
  import { ref, computed, watch } from "vue"
  
  import AppHeader from "$src/components/AppHeader.vue"
  import AppFooter from "$src/components/AppFooter.vue"
  
  import { createAppointmentApi } from "$src/api/appointments.service"
  import { getDoctorsByProfessionApi } from "$src/api/doctors.service"
  import { useAuth } from "$src/components/useAuth"
  import { useAppointments } from "$src/components/useAppointments"

  const { clientId, fetchMine } = useAppointments()

  // ===== AUTH =====
  const { user } = useAuth()
  
  // ===== TYPES =====
  type Doctor = {
    id: number
    specialization: string
    description?: string
    user: {
      id: number
      name: string
      surname: string
    }
  }
  
  type CalendarDay = {
    date: Date
    label: number
    isCurrentMonth: boolean
    iso: string
  }
  
  // ===== SPECIALIZATIONS =====
  const specializations = [
    "Lekarz rodzinny",
    "Pediatra",
    "Kardiolog",
    "Neurolog",
    "Ortopeda",
    "Chirurg",
    "Ginekolog",
    "Urolog",
    "Dermatolog",
    "Okulista",
    "Laryngolog",
    "Endokrynolog",
    "Onkolog",
    "Psychiatra",
  ]
  
  // ===== ROUTE + FILTER =====
  const route = useRoute()
  
  const initialSpec = (() => {
    const q = route.query.spec
    if (typeof q === "string" && specializations.includes(q)) return q
    return specializations[0]
  })()
  
  const selectedSpec = ref(initialSpec)
  
  // ===== DOCTORS =====
  const doctors = ref<Doctor[]>([])
  const loadingDoctors = ref(false)
  
  watch(
    selectedSpec,
    async (spec) => {
      loadingDoctors.value = true
      try {
        const res = await getDoctorsByProfessionApi(spec)
        doctors.value = res.data
      } catch {
        doctors.value = []
      } finally {
        loadingDoctors.value = false
      }
    },
    { immediate: true }
  )
  
  const selectSpec = (spec: string) => {
    selectedSpec.value = spec
  }
  
  // ===== BOOKING =====
  const selectedDoctor = ref<Doctor | null>(null)
  const selectedDate = ref("")
  const selectedTime = ref("")
  
  const availableTimes = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
  ]
  
  const openBooking = (doctor: Doctor) => {
    selectedDoctor.value = doctor
    selectedDate.value = ""
    selectedTime.value = ""
  }
  
  const closeBooking = () => {
    selectedDoctor.value = null
  }
  
  // ===== CREATE APPOINTMENT (FIXED) =====
  const confirmBooking = async () => {
  if (
    !selectedDoctor.value ||
    !selectedDate.value ||
    !selectedTime.value
  ) {
    return
  }

  // 🔥 если clientId ещё не загружен — подгружаем
  if (!clientId.value) {
    await fetchMine()
  }

  if (!clientId.value) {
    alert("Client profile not loaded")
    return
  }

  const starting_at = `${selectedDate.value} ${selectedTime.value}:00`

  const [hour, minute] = selectedTime.value.split(":").map(Number)
  let endHour = hour
  let endMinute = minute + 30

  if (endMinute >= 60) {
    endMinute -= 60
    endHour += 1
  }

  const ending_at = `${selectedDate.value} ${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(2, "0")}:00`

  try {
    await createAppointmentApi({
      doctor_id: selectedDoctor.value.id,
      client_id: clientId.value, // ✅ clients.id
      starting_at,
      ending_at,
    })

    closeBooking()
    alert("Wizyta została umówiona ✅")
  } catch (e: any) {
    console.error(e?.response?.data || e)
    alert("Nie udało się umówić wizyty ❌")
  }
}

  
  // ===== CALENDAR =====
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]
  
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"]
  
  const today = new Date()
  const calendarYear = ref(today.getFullYear())
  const calendarMonth = ref(today.getMonth())
  
  const formatIso = (d: Date) => d.toISOString().slice(0, 10)
  
  const calendarDays = computed<CalendarDay[]>(() => {
    const first = new Date(calendarYear.value, calendarMonth.value, 1)
    const start = new Date(first)
    start.setDate(start.getDate() - first.getDay())
  
    return Array.from({ length: 42 }).map((_, i) => {
      const d = new Date(start)
      d.setDate(start.getDate() + i)
      return {
        date: d,
        label: d.getDate(),
        isCurrentMonth: d.getMonth() === calendarMonth.value,
        iso: formatIso(d),
      }
    })
  })
  
  const goPrevMonth = () => {
    calendarMonth.value--
    if (calendarMonth.value < 0) {
      calendarMonth.value = 11
      calendarYear.value--
    }
  }
  
  const goNextMonth = () => {
    calendarMonth.value++
    if (calendarMonth.value > 11) {
      calendarMonth.value = 0
      calendarYear.value++
    }
  }
  
  const selectCalendarDate = (d: CalendarDay) => {
    selectedDate.value = d.iso
  }
  </script>
  
  
  <template>
    <div class="min-h-screen bg-[#f5f7fb] flex flex-col">
      <AppHeader />
  
      <main class="flex-1">
        <div class="w-full px-10 py-6">
          <div class="flex gap-6">
            <aside class="w-56 flex flex-col gap-2">
              <button
                v-for="spec in specializations"
                :key="spec"
                @click="selectSpec(spec)"
                class="w-full text-sm font-medium rounded-full px-4 py-2 text-left border transition"
                :class="spec === selectedSpec
                  ? 'bg-[#0f6bff] text-white'
                  : 'bg-[#f5f7ff]'"
              >
                {{ spec }}
              </button>
            </aside>
  
            <section class="flex-1 flex flex-col gap-3">
              <div v-if="loadingDoctors">Ładowanie…</div>
  
              <div
                v-for="doctor in doctors"
                :key="doctor.id"
                class="flex items-center justify-between bg-white rounded-2xl px-6 py-4"
              >
                <div>
                  <p class="text-lg font-semibold">
                    {{ doctor.user.name }} {{ doctor.user.surname }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ doctor.specialization }}
                  </p>
                </div>
  
                <button
                  class="px-5 py-2 rounded-full bg-[#0f6bff] text-white"
                  @click="openBooking(doctor)"
                >
                  Zapisz się
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
  
      <AppFooter />
  
      <!-- MODAL -->
      <div
        v-if="selectedDoctor"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      >
        <div class="bg-white rounded-2xl w-full max-w-md p-6">
          <h2 class="text-xl font-semibold mb-1">Umów wizytę</h2>
          <p class="text-sm text-gray-500 mb-4">
            {{ selectedDoctor.user.name }} {{ selectedDoctor.user.surname }} —
            {{ selectedDoctor.specialization }}
          </p>
  
          <!-- КАЛЕНДАРЬ -->
          <div class="mb-4">
            <div class="flex justify-between mb-2">
              <button @click="goPrevMonth">‹</button>
              <span>{{ monthNames[calendarMonth] }} {{ calendarYear }}</span>
              <button @click="goNextMonth">›</button>
            </div>
  
            <div class="grid grid-cols-7 gap-1">
              <button
                v-for="d in calendarDays"
                :key="d.iso"
                @click="selectCalendarDate(d)"
                class="w-9 h-9 rounded-full"
                :class="d.iso === selectedDate ? 'bg-purple-600 text-white' : ''"
              >
                {{ d.label }}
              </button>
            </div>
          </div>
  
          <!-- ВРЕМЯ -->
          <div class="grid grid-cols-3 gap-2 mb-4">
            <button
              v-for="t in availableTimes"
              :key="t"
              @click="selectedTime = t"
              class="px-3 py-2 rounded-xl"
              :class="selectedTime === t ? 'bg-purple-600 text-white' : ''"
            >
              {{ t }}
            </button>
          </div>
  
          <div class="flex justify-end gap-3">
            <button @click="closeBooking">Cancel</button>
            <button
              @click="confirmBooking"
              :disabled="!selectedDate || !selectedTime"
              class="bg-purple-600 text-white px-4 py-2 rounded-full"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  